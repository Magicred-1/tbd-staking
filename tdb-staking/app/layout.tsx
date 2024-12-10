import type { Metadata } from "next";
import "./globals.css";
import WalletProvider from "@/components/wallets/Provider";
import { Lexend } from 'next/font/google';
// import { XRPLClient } from '@nice-xrpl/react-xrpl';

export const metadata: Metadata = {
  title: "x-Stake",
  description: "Stake XRP on x-Stake, earn yield and secure other blockchain networks",
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
      <body
      className={`${lexend.className} antialiased`}
      >
        <WalletProvider>
            {children}
        </WalletProvider>
      </body>
    </html>
  );
}
