import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "react-hot-toast";
import Web3 from "web3";

// Initialize Web3 with a fallback provider (MetaMask or a default RPC)
const web3 = new Web3(
  window.ethereum || "https://eth-mainnet.g.alchemy.com/v2/tO_FPsuW9FEXXtmHOauwN"
);

// Export web3 instance for use in other files
export { web3 };

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster />
    <App web3={web3} />
  </React.StrictMode>
);