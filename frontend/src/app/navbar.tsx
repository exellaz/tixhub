"use client"; //need because of styled-components
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image'; // Import Image component
import Web3 from 'web3';

declare global {
  interface Window {
    ethereum: any;
  }
}

//function shorten Address
const shortenAddress = (address: string) => {
  if (address.length > 10) { //if address is more than 10
    return `${address.slice(0, 6)}...${address.slice(-4)}`; //return the first 6 and last 4
  }
  return address;
};

//navigation bar
const NavBar = () => {
  const [defaultAccount, setDefaultAccount] = useState<string | null>(null); //defaultAccount is null

  useEffect(() => {
    if (defaultAccount) { //check if the account is stored
      setDefaultAccount(defaultAccount); //set the default account
    } 

    ////check if metamask change account then the account of the button also change
    if (window.ethereum) { //check if metamask is installed
      window.ethereum.on('accountsChanged', handleAccountChange); 
    }
  }, []);

  //function to connect wallet
  const connectWalletHandler = async () => {
    if (window.ethereum) { //check the metamask is installed
      try { //try to connect
        const result = await window.ethereum.request({ method: 'eth_requestAccounts' }); //request account from metamask
        accountChangedHandler(result[0]);  //get the first account
        window.ethereum.on('accountsChanged', handleAccountChange); //check if metamask change account then the account of the button also change
      } catch (error) { //if fail
        console.error("User denied account access");
      }
    } else { //if metamask is not installed
      console.log("Please install MetaMask!");
    }
  };

  //function for handling account change
  const handleAccountChange = (accounts: string[]) => { //array of account
    if (accounts.length > 0) { //if account is found
      accountChangedHandler(accounts[0]); //get the first account
    } else {
      console.log('No account found'); //if no account found
    }
  };

  //function for handling account change
  const accountChangedHandler = (account: string) => {
    setDefaultAccount(account); //set the default account
  };

  return (
    <NavBarContainer>
      <NavBarContent>
        <Branding>TicketPlatform</Branding>
        <NavLinks>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/event">Event</NavLink>
          <NavLink href="/profile">Profile</NavLink>
        </NavLinks>
        {defaultAccount ? (
          <UserAddress>
            <Image src="/images/metamask_icon.png" alt="MetaMask Icon" width={24} height={24} />
            {shortenAddress(defaultAccount)}
          </UserAddress>
        ) : (
          <ConnectButton onClick={connectWalletHandler}>Connect Wallet</ConnectButton>
        )}
      </NavBarContent>
    </NavBarContainer>
  );
};

const NavBarContainer = styled.nav`
  background-color: black; /* bg-gray-800 */
  padding: 1rem; /* p-4 */
`;

const NavBarContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Branding = styled.div`
  color: white;
  font-size: 1.5rem; /* text-2xl */
  font-weight: bold;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem; /* space-x-4 */
`;

const NavLink = styled(Link)`
  color: white;
`;

const ConnectButton = styled.button`
  background-color: #2e2e2e; /* bg-blue-500 */
  color: white;
  padding: 0.5rem 1rem; /* px-4 py-2 */
  border-radius: 0.25rem; /* rounded */
`;

const UserAddress = styled.div`
  color: white;
  margin-left: 1rem;
  background-color: #2e2e2e; /* bg-blue-500 */
  padding: 0.5rem 1rem; /* px-4 py-2 */
  border-radius: 0.25rem; /* rounded */
`;

export default NavBar;