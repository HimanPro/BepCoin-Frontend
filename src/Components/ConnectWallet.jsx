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
                  <FaWallet /> CHECK
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (account && chain) data(true);
                  }}
                  type="button"
                  style={buttonStyle}
                >
                  <FaWallet /> CHECK
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
