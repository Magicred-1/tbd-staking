import type { Metadata } from "next";
import "./globals.css";
import WalletProvider from "@/components/wallets/Provider";
import { Lexend } from 'next/font/google';
// import { XRPLProvider } from "@/components/contexts/XRPLContext";

export const metadata: Metadata = {
  title: "TBD Staking",
  description: "Stake XRP on TBD, earn yield and secure other blockchain networks",
};

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <WalletProvider>
          <body
          className={`${lexend.className} antialiased`}
      >
            {children}
          </body>
      </WalletProvider>
    </html>
  );
}
