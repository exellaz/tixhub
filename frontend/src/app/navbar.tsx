"use client"; //need because of styled-components
import styled from 'styled-components';
import Link from 'next/link';
import { useWallet } from '../component/walletConnect';
import Image from 'next/image';
import { useState, useEffect } from 'react'; // Import useState and useEffect
import { Web3 } from 'web3'; // Import Web3
import ABI from '../component/ABI.json'; // Import ABI
import { CONTRACT_ADDRESS } from '../component/contractAddress'; // Import CONTRACT_ADDRESS

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

  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
  console.log("default: ", defaultAccount);
 
  useEffect(() => {
    const fetchOwnerAddress = async () => {
      try {
        const adminAddress = await contract.methods.owner().call();
        console.log("admin: ", adminAddress);
        if (defaultAccount && defaultAccount === adminAddress.toLowerCase()) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error fetching owner address:", error);
      }
    };
  
    fetchOwnerAddress();
  }, [defaultAccount]);

  return (
    <NavBarContainer>
      <NavBarContent>
        <Branding>TixHub</Branding>
        <NavLinks>
          <NavLink href="/"><HomeNav>Home</HomeNav></NavLink>
          <NavLink href="/event"><EventNav>Event</EventNav></NavLink>
          <NavLink href="/profile"><ProfileNav>Profile</ProfileNav></NavLink>
          {isAdmin && <NavLink href="/admin"><AdminNav>Admin</AdminNav></NavLink>}
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
const HomeNav = styled.div`
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  border-bottom: 3px solid transparent;
  &:hover {
    border-bottom: 3px solid #f2f2f2;
  }
  &:active {
  border-bottom: 3px solid #f2f2f2;
  }
  &:focus {
    outline: none; /* Remove default focus outline */
    border-bottom: 3px solid #f2f2f2;
  }
`;

const EventNav = styled.div`
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  border-bottom: 3px solid transparent;
  &:hover {
    border-bottom: 3px solid #f2f2f2;
  }
  &:active {
  border-bottom: 3px solid #f2f2f2;
  }
  &:focus {
    outline: none; /* Remove default focus outline */
    border-bottom: 3px solid #f2f2f2;
  }
`;

const ProfileNav = styled.div`
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  border-bottom: 3px solid transparent;
  &:hover {
    border-bottom: 3px solid #f2f2f2;
  }
  &:active {
  border-bottom: 3px solid #f2f2f2;
  }
  &:focus {
    outline: none; /* Remove default focus outline */
    border-bottom: 3px solid #f2f2f2;
  }
`;

const AdminNav = styled.div`
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  border-bottom: 3px solid transparent;
  &:hover {
    border-bottom: 3px solid #f2f2f2;
  }
  &:active {
  border-bottom: 3px solid #f2f2f2;
  }
  &:focus {
    outline: none; /* Remove default focus outline */
    border-bottom: 3px solid #f2f2f2;
  }
`;

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