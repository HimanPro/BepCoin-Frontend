import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";

function isDevAppBrowser() {
  if (typeof navigator !== "undefined") {
    const ua = navigator.userAgent.toLowerCase();
    return (
      ua.includes("metamask") ||
      ua.includes("trust") ||
      ua.includes("rainbow") ||
      ua.includes("coinbase") ||
      ua.includes("argent") ||
      ua.includes("zerion") ||
      ua.includes("safepal") ||
      ua.includes("mathwallet") ||
      ua.includes("tokenpocket") ||
      ua.includes("bitkeep") ||
      ua.includes("okx") ||
      ua.includes("imtoken") ||
      ua.includes("pillar") ||
      ua.includes("onto") ||
      ua.includes("exodus") ||
      ua.includes("phantom") ||
      ua.includes("brave")
    );
  }
  return false;
}

export default function AutoConnectWrapper({ children }) {
  const { isConnected, status } = useAccount();
  const { openConnectModal } = useConnectModal();

  useEffect(() => {
    if (
      isDevAppBrowser() &&
      status === "disconnected" &&
      !isConnected &&
      openConnectModal
    ) {
      openConnectModal();
    }
  }, [isConnected, status, openConnectModal]);

  return <>{children}</>;
}
