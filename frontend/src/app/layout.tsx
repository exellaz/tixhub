import "./globals.css";
import NavBar from "./navbar";
import type { ReactNode } from "react";

//main function Layout
export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}