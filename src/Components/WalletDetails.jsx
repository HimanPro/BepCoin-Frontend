import React, { useState, useEffect } from "react";
import { useAccount, useBalance, useEnsName, useDisconnect, useChainId, useSwitchChain } from "wagmi";
import { Modal } from "antd";
import { readContract } from '@wagmi/core';
import { config } from '../wagmiConfig';

const ERC20_ABI = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
    type: "function",
  },
];

// Tokens by chain ID
const TOKENS = {
  1: [ // Ethereum Mainnet
    { symbol: "USDT", address: "0xdAC17F958D2ee523a2206206994597C13D831ec7" },
    { symbol: "USDC", address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" },
    { symbol: "DAI", address: "0x6B175474E89094C44Da98b954EedeAC495271d0F" },
  ],
  56: [ // BSC Mainnet
    { symbol: "USDT", address: "0x55d398326f99059fF775485246999027B3197955" },
    { symbol: "USDC", address: "0x8965349fb649A33a30cbFDa057D8eC2C48AbE2A2" },
    { symbol: "DAI", address: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3" },
  ],
  // Add more networks as needed
};

const WalletDetails = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { chains, switchChain } = useSwitchChain();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [verified, setVerified] = useState(false);
  const [tokenBalances, setTokenBalances] = useState([]);
  const [loading, setLoading] = useState(false);

  const { data: balance } = useBalance({ address });
  const { data: ensName } = useEnsName({ address });

  useEffect(() => {
    if (isConnected && address) setIsModalOpen(true);
    else setIsModalOpen(false);
    setVerified(false);
  }, [isConnected, address, chainId]);

  useEffect(() => {
    if (!address) return;

    const fetchTokens = async () => {
      setLoading(true);
      const chainTokens = TOKENS[chainId] || [];
      
      console.log("Fetching tokens for chain:", chainId);
      console.log("Available tokens:", chainTokens);

      if (chainTokens.length === 0) {
        setTokenBalances([]);
        setLoading(false);
        return;
      }

      try {
        const results = await Promise.all(
          chainTokens.map(async (token) => {
            try {
              const [bal, decimals, symbol] = await Promise.all([
                readContract(config, {
                  address: token.address,
                  abi: ERC20_ABI,
                  functionName: "balanceOf",
                  args: [address],
                }),
                readContract(config, {
                  address: token.address,
                  abi: ERC20_ABI,
                  functionName: "decimals",
                }),
                readContract(config, {
                  address: token.address,
                  abi: ERC20_ABI,
                  functionName: "symbol",
                }),
              ]);

              return {
                symbol: symbol || token.symbol,
                balance: bal ? Number(bal) / 10 ** decimals : 0,
                error: false
              };
            } catch (error) {
              console.error(`Error fetching data for ${token.symbol}:`, error);
              return { symbol: token.symbol, balance: 0, error: true };
            }
          })
        );
        setTokenBalances(results);
      } catch (error) {
        console.error("Error fetching tokens:", error);
        setTokenBalances([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, [address, chainId]);

  const verifyWallet = () => setVerified(true);

  return (
    <Modal
      open={isModalOpen}
      footer={null}
      closable={false}
      className="wallet-modal"
      onCancel={() => setIsModalOpen(false)}
    >
      <div className="wallet-modal-content">
        <div className="modal-header">
          <h2>Wallet Details</h2>
          <button className="close-btn" onClick={() => setIsModalOpen(false)}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          {isConnected ? (
            <div className="wallet-info">
              {!verified ? (
                <div className="verification-section">
                  <div className="status-indicator unverified">
                    <div className="status-icon">❌</div>
                    <span>Wallet not verified</span>
                  </div>
                  <p className="verification-text">Verify your wallet to access all features</p>
                  <button className="verify-btn" onClick={verifyWallet}>
                    Verify Assets
                  </button>
                </div>
              ) : (
                <div className="verified-section">
                  <div className="status-indicator verified">
                    <div className="status-icon">✅</div>
                    <span>Wallet Verified</span>
                  </div>
                  <div className="address-section">
                    <label>Wallet Address</label>
                    <div className="address-value">
                      {address}
                      <button
                        className="copy-btn"
                        onClick={() => navigator.clipboard.writeText(address)}
                      >
                        📋
                      </button>
                    </div>
                  </div>

                  <div className="wallet-data-section">
                    <p>
                      <b>ENS Name:</b> {ensName || "N/A"}
                    </p>
                    <p>
                      <b>Balance:</b> {balance?.formatted} {balance?.symbol}
                    </p>
                    <p>
                      <b>Network:</b> {chains.find((c) => c.id === chainId)?.name || "Unknown"} (ID: {chainId})
                    </p>
                    <p>
                      <b>Token Balances:</b>
                      {loading && " Loading..."}
                    </p>
                    <ul>
                      {tokenBalances.map((t, i) => (
                        <li key={i}>
                          {t.symbol}: {t.balance.toFixed(4)} {t.error && "(Error fetching)"}
                        </li>
                      ))}
                      {tokenBalances.length === 0 && !loading && (
                        <li>No tokens configured for this network</li>
                      )}
                    </ul>
                  </div>

                  <div className="network-switcher">
                    <label>
                      <b>Switch Network:</b>
                    </label>
                    <select
                      value={chainId}
                      onChange={(e) => switchChain?.({ chainId: Number(e.target.value) })}
                    >
                      {chains?.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
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
              <p>Wallet not connected</p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default WalletDetails;