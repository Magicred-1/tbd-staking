'use client';

import React, { createContext, useContext } from 'react';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useSignAndSubmitTransaction,
  useSignTransaction,
  useWallet,
  useWallets,
} from '@xrpl-wallet-standard/react';
import WalletProvider from '../wallets/Provider';

interface XRPLContextType {
  wallets: ReturnType<typeof useWallets>
  selectedWallet: ReturnType<typeof useWallet>['wallet']
  account: ReturnType<typeof useAccount>
  connect: ReturnType<typeof useConnect>['connect']
  status: ReturnType<typeof useConnect>['status']
  disconnect: ReturnType<typeof useDisconnect>
  signTransaction: ReturnType<typeof useSignTransaction>
  signAndSubmitTransaction: ReturnType<typeof useSignAndSubmitTransaction>
}

// Provide a default structure for the context.
const defaultXRPLContext: XRPLContextType = {
  wallets: [],
  selectedWallet: null,
  account: null,
  connect: async () => {
    throw new Error('connect function is not initialized');
  },
  status: 'disconnected',
  disconnect: () => {
    throw new Error('disconnect function is not initialized');
  },
  signTransaction: async () => {
    throw new Error('signTransaction function is not initialized');
  },
  signAndSubmitTransaction: async () => {
    throw new Error('signAndSubmitTransaction function is not initialized');
  },
};

// Create the XRPLContext
const XRPLContext = createContext<XRPLContextType>(defaultXRPLContext);

// XRPLProvider component using <XRPLContext> directly as a provider
export const XRPLProvider = ({ children }: { children: React.ReactNode }) => {
  const wallets = useWallets();
  const { wallet: selectedWallet } = useWallet();
  const account = useAccount();
  const { connect, status } = useConnect();
  const disconnect = useDisconnect();
  const signTransaction = useSignTransaction();
  const signAndSubmitTransaction = useSignAndSubmitTransaction();

  const value = {
    wallets,
    selectedWallet,
    account,
    connect,
    status,
    disconnect,
    signTransaction,
    signAndSubmitTransaction,
  };

  return (
    <WalletProvider>
      <XRPLContext.Provider value={value}>
        {children}
      </XRPLContext.Provider>
    </WalletProvider>
  );
};

// Custom hook for consuming XRPLContext
export const useXRPL = (): XRPLContextType => {
  const context = useContext(XRPLContext);
  if (!context) {
    throw new Error('useXRPL must be used within a XRPLProvider');
  }
  return context;
};