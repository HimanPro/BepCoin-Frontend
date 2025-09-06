import React, { useEffect, useState } from "react";
import { FaWallet } from "react-icons/fa";
import { web3 } from "../main";
import toast from "react-hot-toast";

function ConnectWallet({ data, web3 }) {
  const [width, setWidth] = useState(window.innerWidth);
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [loading, setLoading] = useState(false); // 🔹 loading state

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.getChainId();
        setAccount(accounts[0] || null);
        setChainId(Number(networkId));
        setIsConnected(!!accounts[0]);
      } catch (error) {
        console.error("Error checking connection:", error);
      }
    };
    checkConnection();

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts[0] || null);
        setIsConnected(!!accounts[0]);
      });
      window.ethereum.on("chainChanged", (networkId) => {
        setChainId(Number(networkId));
      });
    }
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error("Please install MetaMask or another wallet");
      return;
    }
    try {
      setLoading(true); // 🔹 start loading
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      setIsConnected(true);
      data(true); // Open WalletDetails modal
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Failed to connect wallet");
    } finally {
      setLoading(false); // 🔹 stop loading
    }
  };

  const buttonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "16px 24px",
    margin: "12px 0",
    fontWeight: 600,
    fontSize: "18px",
    fontFamily: "Montserrat, sans-serif",
    background: "#f0b90b",
    color: "#000",
    borderRadius: "6px",
    border: "none",
    cursor: loading ? "not-allowed" : "pointer",
    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.6)",
    transition: "all 0.3s ease",
    opacity: loading ? 0.6 : 1, // 🔹 dull background when loading
  };

  const spinnerStyle = {
    width: "18px",
    height: "18px",
    border: "3px solid rgba(0,0,0,0.2)",
    borderTop: "3px solid #000",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <button
        onClick={connectWallet}
        type="button"
        style={buttonStyle}
        disabled={loading} // 🔹 disable while loading
      >
        {loading && <div style={spinnerStyle}></div>}
        <FaWallet /> Verify Assets
      </button>

      {/* Spinner keyframes */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default ConnectWallet;
