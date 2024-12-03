"use client"

import { useState } from 'react'
import { Search, ExternalLink, Clock, Wallet, Trophy, Users } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WalletConnectDialog } from './wallet-connect-dialog'
import { StakingTab } from './staking-tab'
import Image from "next/image"

type Provider = {
  name: string;
  key: string;
  delegation: string;
  commission: string;
  url: string;
}

const providers: Provider[] = [
  { name: "RippleX", key: "r9Kf...", delegation: "3245.83", commission: "3%", url: "https://ripple.com" },
  { name: "XRPL Commons", key: "rT3b...", delegation: "2891.45", commission: "2%", url: "https://xrplcommons.org" },
  { name: "XRPL Labs", key: "rH1b...", delegation: "2891.45", commission: "5%", url: "https://xrpl-labs.com" },
  { name: "Gatehub", key: "rP3t...", delegation: "1567.21", commission: "5%", url: "https://gatehub.net" },
  { name: "Bithomp", key: "rB4x...", delegation: "982.67", commission: "3%", url: "https://bithomp.com" },
  { name: "XRP Toolkit", key: "rJ2d...", delegation: "756.92", commission: "5%", url: "https://xrptoolkit.com" },
]

export default function StakingDashboard() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null)

  const filteredProviders = providers.filter(provider => 
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.key.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      <header className="border-b border-gray-700">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-clip-text text-white">
            <div className="flex items-center space-x-2 gap-2">
              <Image src="/xrp_icon.png" alt="XRP" width={30} height={30} className="rounded-full border border-gray-700" />
              XRP Staking
            </div>
          </h1>
          <WalletConnectDialog />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg mb-8 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 lg:divide-x divide-gray-700">
            <div className="flex items-center space-x-3 px-4">
              <div className="p-2 bg-gray-700/50 rounded-lg">
                <Clock className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Staking Window</div>
                <div className="font-medium text-gray-200">Opened</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 px-4">
              <div className="p-2 bg-gray-700/50 rounded-lg">
                <Wallet className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Confirmed TVL</div>
                <div className="font-medium text-gray-200">15320.45987459 XRP</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 px-4">
              <div className="p-2 bg-gray-700/50 rounded-lg">
                <Clock className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Pending Stake</div>
                <div className="font-medium text-gray-200">0 XRP</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-700/50 rounded-lg">
                  <Trophy className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Delegations</div>
                  <div className="font-medium text-gray-200">12.5K</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-700/50 rounded-lg">
                  <Users className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Stakers</div>
                  <div className="font-medium text-gray-200">8.2K</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-gray-100">Step-1: Select a finality provider</CardTitle>
                <CardDescription className="text-gray-400">Choose a provider to stake your XRP</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by Name or Public Key"
                    className="pl-10 bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="space-y-2 max-h-[calc(100vh-400px)] overflow-y-auto pr-2">
                  {filteredProviders.map((provider) => (
                    <Card 
                      key={provider.key} 
                      className={`bg-gray-750 border-gray-600 hover:bg-gray-700 transition-all duration-300 cursor-pointer ${
                        selectedProvider?.key === provider.key ? 'border-2 border-blue-400' : ''
                      }`}
                      onClick={() => setSelectedProvider(provider)}
                    >
                      <CardContent className="p-4">
                        <div className="grid grid-cols-4 gap-4 items-center">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="h-2 w-2 bg-green-500 rounded-full" />
                              <span className="font-medium text-gray-100">{provider.name}</span>
                              <a 
                                href={provider.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                onClick={(e) => e.stopPropagation()}
                                className="hover:text-blue-400 transition-colors duration-300"
                              >
                                <ExternalLink className="h-4 w-4 text-gray-400 cursor-pointer hover:text-blue-400 transition-colors duration-300" />
                              </a>
                            </div>
                          </div>
                          <div className="font-mono text-sm text-gray-400">{provider.key}</div>
                          <div className="font-mono text-sm text-blue-400">{provider.delegation} XRP</div>
                          <div className="text-sm text-purple-400">{provider.commission}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Tabs defaultValue="connect" className="bg-gray-800 border border-gray-700 rounded-lg p-1">
              <TabsList className="grid w-full grid-cols-2 bg-gray-750">
                <TabsTrigger value="connect" className="data-[state=active]:bg-gray-700">Connect</TabsTrigger>
                <TabsTrigger value="stake" className="data-[state=active]:bg-gray-700">Stake</TabsTrigger>
              </TabsList>
              <TabsContent value="connect">
                <Card className="border-0 bg-transparent">
                  <CardHeader>
                    <CardTitle className="text-gray-100">Connect Wallet</CardTitle>
                    <CardDescription className="text-gray-400">Link your XRP wallet to start staking</CardDescription>
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
                    <StakingTab />
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

