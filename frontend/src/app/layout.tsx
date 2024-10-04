import "./globals.css";
import NavBar from "./navbar";
import type { ReactNode } from "react";
import { WalletProvider } from "../component/walletConnect";

//main function Layout
export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <WalletProvider>
        <NavBar />
        {children}
        </WalletProvider>
      </body>
    </html>
  );
}