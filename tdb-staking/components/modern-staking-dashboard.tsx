"use client"

import { useState } from 'react'
import { Search, ExternalLink, Clock, Wallet, Trophy, Users } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WalletConnectDialog } from './wallet-connect-dialog'
import { StakingTab } from './staking-tab'
import Image from "next/image"
import { FAQ } from './faq-section'
// import { useXRPL } from './contexts/XRPLContext'
import {
  useAccount,
  useConnectionStatus,
  useDisconnect,
} from '@xrpl-wallet-standard/react'
import { Button } from './ui/button'

type Provider = {
  name: string;
  key: string;
  delegation: string;
  commission: string;
  url: string;
  network: 'Cosmos' | 'Avalanche' | 'Polkadot';
}

const cosmosProviders: Provider[] = [
  { name: "Cosmos Hub", key: "cosmos1abcdefghijklmnoprstuvwx1234567", delegation: "3245.83", commission: "3%", url: "https://cosmos.network", network: "Cosmos" },
  { name: "Osmosis", key: "osmo1abcdefghijklmnoprstuvwx1234567", delegation: "2891.45", commission: "2%", url: "https://osmosis.zone", network: "Cosmos" },
  { name: "Juno Network", key: "juno1abcdefghijklmnoprstuvwx1234567", delegation: "1567.21", commission: "5%", url: "https://junonetwork.io", network: "Cosmos" },
];

const avalancheProviders: Provider[] = [
  { name: "Avalanche Foundation", key: "0xabcdef1234567890abcdef1234567890abcdef12", delegation: "4567.89", commission: "4%", url: "https://www.avax.network", network: "Avalanche" },
  { name: "Ava Labs", key: "0x1234567890abcdef1234567890abcdef12345678", delegation: "3456.78", commission: "3%", url: "https://www.avalabs.org", network: "Avalanche" },
];

const polkadotProviders: Provider[] = [
  { name: "Polkadot Network", key: "1abcdefgHijklmnoprstuvwxyz123456", delegation: "5678.90", commission: "5%", url: "https://polkadot.network", network: "Polkadot" },
  { name: "Kusama", key: "CabcdefgHijklmnoprstuvwxyz123456", delegation: "2345.67", commission: "4%", url: "https://kusama.network", network: "Polkadot" },
  { name: "Acala", key: "1aRcdefgHijklmnoprstuvwxyz123456", delegation: "1234.56", commission: "3%", url: "https://acala.network", network: "Polkadot" },
];

const allProviders = [...cosmosProviders, ...avalancheProviders, ...polkadotProviders]

const shortenAddress = (address: string) => {
  return address.slice(0, 6) + '...' + address.slice(-4)
}

export default function StakingDashboard() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null)
  const account = useAccount()
  const disconnect = useDisconnect()

  const filteredProviders = allProviders.filter(provider => 
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.key.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const renderProviderCards = (providers: Provider[]) => (
    <div className="space-y-2 max-h-[calc(100vh-500px)] overflow-y-auto pr-2">
      {providers.map((provider) => (
        <Card 
          key={provider.key} 
          className={`bg-gray-750 border-gray-600 hover:bg-gray-700 transition-all duration-300 cursor-pointer ${
            selectedProvider?.key === provider.key ? 'border-2 border-blue-400' : ''
          }`}
          onClick={() => setSelectedProvider(provider)}
        >
          <CardContent className="p-4">
            <div className="grid grid-cols-5 gap-4 items-center">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse-slow" />
                  <span className="font-medium text-gray-100">{provider.name}</span>
                  <a 
                    href={provider.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={(e) => e.stopPropagation()}
                    className="hover:text-blue-400 transition-colors duration-300"
                  >
                    <ExternalLink className="h-4 w-4 text-gray-400 hover:text-blue-400" />
                  </a>
                </div>
              </div>
              <div className="font-mono text-sm text-gray-400">{shortenAddress(provider.key)}</div>
              <div className="font-mono text-sm text-blue-400">{provider.delegation} Tokens</div>
              <div className="text-sm text-purple-400">{provider.commission}</div>
              <div className="text-sm text-gray-400">{provider.network}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      <header className="border-b border-gray-700">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-clip-text text-white">
            <div className="flex items-center space-x-2 gap-2">
              <Image src="/logo.png" alt="x-Stake" width={150} height={200} />
            </div>
          </h1>
          {useConnectionStatus() === 'connected' ? (
            <div className="flex items-center space-x-4">
              <div className="bg-gray-700 rounded-full px-4 py-2 flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm font-medium text-gray-200">{shortenAddress(account?.address || "")}</span>
              </div>
              <Button 
                onClick={() => disconnect()} 
                variant="outline" 
                className="
                  border-gray-600 text-gray-200 bg-blue-600
                  hover:bg-blue-700 
                  hover:text-white transition-colors duration-200"
              >
                Disconnect
              </Button>
            </div>
          ) : (
            <WalletConnectDialog />
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg mb-8 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 lg:divide-x divide-gray-700">
            <div className="flex items-center space-x-3 px-4">
              <div className="p-2 bg-gray-700/50 rounded-lg">
                <Clock className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Staking Window</div>
                <div className="font-medium text-gray-200">Opened</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 px-4">
              <div className="p-2 bg-gray-700/50 rounded-lg">
                <Wallet className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Confirmed TVL</div>
                <div className="font-medium text-gray-200">25320.45987459 Tokens</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 px-4">
              <div className="p-2 bg-gray-700/50 rounded-lg">
                <Clock className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Pending Stake</div>
                <div className="font-medium text-gray-200">0 Tokens</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-700/50 rounded-lg">
                  <Trophy className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Delegations</div>
                  <div className="font-medium text-gray-200">18.7K</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-700/50 rounded-lg">
                  <Users className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Stakers</div>
                  <div className="font-medium text-gray-200">12.3K</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 pb-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-gray-100">Step-1: Select a validator provider</CardTitle>
                <CardDescription className="text-gray-400">Choose a validator to stake your tokens</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by Name, Public Key, or Network"
                    className="pl-10 bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Tabs defaultValue="cosmos" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-3 bg-gray-750">
                    <TabsTrigger value="cosmos" className="text-white data-[state=active]:bg-blue-400">
                      <div className="flex items-center space-x-2 gap-2">
                        <Image src="/cosmos_icon.png" alt="Cosmos" width={30} height={30} className="rounded-full border border-white" />
                        Cosmos
                      </div>
                    </TabsTrigger>
                    <TabsTrigger value="avalanche" className="text-white data-[state=active]:bg-blue-400">
                      <div className="flex items-center space-x-2 gap-2">
                        <Image src="/avalanche_icon.png" alt="Avalanche" width={30} height={30} className="rounded-full border border-white" />
                        Avalanche
                      </div>
                    </TabsTrigger>
                    <TabsTrigger value="polkadot" className="text-white data-[state=active]:bg-blue-400">
                      <div className="flex items-center space-x-2 gap-2">
                        <Image src="/polkadot_icon.png" alt="Polkadot" width={30} height={30} className="rounded-full border border-white" />
                        Polkadot
                      </div>
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="cosmos">
                    {renderProviderCards(filteredProviders.filter(p => p.network === 'Cosmos'))}
                  </TabsContent>
                  <TabsContent value="avalanche">
                    {renderProviderCards(filteredProviders.filter(p => p.network === 'Avalanche'))}
                  </TabsContent>
                  <TabsContent value="polkadot">
                    {renderProviderCards(filteredProviders.filter(p => p.network === 'Polkadot'))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            <FAQ />
          </div>

          <div>
          <Tabs 
          defaultValue={useConnectionStatus() === 'connected' ? "stake" : "connect"} 
          className="bg-gray-800 border border-gray-700 rounded-lg p-1"
        >
          <TabsList className="grid w-full grid-cols-2 bg-gray-750">
            <TabsTrigger 
              value="connect" 
              className="data-[state=active]:bg-blue-400 data-[state=active]:text-white"
              disabled={useConnectionStatus() === 'connected'}
            >
              Connect
            </TabsTrigger>
            <TabsTrigger 
              value="stake" 
              className="data-[state=active]:bg-blue-400 data-[state=active]:text-white"
              disabled={useConnectionStatus() !== 'connected'}
            >
              Stake
            </TabsTrigger>
          </TabsList>
          <TabsContent value="connect">
            <Card className="border-0 bg-transparent">
              <CardHeader>
                <CardTitle className="text-gray-100">Connect Wallet</CardTitle>
                <CardDescription className="text-gray-400">Link your wallet to start staking</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center text-center">
                <Wallet className="h-16 w-16 mb-4 text-blue-400" />
                <WalletConnectDialog />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="stake">
            <Card className="border-0 bg-transparent">
              <CardContent>
                {useConnectionStatus() === 'connected' ? (
                  <StakingTab />
                ) : (
                  <p className="text-center text-gray-400">Please connect your wallet first to stake</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}

