import { ConnectButton } from '@rainbow-me/rainbowkit';
import React, { useEffect, useState } from 'react';

function ConnectWallet() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // const buttonWidth = width < 800 ? '100%' : '80%';

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        const buttonStyle = {
          display: 'inline-block',
          padding: '10px 20px',
          margin: '12px 0',
          fontWeight: '600',
          fontFamily: "Montserrat",
          background: '#ffbd00',
          color: '#090909',
          borderRadius: '5px',
          border: '1px solid #ffbd00',
          position: 'relative',
          zIndex: '1',
          width: 'max-content',
          };

        const containerStyle = {
          // width: 'max-content',
          // display: 'flex',
          // justifyContent: 'center',
        };

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            <div style={containerStyle}>
              {(() => {
                if (!connected) {
                  return (
                    <button
                      onClick={openConnectModal}
                      type="button"
                      style={buttonStyle}
                    >
                      Connect Wallet
                    </button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <button
                      onClick={openChainModal}
                      type="button"
                      style={buttonStyle}
                    >
                      Wrong network
                    </button>
                  );
                }

                return (
                  <div style={{ display: 'flex', gap: 12, width: '100%', justifyContent: 'center' }}>
                    <button
                      onClick={openChainModal}
                      style={{
                        ...buttonStyle,
                        display: 'flex',
                        alignItems: 'center',
                        // width: buttonWidth, 
                      }}
                      type="button"
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 25,
                            height: 25,
                            borderRadius: 50,
                            overflow: 'hidden',
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? 'Chain icon'}
                              src={chain.iconUrl}
                              style={{ width: 12, height: 12 }}
                            />
                          )}
                        </div>
                      )}
                      {chain.name}
                    </button>

                    <button
                      onClick={openAccountModal}
                      type="button"
                      style={{
                        ...buttonStyle,
                      }}
                    >
                      {account.displayName}
                    </button>
                  </div>
                );
              })()}
            </div>
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}

export default ConnectWallet;