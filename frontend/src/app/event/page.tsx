"use client"; //need because of styled-components
import styled from 'styled-components';
import React from 'react';
import Link from 'next/link'; // Import Link component
import Record from '../admin/events.json'; // Import JSON file
import { IDKitWidget, VerificationLevel, ISuccessResult, useIDKit } from '@worldcoin/idkit';
import { verify } from '../../component/verifyProof';
import { useWallet } from '../../component/walletConnect';
import { init } from '../../component/contractExecution';
import { mintToken } from '../../component/contractExecution';

const staticEvents = [
  {
    id: 1,
    image: '/images/event1.jpg',
    title: 'Taylor Swift | The Era Tour',
    date: '2024-11-05',
    price: '1 ETH'
  },
  {
    id: 2,
    image: '/images/event2.jpg',
    title: 'Cold Play Summer Tour',
    date: '2024-12-11',
    price: '1 ETH'
  },
  {
    id: 3,
    image: '/images/event3.jpg',
    title: 'Bruno Mars 24K Magic Tour',
    date: '2025-01-03',
    price: '1 ETH'
  },
  // Add more events as needed
];

const events = [
  ...staticEvents,
  ...Record.map((event, index) => ({
    id: staticEvents.length + index + 1, // Ensure unique IDs
    image: '/images/adele.png', // Default image or map accordingly
    title: event.eventName,
    date: event.eventDate,
    price: event.ticketPrice
  }))
];

export default function EventPage() {
	const defaultAccount = useWallet();
	const [isSuccess, setSuccess] = React.useState(false);

	const handleBuyTicket = () => {
	  if (!defaultAccount) {
		alert("Please connect your wallet to buy tickets!");
	  } else {
		try{
		  init();
		} catch (error) {
		  console.error(error);
	  }
	}
  }

  const handleMintToken = () => {
	console.log('Minting token')
	if (!defaultAccount) {
		alert("Please connect your wallet to buy tickets!");
	  } else {
		try{
		  mintToken();
		} catch (error) {
		  console.error(error);
	  }
	}
  }

   //get the app_id and action from the environment variables
   const app_id = process.env.NEXT_PUBLIC_WLD_APP_ID as `app_${string}`;
   const action = process.env.NEXT_PUBLIC_WLD_ACTION;

   //error handling if app_id and action is not set
   if (!app_id) {
	 throw new Error("app_id is not set in environment variables!");
   }
   if (!action) {
	 throw new Error("action is not set in environment variables!");
   }

   //open the worldcoin verification when the button is clicked
   const { setOpen } = useIDKit();

   // This function is called when a user has been successfully verified
   const onSuccess = (result: ISuccessResult): void => {
	 //do code here after successful verification
	 // setSuccess(true);
	 handleMintToken();
	 console.log(JSON.stringify(result, null, 2));
   };

   // This function is called when a user has been successfully verified and the proof has been sent to the backend
   const handleProof = async (result: ISuccessResult) => {
	 console.log(
	   "Proof received from IDKit, sending to backend:\n",
	   JSON.stringify(result)
	 ); // Log the proof from IDKit to the console for visibility


   //get the proof from the backend (verify the proof)
	 const data = await verify(result);
	 if (data.success == true) { //check if the verification was success or not
	   console.log("Successful response from backend:\n", JSON.stringify(data)); // Log the response from our backend for visibility
	 }
   else {
	   throw new Error(`${data.detail}`); // Throw an error if the verification failed
	 }
   };


	return (
	  <Container>
		<Title2>Upcoming Event</Title2>
		<EventList>
		  {events.map(event => (
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
		<IDKitWidget
			  action={action}
			  app_id={app_id}
			  onSuccess={onSuccess}
			  handleVerify={handleProof}
			  verification_level={VerificationLevel.Device}
			/>
		  <button onClick={handleBuyTicket}>create event</button>
		  <br />
		  <button onClick={() => setOpen(true)}>mint token</button>
	  </Container>
	);
  };

/////////////////////////////// STYLING ///////////////////////////////////
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const EventList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Three columns */
  gap: 20px; /* Space between items */
  justify-items: center; /* Center items horizontally */
`;

const Title2 = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

const EventCard = styled.div`
  background-color: #fff;
  border: 1px solid;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
  overflow: hidden;
  transition: transform 0.3s ease; /* Add transition */
  cursor: pointer; /* Add pointer cursor on hover */

  &:hover {
    transform: translateY(-10px); /* Move up on hover */
  }
`;

const EventImage = styled.img`
  width: 100%;
  height: 200px; /* Set a fixed height */
  object-fit: cover; /* Ensure the image covers the area without distortion */
`;

const EventTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 10px 0;
  color: #333;
`;

const EventDate = styled.p`
  font-size: 1rem;
  color: #555;
  margin: 5px 0;
`;

const EventPrice = styled.div`
  padding: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
`;
