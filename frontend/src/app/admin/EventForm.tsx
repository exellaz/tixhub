import React, { useState } from 'react';
import styled from 'styled-components';
import { EventData } from './types';

interface EventFormProps {
  onSubmit: (eventData: EventData) => void;
}

const EventForm: React.FC<EventFormProps> = ({ onSubmit }) => {
	const [eventName, setEventName] = useState('');
	const [eventDate, setEventDate] = useState('');
	const [eventTime, setEventTime] = useState('');
	const [eventVenue, setEventVenue] = useState('');
	const [eventDescription, setEventDescription] = useState('');
	const [ticketPrice, setTicketPrice] = useState('');
	const [ticketAmount, setTicketAmount] = useState('');
	const [ticketsPerAccount, setTicketsPerAccount] = useState('');
	const [organiserAddress, setOrganiserAddress] = useState('');

	const handleSubmit = () => {
	  const eventData = {
		eventName,
		eventDate,
		eventTime,
		eventVenue,
		eventDescription,
		ticketPrice,
		ticketAmount,
		ticketsPerAccount,
		organiserAddress,
	  };
	  onSubmit(eventData);
	};

	return (
	  <CenteredContainer>
		<h1>New Event</h1>
		<p>Event Name:</p>
		<Input
		  type='text'
		  placeholder='Enter event name'
		  value={eventName}
		  onChange={(e) => setEventName(e.target.value)}
		/>
		<p>Date:</p>
		<Input
		  type='date'
		  value={eventDate}
		  onChange={(e) => setEventDate(e.target.value)}
		/>
		<p>Time:</p>
		<Input
		  type='time'
		  value={eventTime}
		  onChange={(e) => setEventTime(e.target.value)}
		/>
		<p>Venue:</p>
		<Input
		  type='text'
		  placeholder='Enter event venue'
		  value={eventVenue}
		  onChange={(e) => setEventVenue(e.target.value)}
		/>
		<p>Description:</p>
		<Input
		  type='text'
		  placeholder='Enter event description'
		  value={eventDescription}
		  onChange={(e) => setEventDescription(e.target.value)}
		/>
		<p>Price</p>
		<Input
		  type='number'
		  placeholder='Enter ticket price'
		  value={ticketPrice}
		  onChange={(e) => setTicketPrice(e.target.value)}
		/>
		<p>Ticket amount</p>
		<Input
		  type='number'
		  placeholder='Enter ticket amount'
		  value={ticketAmount}
		  onChange={(e) => setTicketAmount(e.target.value)}
		/>
		<p>Tickets per account:</p>
		<Input
		  type='number'
		  placeholder='Enter tickets per account'
		  value={ticketsPerAccount}
		  onChange={(e) => setTicketsPerAccount(e.target.value)}
		/>
		<p>Organiser Address:</p>
		<Input
		  type='text'
		  placeholder='Enter organiser address'
		  value={organiserAddress}
		  onChange={(e) => setOrganiserAddress(e.target.value)}
		/>
		<Button onClick={handleSubmit}>Create Event</Button>
	  </CenteredContainer>
	);
  };

export default EventForm;

/////////////////////////////// STYLING ///////////////////////////////////
const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
`;

const Input = styled.input`
  display: block;
  margin-bottom: 10px;
  padding: 8px;
  font-size: 16px;
  width: 100%;
  max-width: 400px;
  color: blue;
`;

const Button = styled.button`
  margin: 20px 0;
  padding: 10px 20px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #005bb5;
  }
`
