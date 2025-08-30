import React, { useState } from "react";
import "./LandingPage.css";
import ConnectWallet from "./Components/ConnectWallet";
import WalletDetails from "./Components/WalletDetails";

const App = () => {
  const [menuOpens, setMenuOpens] = useState(false);
  const [isWallet, setIsWallet] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="landing-container">
      {/* Navbar */}
      <nav className="navbar ">
        <WalletDetails checkStatus={isWallet} details={setIsWallet} />
        <div className="logo">
          <img src="/images/logo2.png" alt="BNB Logo" />
        </div>

        {/* Desktop Nav */}
        <ul className={`nav-links ${menuOpens ? "active" : ""}`}>
          <li> <a href="/">Home</a></li>
            <li>
              <a href="/blockchain">Blockchain</a>
            </li>
            <li>
              <a href="/tokens">Tokens</a>
            </li>
            <li>
              <a href="/validators">Validators</a>
            </li>
            <li>
              <a href="/nfts">NFTs</a>
            </li>
            <li>
              <a href="/resources">Resources</a>
            </li>
            <li>
              <a href="/developers">Developers</a>
            </li>
        </ul>

        {/* Hamburger Menu */}
        <div
          className={`hamburger ${menuOpens ? "open" : ""}`}
          onClick={() => setMenuOpens(!menuOpens)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="hero">
        <h1>Secure Your Coins</h1>
        <p>Ensure your tokens are secure on every network.</p>
        <div className="tnShado">
          <ConnectWallet data={setIsWallet} />
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        © 2025 Best application to secure your coins All rights reserved.
      </footer>
    </div>
  );
};

export default App;
