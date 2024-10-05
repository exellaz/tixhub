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
  const [eventPoster, setEventPoster] = useState<File | null>(null);
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(2);
  };

	const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
	  const newEvent = {
		eventName,
		eventDate,
		eventTime,
		eventVenue,
		eventDescription,
		ticketPrice: `${ticketPrice} ETH`,
		ticketAmount,
		ticketsPerAccount,
		organiserAddress,
      eventPoster: eventPoster ? URL.createObjectURL(eventPoster) : ''
	  };

	  onSubmit(newEvent);
	  alert('Successfully created event');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setEventPoster(e.target.files[0]);
    }
	};

  return (
    <PageContainer>
      <CenteredContainer>
        <FormContainer onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <Label>Event Name</Label>
              <Input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} />
              <Label>Event Date</Label>
              <Input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
              <Label>Event Venue</Label>
              <Input type="text" value={eventVenue} onChange={(e) => setEventVenue(e.target.value)} />
              <Label>Event Description</Label>
              <Input type="text" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} />
              <Button type="button" onClick={handleNext}>Next</Button>
            </>
          )}
          {step === 2 && (
            <>
              <Label>Ticket Price</Label>
              <Input type="text" value={ticketPrice} onChange={(e) => setTicketPrice(e.target.value)} />
              <Label>Ticket Amount</Label>
              <Input type="number" value={ticketAmount} onChange={(e) => setTicketAmount(e.target.value)} />
              <Label>Tickets Per Account</Label>
              <Input type="number" value={ticketsPerAccount} onChange={(e) => setTicketsPerAccount(e.target.value)} />
              <Label>Organiser Address</Label>
              <Input type="text" value={organiserAddress} onChange={(e) => setOrganiserAddress(e.target.value)} />
              <Label>Event Poster</Label>
              <Input type="file" onChange={handleFileChange} />
              <Button type="submit">Create Event</Button>
            </>
          )}
        </FormContainer>
      </CenteredContainer>
    </PageContainer>
  );
};

export default EventForm;

/////////////////////////////// STYLING ///////////////////////////////////
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: url('/path/to/your/background.jpg') no-repeat center center fixed;
  background-size: cover;
`;

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  padding: 20px;
`;

const FormContainer = styled.form`
  background: rgba(255, 255, 255, 0.5); /* White background with 50% transparency */
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  color: black; /* Changed text color to black for better readability */
`;

const Label = styled.p`
  margin: 10px 0 5px;
  font-size: 1rem;
  font-weight: bold;
`;

const Input = styled.input`
  display: block;
  margin-bottom: 15px;
  padding: 10px;
  font-size: 16px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
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
  width: 100%;

  &:hover {
    background-color: #005bb5;
  }
`
