"use client"; //need because of styled-components
import styled from 'styled-components';
import Link from 'next/link';
import { useWallet } from '../component/walletConnect';
import Image from 'next/image';
import { useState, useEffect } from 'react'; // Import useState and useEffect

const NavBar = () => {
  const { defaultAccount, connectWallet, disconnectWallet } = useWallet();
  const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown visibility
  const [isAdmin, setIsAdmin] = useState(false); // State to check if user is admin

  // Function to shorten address
  const shortenAddress = (address: string) => {
    if (address.length > 10) {
      return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }
    return address;
  };

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // Check if the connected address is the admin address
  useEffect(() => {
    const adminAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'.toLowerCase();
    if (defaultAccount && defaultAccount.toLowerCase() === adminAddress) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [defaultAccount]);

  return (
    <NavBarContainer>
      <NavBarContent>
        <Branding>TicketPlatform</Branding>
        <NavLinks>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/event">Event</NavLink>
          <NavLink href="/profile">Profile</NavLink>
          {isAdmin && <NavLink href="/admin">Admin</NavLink>}
        </NavLinks>
        {defaultAccount ? (
          <UserAddress>
            <Image src="/images/metamask_icon.png" alt="MetaMask Icon" width={24} height={24} />
            <TextAddress>{shortenAddress(defaultAccount)}</TextAddress>
            <DropdownButton onClick={toggleDropdown}>▼</DropdownButton>
            {dropdownVisible && (
              <DropdownMenu>
                <DropdownItem onClick={disconnectWallet}>Sign Out</DropdownItem>
              </DropdownMenu>
            )}
          </UserAddress>
        ) : (
          <ConnectButton onClick={connectWallet}>Connect Wallet</ConnectButton>
        )}
      </NavBarContent>
    </NavBarContainer>
  );
};

/////////////////////////////// STYLING ///////////////////////////////////
const NavBarContainer = styled.nav`
  background-color: black;
  padding: 1rem;
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
  font-size: 1.5rem;
  font-weight: bold;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  color: white;
`;

const ConnectButton = styled.button`
  background-color: #2e2e2e;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
`;

const UserAddress = styled.div`
  color: white;
  margin-left: 1rem;
  background-color: #2e2e2e;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  position: relative;
`;

const TextAddress = styled.div`
  margin-left: 8px;
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  color: white;
  margin-left: 8px;
  cursor: pointer;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #2e2e2e;
  border-radius: 0.25rem;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
`;

const DropdownItem = styled.div`
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: #3C3C3C;
  }
`;

export default NavBar;