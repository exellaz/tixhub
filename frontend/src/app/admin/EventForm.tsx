import React, { useState } from 'react';
import styled from 'styled-components';
import { EventData } from './types';
import { createEvent } from '../../component/contractExecution';

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
  const [eventPoster, setEventPoster] = useState<File | null>(null); // Added eventPoster state
  const [step, setStep] = useState(1);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setEventPoster(e.target.files[0]);
    }
  };

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
      eventPoster: eventPoster ? URL.createObjectURL(eventPoster) : '', // Include eventPoster
    };
    onSubmit(eventData);
    alert('Successfully created event');
  };

  return (
    <CenteredContainer>
      <FormContainer>
        <BoldHeading>New Event</BoldHeading>
        {step === 1 && (
          <>
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
            <Button onClick={() => setStep(2)}>Next</Button>
          </>
        )}
        {step === 2 && (
          <>
            <p>Description:</p>
            <Input
              type='text'
              placeholder='Enter event description'
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
            />
            <p>Price (ETH)</p>
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
            <p>Event Poster</p>
            <Input
              type='file'
              onChange={handleFileChange}
            />  {/* Moved event poster input here */}
            <Button onClick={handleSubmit}>Create Event</Button>
          </>
        )}
      </FormContainer>
    </CenteredContainer>
  );
};

export default EventForm;

/////////////////////////////// STYLING ///////////////////////////////////

const BoldHeading = styled.h1`
  font-weight: bold;
  color : black;
  font-size: 20px;
`;

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
`;

const FormContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.4); /* 50% transparency */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 50%;
  max-width: 400px;
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
`;
