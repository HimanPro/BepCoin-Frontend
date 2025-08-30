import React, { useState, useEffect } from "react";
import {
  useAccount,
  useBalance,
  useEnsName,
  useDisconnect,
  useChainId,
  useSwitchChain,
} from "wagmi";
import { Modal } from "antd";
import { readContract } from "@wagmi/core";
import { config } from "../main";
import { TokenABI } from "../wagmiConfig";
import toast from "react-hot-toast";

const TOKENS = {
  1: [
    {
      symbol: "USDT",
      address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      decimals: 6,
    },
    {
      symbol: "DAI",
      address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      decimals: 18,
    },
    {
      symbol: "WETH",
      address: "0xC02aaA39b223FE8D0a0e5C4F27eAD9083C756Cc2",
      decimals: 18,
    },
    {
      symbol: "LINK",
      address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
      decimals: 18,
    },
  ],
  56: [
    {
      symbol: "USDT",
      address: "0x55d398326f99059fF775485246999027B3197955",
      decimals: 18,
    },
    {
      symbol: "USDC",
      address: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
      decimals: 18,
    },
    {
      symbol: "DAI",
      address: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
      decimals: 18,
    },
    {
      symbol: "BUSD",
      address: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
      decimals: 18,
    },
    {
      symbol: "CAKE",
      address: "0x0E09Fabb73Bd3Ade0a17ECC321fD13a19e81cE82",
      decimals: 18,
    },
  ],
  137: [
    {
      symbol: "USDT",
      address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
      decimals: 6,
    },
    {
      symbol: "USDC",
      address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
      decimals: 6,
    },
    {
      symbol: "DAI",
      address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
      decimals: 18,
    },
    {
      symbol: "WMATIC",
      address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
      decimals: 18,
    },
    {
      symbol: "QUICK",
      address: "0x831753DD7087CaC61aB5644b308642cc1c33Dc13",
      decimals: 18,
    },
  ],
  43114: [
    {
      symbol: "USDT",
      address: "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
      decimals: 6,
    },
    {
      symbol: "USDC",
      address: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
      decimals: 6,
    },
    {
      symbol: "DAI",
      address: "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70",
      decimals: 18,
    },
    {
      symbol: "WAVAX",
      address: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
      decimals: 18,
    },
    {
      symbol: "PNG",
      address: "0x60781C2586D68229fde47564546784ab3faca982",
      decimals: 18,
    },
  ],
  10: [
    {
      symbol: "USDT",
      address: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
      decimals: 6,
    },
    {
      symbol: "USDC",
      address: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
      decimals: 6,
    },
    {
      symbol: "DAI",
      address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
      decimals: 18,
    },
    {
      symbol: "WETH",
      address: "0x4200000000000000000000000000000000000006",
      decimals: 18,
    },
    {
      symbol: "OP",
      address: "0x4200000000000000000000000000000000000042",
      decimals: 18,
    },
  ],
  42161: [
    {
      symbol: "USDT",
      address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
      decimals: 6,
    },
    {
      symbol: "USDC",
      address: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
      decimals: 6,
    },
    {
      symbol: "DAI",
      address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
      decimals: 18,
    },
    {
      symbol: "WETH",
      address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
      decimals: 18,
    },
    {
      symbol: "ARB",
      address: "0x912CE59144191C1204E64559FE8253a0e49E6548",
      decimals: 18,
    },
  ],
  204: [
    {
      symbol: "USDT",
      address: "0x9e5AAC1Ba1a2e6aEd6b32689DFcF62A509Ca96f3",
      decimals: 18,
    },
    {
      symbol: "BUSD",
      address: "0x7A56E1C57C7475CCf742d277DDCbB69403bE5106",
      decimals: 18,
    },
    {
      symbol: "FDUSD",
      address: "0x50c5725949A6F0c72E6c4a641F24049A917DB0Cb",
      decimals: 18,
    },
  ],
  11155111: [
    {
      symbol: "USDT",
      address: "0x7169D38820F26e4E46B7a06Da09F3dB8b1c9B5A5",
      decimals: 6,
    },
    {
      symbol: "USDC",
      address: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
      decimals: 6,
    },
    {
      symbol: "WETH",
      address: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
      decimals: 18,
    },
  ],
  250: [
    {
      symbol: "USDC",
      address: "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75",
      decimals: 6,
    },
    {
      symbol: "DAI",
      address: "0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E",
      decimals: 18,
    },
    {
      symbol: "WFTM",
      address: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83",
      decimals: 18,
    },
  ],
};

const WalletDetails = ({ checkStatus, data }) => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { chains, switchChain } = useSwitchChain();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [verified, setVerified] = useState(false);
  const [tokenBalances, setTokenBalances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rpcError, setRpcError] = useState(null);

  const { data: balance } = useBalance({ address });
  const { data: ensName } = useEnsName({ address });

  useEffect(() => {
    // Reset verification when network changes
    setVerified(false);
    setRpcError(null);
  }, [chainId]);

  useEffect(() => {
    if (!address || !isConnected || !TOKENS[chainId]) {
      console.warn(`No tokens configured for chainId: ${chainId}`);
      setTokenBalances([]);
      setLoading(false);
      setRpcError(null);
      return;
    }

    const debounceFetch = setTimeout(() => {
      fetchTokens();
    }, 500);

    return () => clearTimeout(debounceFetch);
  }, [address, chainId, isConnected]);

  const retry = async (fn, retries = 3, delayMs = 500) => {
    for (let i = 0; i < retries; i++) {
      try {
        return await fn();
      } catch (error) {
        if (i === retries - 1 || error.message.includes("Unauthorized")) {
          throw error;
        }
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  };

  const getCachedTokenData = async (token, key) => {
    const cacheKey = `${chainId}_${token.address}_${key}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached && cached !== "null") return Number(cached) || cached;
    let result;
    try {
      result = await retry(() =>
        readContract(config, {
          address: token.address,
          abi: TokenABI,
          functionName: key,
        })
      );
    } catch {
      result = token[key];
    }
    localStorage.setItem(cacheKey, result ?? "null");
    return result;
  };

  const validateTokenData = (bal, decimals, symbol, token) => {
    const isValidBalance = bal && typeof bal === "bigint";
    const isValidDecimals = Number.isInteger(decimals) && decimals >= 0;
    const isValidSymbol = typeof symbol === "string" && symbol.length > 0;

    return {
      symbol: isValidSymbol ? symbol : token.symbol,
      balance: isValidBalance
        ? Number(bal) / 10 ** (isValidDecimals ? decimals : token.decimals)
        : 0,
      error: !isValidBalance || !isValidDecimals || !isValidSymbol,
    };
  };

  const fetchTokens = async () => {
    setLoading(true);
    setRpcError(null);
    const chainTokens = TOKENS[chainId] || [];

    try {
      const results = await Promise.all(
        chainTokens.map(async (token, index) => {
          try {
            await new Promise((resolve) => setTimeout(resolve, index * 100));
            const [bal, decimals, symbol] = await Promise.all([
              retry(() =>
                readContract(config, {
                  address: token.address,
                  abi: TokenABI,
                  functionName: "balanceOf",
                  args: [address],
                })
              ),
              getCachedTokenData(token, "decimals"),
              getCachedTokenData(token, "symbol"),
            ]);

            console.log(`Token ${token.symbol}:`, {
              balance: bal,
              decimals,
              symbol,
            });
            return validateTokenData(bal, decimals, symbol, token);
          } catch (error) {
            console.error(`Error fetching data for ${token.symbol}:`, {
              message: error.message,
              code: error.code,
              details: error.details,
              chainId,
              tokenAddress: token.address,
            });
            if (error.message.includes("Unauthorized")) {
              setRpcError(
                "Authentication error: Please check the RPC provider configuration."
              );
            }
            return { symbol: token.symbol, balance: 0, error: true };
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
        }))
      );
      if (error.message.includes("Unauthorized")) {
        setRpcError(
          "Authentication error: Please check the RPC provider configuration."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const verifyWallet = () => setVerified(true);

  const copyText = async (textToCopy) => {
    // Navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(textToCopy);
      toast.success("Copied");
    } else {
      // Use the 'out of viewport hidden text area' trick
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;

      // Move textarea out of the viewport so it's not visible
      textArea.style.position = "absolute";
      textArea.style.left = "-999999px";

      document.body.prepend(textArea);
      textArea.select();

      try {
        document.execCommand("copy");
        toast.success("Copied");
      } catch (error) {
        console.error(error);
      } finally {
        textArea.remove();
      }
    }
  };

  return (
    <Modal
      open={checkStatus}
      footer={null}
      className="wallet-modal"
      closable={true}
      onCancel={() => data(false)}
    >
      <div className="wallet-modal-content">
        <div className="modal-header">
          <div className="header-content">
            <h2>Wallet Details</h2>
          </div>
          <button className="close-btn" onClick={() => data(false)}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          {isConnected ? (
            <div className="wallet-info">
              {!verified ? (
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
                </div>
              ) : (
                <div className="verified-section">
                  <div className="status-indicator verified">
                    <div className="status-icon">✅</div>
                    <div className="status-text">
                      <h3>Wallet Verified</h3>
                      <p>Your wallet has been successfully verified</p>
                    </div>
                  </div>

                  <div className="info-card">
                    <h4>Wallet Information</h4>
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-label">ENS Name</span>
                        <span className="info-value">{ensName || "N/A"}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Native Balance</span>
                        <span className="info-value">
                          {balance?.formatted} {balance?.symbol}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Network</span>
                        <span className="info-value">
                          {chains.find((c) => c.id === chainId)?.name ||
                            "Unknown"}{" "}
                          (ID: {chainId})
                        </span>
                      </div>
                      <div className="info-item full-width">
                        <span className="info-label">Wallet Address</span>
                        <div className="address-container">
                          <span className="address-value">{address}</span>
                          <button
                            className="copy-btn"
                            onClick={() => copyText(address)}
                            title="Copy address"
                          >
                            📋
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="info-card">
                    <div className="card-header">
                      <h4>Token Balances</h4>
                      {loading && <div className="loading-spinner"></div>}
                    </div>

                    {/* CASE 1: RPC Error */}
                    {rpcError && !loading && (
                      <div className="error-message">
                        <span>⚠️</span>
                        <span>{rpcError}</span>
                      </div>
                    )}

                    {/* CASE 2: Loading → Don't show anything else */}
                    {loading && (
                      <div className="loading-section">
                        <p>Fetching balances…</p>
                      </div>
                    )}

                    {/* CASE 3: Network not supported */}
                    {!loading && !rpcError && !TOKENS[chainId] && (
                      <div className="no-tokens">
                        Token balances not supported on this network (Chain ID:{" "}
                        {chainId})
                      </div>
                    )}

                    {/* CASE 4: Tokens exist */}
                    {!loading && !rpcError && TOKENS[chainId] && (
                      <div className="tokens-list">
                        {tokenBalances
                          .filter((t) => !t.error && t.balance > 0) // ✅ show only valid tokens with balance
                          .map((t, i) => (
                            <div key={i} className="token-item">
                              <span className="token-symbol">{t.symbol}</span>
                              <span className="token-balance">
                                {t.balance.toFixed(4)}
                              </span>
                            </div>
                          ))}

                        {/* If after filtering, no tokens remain */}
                        {tokenBalances.filter((t) => !t.error && t.balance > 0)
                          .length === 0 && (
                          <div className="no-tokens">No tokens found</div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="info-card">
                    <h4>Switch Network</h4>
                    <div className="network-selector">
                      <select
                        value={chainId}
                        onChange={(e) =>
                          switchChain?.({ chainId: Number(e.target.value) })
                        }
                      >
                        {chains?.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
              <button className="disconnect-btn" onClick={() => disconnect()}>
                Disconnect Wallet
              </button>
            </div>
          ) : (
            <div className="not-connected">
              <div className="status-icon">🔒</div>
              <h3>Wallet not connected</h3>
              <p>Connect your wallet to view details</p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default WalletDetails;
