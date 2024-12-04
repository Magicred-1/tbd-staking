"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface DurationOption {
  days: string
  apr: string
}

const durationOptions: DurationOption[] = [
  { days: "60D", apr: "7.22%" },
  { days: "90D", apr: "16.27%" },
  { days: "120D", apr: "20.3%" },
]

export function StakingTab() {
  const [selectedDuration, setSelectedDuration] = useState<number>(2) // Default to 120D
  const [amount, setAmount] = useState<string>("0.05")
  const [availableBalance, setAvailableBalance] = useState<number>(0.00000061)
  const [personalQuota, setPersonalQuota] = useState<number>(300000)

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^\d*\.?\d*$/.test(value) || value === "") {
      setAmount(value)
    }
  }

  const handleMaxClick = () => {
    setAmount(availableBalance.toFixed(8));
  }

  const isAmountValid = () => {
    const numAmount = parseFloat(amount)
    return !isNaN(numAmount) && numAmount >= 0.05 && numAmount <= availableBalance && numAmount <= personalQuota
  }

  useEffect(() => {
    // Calculate total locked rewards
    const numAmount = parseFloat(amount) || 0
    const apr = parseFloat(durationOptions[selectedDuration].apr) / 100
    const days = parseInt(durationOptions[selectedDuration].days)
    const totalRewards = (numAmount * apr * days) / 365
    
    // Update UI with calculated values (you can add state variables for these if needed)
    console.log(`Total Locked Rewards: ${totalRewards.toFixed(8)} XRP`)
  }, [amount, selectedDuration, availableBalance])

  return (
    <div className="space-y-6">
      {/* Duration Options */}
      <div className="grid grid-cols-3 gap-2">
        {durationOptions.map((option, index) => (
          <button
            key={option.days}
            onClick={() => setSelectedDuration(index)}
            className={cn(
              "p-4 rounded-xl text-center transition-all duration-200",
              selectedDuration === index
                ? "bg-gray-700 border-2 border-gray-600"
                : "bg-gray-800 border-2 border-transparent hover:border-gray-700"
            )}
          >
            <div className="text-gray-400 text-sm mb-1">{option.days}</div>
            <div className="text-blue-400 text-xl font-medium">{option.apr}</div>
          </button>
        ))}
      </div>

      {/* Amount Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-lg">Amount</span>
        </div>

        <div className="relative">
          <Input
            className="bg-gray-800 border-gray-700 text-gray-100 h-14 pl-4 pr-24"
            placeholder="Minimum 0.05 XRP"
            value={amount}
            onChange={handleAmountChange}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <Image src="/xrp_icon.png" alt="XRP" width={30} height={30} className="rounded-full border border-gray-700" />
              <span className="text-gray-100">XRP</span>
            </div>
            <button
              className="text-blue-400 hover:text-blue-300"
              onClick={handleMaxClick}
            >
              Max
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Available</span>
            <div className="flex items-center space-x-2">
              <span className="text-gray-100">{availableBalance.toFixed(8)}</span>
              <span className="text-gray-100">XRP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="space-y-4">
        <div className="flex space-x-4 border-b border-gray-700 pb-2">
          <Button
            variant="ghost"
            className="text-blue-400 hover:text-blue-600 hover:bg-transparent px-0 font-medium"
          >
            Summary
          </Button>
          <Button
            variant="ghost"
            className="text-gray-400 hover:text-gray-300 hover:bg-transparent px-0 font-medium"
          >
            Product Rules
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Total Locked Rewards</span>
            <span className="text-emerald-400">
              {isAmountValid()
                ? `${((parseFloat(amount) * parseFloat(durationOptions[selectedDuration].apr.slice(0, -1)) / 100) * parseInt(durationOptions[selectedDuration].days) / 365).toFixed(8)} XRP`
                : "--"}
            </span>
          </div>
          <div className="text-sm text-gray-400">APR: {durationOptions[selectedDuration].apr}</div>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400">First Distribution Date</span>
              <span className="text-gray-100">2024-12-05 01:00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Interest End Date</span>
              <span className="text-gray-100">2025-04-03 01:00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Next Subscription Date</span>
              <span className="text-gray-100">2025-04-03 01:00</span>
            </div>
          </div>

          <div className="space-y-2 text-sm text-gray-400">
            <p>* The Simple Earn APR is subject to change on a daily basis. APR does not mean the actual or predicted returns in fiat currency.</p>
            <p>* Early redemption will return your assets to your Spot Wallet within <span className="text-gray-100">72 hours</span>.</p>
          </div>
        </div>
      </div>

      <Button 
        className="w-full h-12 bg-gray-700 hover:bg-gray-600 text-gray-100"
        disabled={!isAmountValid()}
      >
        Confirm
      </Button>
    </div>
  )
}

