"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

declare global {
  interface Window {
    ethereum: any;
  }
}

interface WalletContextType {
  defaultAccount: string | null;
  connectWallet: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [defaultAccount, setDefaultAccount] = useState<string | null>(null);

  useEffect(() => {
    const storedAccount = localStorage.getItem('defaultAccount');
    if (storedAccount) {
      setDefaultAccount(storedAccount);
    }

    // Listen for account changes and update the defaultAccount state
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: any) => {
        if (accounts.length > 0) {
          accountChangedHandler(accounts[0]);
        } else {
          console.log('No account found');
        }
      });
    }
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const result = await window.ethereum.request({ method: 'eth_requestAccounts' });
        accountChangedHandler(result[0]);   

      } catch (error) {
        console.error("User denied account access");
      }
    } else {
      console.log("Please install MetaMask!");
    }
  };

  const accountChangedHandler = (account: string) => {
    setDefaultAccount(account);
    localStorage.setItem('defaultAccount', account);
  };

  return (
    <WalletContext.Provider value={{ defaultAccount, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('use Wallet must be used within a WalletProvider');
  }
  return context;
};
