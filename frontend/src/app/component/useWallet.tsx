import { useState, useEffect } from 'react';
import Web3 from 'web3';

export const useWallet = () => {
  const [defaultAccount, setDefaultAccount] = useState<string | null>(null);
  const [web3, setWeb3] = useState<Web3 | null>(null);

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        setDefaultAccount(accounts[0] || null);
      });
    }
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setDefaultAccount(accounts[0]);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      console.error('MetaMask not found');
    }
  };

  const disconnectWallet = () => {
    setDefaultAccount(null);
    // Optionally, you can also remove the event listener if needed
    if (window.ethereum) {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    }
  };

  const handleAccountsChanged = (accounts: string[]) => {
    setDefaultAccount(accounts[0] || null);
  };

  return {
    defaultAccount,
    connectWallet,
    disconnectWallet,
  };
};