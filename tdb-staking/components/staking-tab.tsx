"use client"

import { useState } from "react"
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
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <Image src="/xrp_icon.png" alt="XRP" width={30} height={30} className="rounded-full border border-gray-700" />
              <span className="text-gray-100">XRP</span>
            </div>
            <span className="text-blue-400">Max</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Available</span>
            <div className="flex items-center space-x-2">
              <span className="text-gray-100">0.00000061</span>
              <span className="text-gray-100">XRP</span>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Personal Remaining Quota</span>
            <div className="flex items-center space-x-2">
              <span className="text-gray-100">300,000</span>
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
            <span className="text-emerald-400">--</span>
          </div>
          <div className="text-sm text-gray-400">APR: 0.3%</div>
          
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

      <Button className="w-full h-12 bg-gray-700 hover:bg-gray-600 text-gray-100">
        Confirm
      </Button>
    </div>
  )
}

