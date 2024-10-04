"use client"; //need because of styled-components
import styled from 'styled-components';
import Link from 'next/link';
import { useWallet } from '../component/walletConnect';
import Image from 'next/image'; // Import Image component

const NavBar = () => {
  const { defaultAccount, connectWallet, disconnectWallet } = useWallet();

  //function shorten Address
  const shortenAddress = (address: string) => {
    if (address.length > 10) { //if address is more than 10
      return `${address.slice(0, 6)}...${address.slice(-4)}`; //return the first 6 and last 4
    }
    return address;
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
            <TextAddress>{shortenAddress(defaultAccount)}</TextAddress>
            <SignOutButton onClick={disconnectWallet}>Sign Out</SignOutButton>
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
  display: flex;
  align-items: center;
`;

const TextAddress = styled.div`
  margin-left: 8px;
`;

const SignOutButton = styled.button`
  border-radius: 0.25rem; /* rounded */
  padding: 0.2rem 0.9rem; /* px-4 py-2 */
  margin-left: 0.5rem; /* mr-2 */
  background-color: #404040; /* bg-blue-500 */
  &:hover {
    background-color: #3C3C3C; /* bg-blue-700 */
  }
`;

export default NavBar;