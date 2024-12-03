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

export function WalletConnectDialog() {
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
          <Button variant="outline" className="flex items-center justify-start space-x-2 h-12 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-left">
            {/* <WalletConnect className="h-5 w-5" /> */}
            <Image src="/walletconnect_icon.png" alt="WalletConnect" width={24} height={24} className="rounded-full border border-gray-700" />
            <span>WalletConnect</span>
          </Button>
          <Button variant="outline" className="flex items-center justify-start space-x-2 h-12 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-left">
            <Image src="/xaman.webp" alt="Xam" width={24} height={24} className="rounded-full border border-gray-700" />
            {/* <Smartphone className="h-5 w-5" /> */}
            <span>Xaman</span>
          </Button>
          <Button variant="outline" className="flex items-center justify-start space-x-2 h-12 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-left">
            {/* <CreditCard className="h-5 w-5" /> */}
            <Image src="/crossmark_icon.png" alt="Crossmark" width={24} height={24} className="rounded-full border border-gray-700" />
            <span>Crossmark</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

