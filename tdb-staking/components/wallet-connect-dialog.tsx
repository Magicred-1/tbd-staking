import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image"
import { useConnect, useWallets, useWallet } from '@xrpl-wallet-standard/react'

export function WalletConnectDialog() {
  const wallets = useWallets()
  const { wallet: selectedWallet } = useWallet()
  const { connect } = useConnect() // Destructure to get the connect function

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all duration-300">
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-800 text-gray-100 border-gray-700">
        <DialogHeader>
          <DialogTitle>Connect your wallet</DialogTitle>
          <DialogDescription className="text-gray-400">
            Choose a wallet to connect to the XRPL network.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {wallets.length > 0 ? (
            wallets.map((wallet) => (
              <Button
                key={wallet.name}
                variant="outline"
                className="flex items-center justify-start space-x-2 h-12 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-left"
                onClick={() => connect(wallet)} // Connect to selected wallet
              >
                {/* Display wallet icon and name */}
                <Image
                  src={`/${wallet.name}_icon.png`} // Check for the availability of icons for each wallet
                  alt={wallet.name}
                  width={24}
                  height={24}
                  className="rounded-full border border-gray-700"
                />
                <span>{wallet.name}</span>
              </Button>
            ))
          ) : (
            <Button
              variant="outline"
              className="flex items-center justify-start space-x-2 h-12 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-left"
            >
              <span>{selectedWallet?.name}</span>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
