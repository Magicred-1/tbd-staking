import type { Metadata } from "next";
import "./globals.css";
// import Provider from "@/components/wallets/Provider";
import { Lexend } from 'next/font/google';
// import { CrossmarkAdaptor, WalletConnectAdaptor, XummAdaptor } from '@xrpl-wallet/adaptors'

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
  // const xumm = new XummAdaptor({ apiKey: '7fcb00b9-b846-4ddf-ae02-2a94f18c0b2f' })
  // const crossmark = new CrossmarkAdaptor()
  // const walletconnect = new WalletConnectAdaptor({
  //   projectId: '85ad846d8aa771cd56c2bbbf30f7a183',
  //   networks: ['testnet'],
  // })

  return (
    <html lang="en">
      {/* <Provider adaptors={[
        xumm,
        crossmark,
        walletconnect,
      ]}> */}
        <body
          className={`${lexend.className} antialiased`}
      >
          {children}
      </body>
      {/* </Provider> */}
    </html>
  );
}
