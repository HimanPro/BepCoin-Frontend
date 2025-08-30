import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useEffect, useState } from "react";

function ConnectWallet({data}) {
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
        const connected = ready && account && chain; // simplified

        const buttonStyle = {
          display: "inline-block",
          padding: "10px 20px",
          margin: "12px 0",
          fontWeight: 600,
          fontFamily: "Montserrat",
          background: "#ffbd00",
          color: "#090909",
          borderRadius: "5px",
          border: "1px solid #ffbd00",
          position: "relative",
          zIndex: 1,
          width: "max-content",
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
                  Check Status
                </button>
              ) : (
                <button
  onClick={() => {
    if (account && chain) data(true); // set wallet modal visible
  }}
  type="button"
  style={buttonStyle}
>
  Check Status
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
