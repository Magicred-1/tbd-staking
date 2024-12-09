"use client"

import { useState, useEffect, useCallback } from 'react'
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle, ExternalLink } from 'lucide-react'
import Confetti from 'react-confetti'
import Image from 'next/image'

interface LoadingConfirmationDialogProps {
  isOpen: boolean
  onClose: () => void
  transactionHash: string
  amount: string
}

export function LoadingConfirmationDialog({
  isOpen,
  onClose,
  transactionHash,
  amount,
}: LoadingConfirmationDialogProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [showConfetti, setShowConfetti] = useState(false)
  const [dialogSize, setDialogSize] = useState({ width: 0, height: 0 })

  const dialogRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setDialogSize({
        width: node.getBoundingClientRect().width,
        height: node.getBoundingClientRect().height,
      })
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsLoading(false)
        setShowConfetti(true)
      }, 3000) // Simulate a 3-second loading process

      return () => clearTimeout(timer)
    } else {
      setIsLoading(true)
      setShowConfetti(false)
    }
  }, [isOpen])

  const handleClose = () => {
    setIsLoading(true)
    setShowConfetti(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-gray-100 border-gray-800 overflow-hidden">
        <div ref={dialogRef} className="relative flex flex-col items-center justify-center py-8 space-y-4">
          {!isLoading && showConfetti && (
            <Confetti
              width={dialogSize.width}
              height={dialogSize.height}
              recycle={false}
              numberOfPieces={200}
              gravity={0.2}
              initialVelocityY={10}
              tweenDuration={5000}
              className="absolute top-0 left-0"
            />
          )}
          {isLoading ? (
            <>
              <Loader2 className="h-16 w-16 text-blue-500 animate-spin" />
              <div className="flex flex-col gap-2 items-center">
                <p className="text-xl font-medium">Staking</p> 
                <Image
                  src="/xrp_icon.png"
                  alt="XRP"
                  width={40}
                  height={40}
                  className="rounded-full bg-emerald-500"
                />
                <p className="text-xl">{amount} XRP ...</p>
              </div>
            </>
          ) : (
            <>
              <CheckCircle className="h-16 w-16 text-green-500" />
              <p className="text-xl font-medium">Stake confirmed!</p>
              <p className="text-gray-400 text-center">Your tokens have successfully been added to the staking pool. Start earning rewards now!</p>
              <a
                href={`https://xrpscan.com/tx/${transactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 flex items-center space-x-1"
              >
                <span>View transaction</span>
                <ExternalLink className="h-4 w-4" />
              </a>
              <Button
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white"
                onClick={handleClose}
              >
                Close
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

