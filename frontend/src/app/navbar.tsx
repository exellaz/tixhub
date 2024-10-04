"use client"; //need because of styled-components
import styled from 'styled-components';
import Link from 'next/link';
import { useWallet } from '../component/walletConnect';
import Image from 'next/image'; // Import Image component

const NavBar = () => {
  const { defaultAccount, connectWallet } = useWallet();

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
            {shortenAddress(defaultAccount)}
          </UserAddress>
        ) : (
          <ConnectButton onClick={connectWallet}>Connect Wallet</ConnectButton>
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