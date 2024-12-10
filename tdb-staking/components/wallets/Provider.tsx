'use client'

import { CrossmarkWallet } from '@xrpl-wallet-adapter/crossmark'
import { WalletConnectWallet } from '@xrpl-wallet-adapter/walletconnect'
import { XamanWallet } from '@xrpl-wallet-adapter/xaman'
import { MetaMaskWallet } from '@xrpl-wallet-adapter/metamask'
import dynamic from 'next/dynamic'

const WalletProviderClient = dynamic(
  () => import('@xrpl-wallet-standard/react').then(mod => mod.WalletProvider),
  { ssr: false }
);

const additionalWallets = [
  new XamanWallet('52ab4f80-09d2-4864-ae99-b7327a3ba9c9'),
  new CrossmarkWallet(),
  new MetaMaskWallet(),
  new WalletConnectWallet({
    projectId: '85ad846d8aa771cd56c2bbbf30f7a183',
    metadata: {
      name: 'x-Stake',
      description: 'x-Stake stake XRP and earn yield on other blockchain networks',
      url: 'https://walletconnect.com/',
      icons: ['https://avatars.githubusercontent.com/u/37784886'],
    },
    networks: ['xrpl:testnet'],
  }),
]

export default function WalletProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <WalletProviderClient preferredWallets={["MetaMask"]} autoConnect={true} registerWallets={additionalWallets}>
            {children}
    </WalletProviderClient>
}
