"use client"

import { useState } from 'react'
import { Search, ExternalLink, Clock, Wallet, Trophy, Users } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WalletConnectDialog } from "./components/wallet-connect-dialog"

type Provider = {
  name: string;
  key: string;
  delegation: string;
  commission: string;
}

const providers: Provider[] = [
  { name: "RippleX", key: "r9Kf...", delegation: "3245.83", commission: "3%" },
  { name: "XRPL Commons", key: "rT3b...", delegation: "2891.45", commission: "2%" },
  { name: "XRPL Labs", key: "rH1b...", delegation: "2891.45", commission: "5%" },
  { name: "Gatehub", key: "rP3t...", delegation: "1567.21", commission: "5%" },
  { name: "Bithomp", key: "rB4x...", delegation: "982.67", commission: "3%" },
  { name: "XRP Toolkit", key: "rJ2d...", delegation: "756.92", commission: "5%" },
]

export default function StakingDashboard() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProviders = providers.filter(provider => 
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.key.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      <header className="border-b border-gray-700">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">XRP Staking</h1>
          <WalletConnectDialog />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {[
            { title: "Staking Window", icon: Clock, value: "Opened", valueColor: "text-green-400" },
            { title: "Confirmed TVL", icon: Wallet, value: "15320.45 XRP", valueColor: "text-blue-400" },
            { title: "Pending Stake", icon: Clock, value: "-1.2 XRP", valueColor: "text-red-400" },
            { title: "Delegations", icon: Trophy, value: "12.5K", valueColor: "text-yellow-400" },
            { title: "Stakers", icon: Users, value: "8.2K", valueColor: "text-purple-400" },
          ].map((item, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">{item.title}</CardTitle>
                <item.icon className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${item.valueColor}`}>{item.value}</div>
              </CardContent>
            </Card>
          ))}
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
                    <Card key={provider.key} className="bg-gray-750 border-gray-600 hover:bg-gray-700 transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="grid grid-cols-4 gap-4">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="h-2 w-2 bg-green-500 rounded-full" />
                              <span className="font-medium text-gray-100">{provider.name}</span>
                              <ExternalLink className="h-4 w-4 text-gray-400 cursor-pointer hover:text-blue-400 transition-colors duration-300" />
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
                  <CardHeader>
                    <CardTitle className="text-gray-100">Stake XRP</CardTitle>
                    <CardDescription className="text-gray-400">Choose amount and duration</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="amount" className="text-sm font-medium text-gray-300">Amount (XRP)</label>
                        <Input id="amount" placeholder="Enter XRP amount" className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="duration" className="text-sm font-medium text-gray-300">Duration (days)</label>
                        <Input id="duration" placeholder="Enter staking duration" className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400" />
                      </div>
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all duration-300">
                        Stake XRP
                      </Button>
                    </div>
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

