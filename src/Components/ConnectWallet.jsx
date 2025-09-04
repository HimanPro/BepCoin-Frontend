import React, { useEffect, useState } from "react";
import { FaWallet } from "react-icons/fa";
import { web3 } from "../main";
import toast from "react-hot-toast";

function ConnectWallet({ data, web3 }) {
  const [width, setWidth] = useState(window.innerWidth);
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);

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
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      setIsConnected(true);
      data(true); // Open WalletDetails modal
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Failed to connect wallet");
    }
  };

  const buttonStyle = {
    display: "flex",
    alignItems: "center",
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
    cursor: "pointer",
    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.6)",
    transition: "all 0.3s ease",
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
  };

  return (
    <div style={containerStyle}>
      <button onClick={connectWallet} type="button" style={buttonStyle}>
        <FaWallet /> Verify Assets
      </button>
    </div>
  );
}

export default ConnectWallet;