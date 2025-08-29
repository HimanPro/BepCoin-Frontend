import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@rainbow-me/rainbowkit/styles.css";

import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, bsc } from "wagmi/chains";
import { http } from "@wagmi/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a QueryClient instance
const queryClient = new QueryClient();

// Configure chains and transports
const chains = [mainnet, polygon, optimism, arbitrum, bsc];
const transports = {
  [mainnet.id]: http(),
  [polygon.id]: http(),
  [optimism.id]: http(),
  [arbitrum.id]: http(),
  [bsc.id]: http(),
};

// Get default wallets
const { connectors } = getDefaultWallets({
  appName: "My App",
  projectId: "a00fd414445702b7dcd0ef56dba0b1df", // Replace with your actual WalletConnect project ID
  chains,
});

// Create Wagmi config
const wagmiConfig = createConfig({
  chains,
  connectors,
  transports,
  autoConnect: true,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <App />
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  </React.StrictMode>
);

// Export wagmiConfig for use in other files (e.g., WalletDetails.jsx)
export const config = wagmiConfig;