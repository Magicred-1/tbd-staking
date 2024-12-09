import type { Metadata } from "next";
import "./globals.css";
import WalletProvider from "@/components/wallets/Provider";
import { Lexend } from 'next/font/google';

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
