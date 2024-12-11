
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react'

interface ConfirmStakeDialogProps {
  isOpen: boolean
  onClose: () => void
  amount: string
  estimatedRewards: string
  onConfirm: () => void
  APR: string
  stakingPeriod: number // Staking period in days
}

export function ConfirmStakeDialog({
  isOpen,
  onClose,
  amount,
  // estimatedRewards,
  onConfirm,
  APR,
  stakingPeriod,
}: ConfirmStakeDialogProps) {
  const [xrpPrice, setXrpPrice] = useState<number>(0)
  // const [atomPrice, setAtomPrice] = useState<number>(0)

  // https://api.diadata.org/v1/assetQuotation/XRPL/0x0000000000000000000000000000000000000000
  const fetchXRPPrice = async () => {
    const XRP_PRICE = await fetch(`https://api.diadata.org/v1/assetQuotation/XRPL/0x0000000000000000000000000000000000000000`)
    const data = await XRP_PRICE.json()
    setXrpPrice(data.Price)
  }

  useEffect(() => {
    fetchXRPPrice()
  }, [])


  // Calculate rewards based on amount, APR, and staking period
  const calculateRewards = (amountInXRP: string): string => {
    const xrpAmount = parseFloat(amountInXRP)
    const aprValue = parseFloat(APR)
    if (isNaN(xrpAmount) || isNaN(aprValue) || stakingPeriod <= 0) return "0"
    const rewards = (xrpAmount * (aprValue / 100) * (stakingPeriod / 365))
    return rewards.toFixed(6) // Rounded to 6 decimal places
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-gray-100 border-gray-800">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-normal">Confirm Stake</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="rounded-lg bg-gray-800/50 p-4 space-y-4">
            <div className="text-lg text-gray-300">Staking</div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Image
                  src="/xrp_icon.png"
                  alt="XRP"
                  width={40}
                  height={40}
                  className="rounded-full bg-emerald-500"
                />
                <span className="text-xl">XRP</span>
              </div>
              <div className="text-right">
                <div className="text-xl">{amount}</div>
                <div className="text-sm text-gray-400">≈${(parseFloat(amount) * xrpPrice).toFixed(2)}</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              {/* Tokens Rewards */}
              <span className="text-gray-400">Estimated Rewards</span>
              <div className="text-right">
                <div>{calculateRewards(amount)} XRP</div>
                <div className="text-sm text-gray-400">≈${(parseFloat(calculateRewards(amount)) * xrpPrice).toFixed(2)}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="w-full bg-transparent text-gray-100 border-gray-700 hover:bg-gray-800 hover:text-gray-100"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              className="w-full bg-blue-500 hover:bg-blue-600 text-gray-900"
              onClick={onConfirm}
            >
              Confirm
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
