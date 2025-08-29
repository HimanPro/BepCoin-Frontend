import { createConfig, http } from 'wagmi';
import { arbitrum, bsc, mainnet, opBNB, optimism, polygon, sepolia } from 'wagmi/chains';

export const config = createConfig({
  chains: [mainnet, sepolia, bsc, polygon, opBNB],
  transports: {
  [mainnet.id]: http(),
  [polygon.id]: http(),
  [optimism.id]: http(),
  [arbitrum.id]: http(),
  [bsc.id]: http(),
  },
});