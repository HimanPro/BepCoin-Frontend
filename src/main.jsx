import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "react-hot-toast";
import Web3 from "web3";

const BSC_RPC = "https://bsc-dataseed.binance.org";
const OPNB_RPC = "https://opbnb-testnet-rpc.publicnode.com";

// Default Web3 (read-only)
let web3 = new Web3(BSC_RPC);
// let web3 = new Web3(OPNB_RPC);

// ✅ If wallet exists (MetaMask, TrustWallet, Coinbase, Brave etc.)
if (window.ethereum) {
  web3 = new Web3(window.ethereum);
}

// ✅ Function to request wallet connection
export async function connectWallet() {
  if (!window.ethereum) {
    alert("No wallet found! Please install MetaMask or TrustWallet.");
    return null;
  }
  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    await switchToBSC(); // Force BSC
    return accounts[0];
  } catch (err) {
    console.error("Wallet connection failed:", err);
    return null;
  }
}

// export async function connectWallet() {
//   if (!window.ethereum) {
//     alert("No wallet found! Please install MetaMask or TrustWallet.");
//     return null;
//   }
//   try {
//     const accounts = await window.ethereum.request({
//       method: "eth_requestAccounts",
//     });
//     await switchToOpBNB(); 
//     return accounts[0];
//   } catch (err) {
//     console.error("Wallet connection failed:", err);
//     return null;
//   }
// }

// ✅ Force Binance Smart Chain Network
export async function switchToBSC() {
  if (!window.ethereum) return;
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x38" }], // 56 = BSC Mainnet
    });
  } catch (switchError) {
    if (switchError.code === 4902) {
      // If BSC not added → add it
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x38",
            chainName: "Binance Smart Chain",
            nativeCurrency: {
              name: "BNB",
              symbol: "BNB",
              decimals: 18,
            },
            rpcUrls: [BSC_RPC],
            blockExplorerUrls: ["https://bscscan.com"],
          },
        ],
      });
    } else {
      console.error("Network switch failed:", switchError);
    }
  }
}

// ✅ Force OPBNB Network
export async function switchToOpBNB() {
  if (!window.ethereum) return;
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x15eb" }], // 5611 = opBNB Testnet
    });
  } catch (switchError) {
    if (switchError.code === 4902) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x15eb", // 5611 in hex
            chainName: "opBNB Testnet",
            nativeCurrency: {
              name: "tBNB",
              symbol: "tBNB",
              decimals: 18,
            },
            rpcUrls: [OPNB_RPC],
            blockExplorerUrls: ["https://opbnb-testnet.bscscan.com"],
          },
        ],
      });
    } else {
      console.error("Network switch failed:", switchError);
    }
  }
}

// ✅ Auto-detect network change
if (window.ethereum) {
  window.ethereum.on("chainChanged", async (chainId) => {
    if (chainId !== "0x38") {
      console.warn("Wrong network detected, switching to BSC...");
      await switchToBSC();
    }
  });
}

// if (window.ethereum) {
//   window.ethereum.on("chainChanged", async (chainId) => {
//     if (chainId !== "0x15eb") {
//       // ✅ opBNB Testnet
//       console.warn("Wrong network detected, switching to opBNB Testnet...");
//       await switchToOpBNB();
//     }
//   });
// }

export { web3 };

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster />
    <App web3={web3} connectWallet={connectWallet} />
  </React.StrictMode>
);
