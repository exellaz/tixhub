"use client"

import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import styled from 'styled-components';
import Link from 'next/link';
import { Container, EventList, EventCard, EventImage, EventTitle, EventDate, EventPrice } from '../event/page';
import ABI from '../../component/ABI.json';
import { CONTRACT_ADDRESS } from '@/component/contractAddress';

declare global {
  interface Window {
    ethereum: any;
  }
}

interface EventData {
	id: string;
	title: string;
	date: string;
	price: string;
	image: string;
  }

export default function ProfilePage() {
  const [tickets, setTickets] = useState<EventData[]>([]);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [contract, setContract] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
      const contractInstance = new web3Instance.eth.Contract(ABI, CONTRACT_ADDRESS);
      setContract(contractInstance);
    }
  }, []);

  useEffect(() => {
    async function fetchTickets() {
      if (web3 && contract) {
        const userTickets = await fetchUserTickets(web3, contract);
        setTickets(userTickets);
      }
    }

    fetchTickets();
  }, [web3, contract]);

  return (
	<Container>
		<EventList>
		{tickets.map(event => (
			<Link key={event.id} href={{ pathname: '/details'}}>
			  <EventCard>
				<EventImage src={event.image} alt={`Event ${event.id}`} />
				<EventTitle>{event.title}</EventTitle>  {/* Displays title */}
				<EventDate>{event.date}</EventDate>    {/* Displays date */}
				<EventPrice>{event.price}</EventPrice> {/* Displays price */}
			  </EventCard>
			</Link>
		  ))}
		</EventList>
	</Container>
  );
}

async function fetchUserTickets(web3: Web3, contract: any): Promise<EventData[]> {
  try {
    const accounts = await web3.eth.getAccounts();
    const defaultAccount = accounts[0];
    const result = await contract.methods.getTokensOfUser(defaultAccount).call({ from: defaultAccount });

    // Assuming result is an array of ticket objects
    return result.map((ticket: any) => ({
		id: ticket.id,
		title: ticket.eventName,
		date: ticket.eventDate,
		time: ticket.eventTime,
		venue: ticket.venue,
		description: ticket.description,
		price: ticket.ticketPrice
	}))
  } catch (error) {
    console.error('Error calling smart contract function:', error);
    return [];
  }
}
