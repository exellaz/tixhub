"use client";
import React, { useState } from 'react';
import styled from 'styled-components';
import EventForm from '../admin/EventForm'; // Import EventForm component
import DetailsPage from '../details/page'; // Import DetailsPage component
import Record from '../admin/events.json'; // Import JSON file

interface EventData {
  id: number;
  eventName: string;
  eventDate: string;
  eventVenue: string;
  eventDescription: string;
  ticketPrice: string;
  ticketAmount: string;
  ticketsPerAccount: string;
  organiserAddress: string;
  eventPoster: string;
}

const events: EventData[] = Record;

const EventPage: React.FC = () => {
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  const handleEventClick = (eventId: number) => {
    setSelectedEventId(eventId); // Set the selected event ID when clicked
  };

  const handleFormSubmit = async (formData: FormData) => {
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to create event');
      }

      const newEvent = await response.json();
      console.log('Event created:', newEvent);
      // Optionally, update the local state or refetch the events list
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <Container>
      {selectedEventId === null ? (
        <>
          <Title2>Upcoming Event</Title2>
          <EventList>
            {events.map(event => (
              <EventCard key={event.id} onClick={() => handleEventClick(event.id)}>
                <EventImage src={event.eventPoster} alt={`Event ${event.id}`} />
                <EventTitle>{event.eventName}</EventTitle>  {/* Displays title */}
                <EventDate>{event.eventDate}</EventDate>    {/* Displays date */}
                <EventPrice>{event.ticketPrice}</EventPrice> {/* Displays price */}
              </EventCard>
            ))}
          </EventList>
        </>
      ) : (
        <DetailsPage eventId={selectedEventId} /> // Pass the selected event ID to DetailsPage
      )}
    </Container>
  );
};

export default EventPage;

/////////////////////////////// STYLING ///////////////////////////////////
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const EventList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Three columns */
  gap: 20px; /* Space between items */
  justify-items: center; /* Center items horizontally */
`;

export const Title2 = styled.h1`
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

export const EventImage = styled.img`
  width: 100%;
  height: 200px; /* Set a fixed height */
  object-fit: cover; /* Ensure the image covers the area without distortion */
`;

export const EventTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 10px 0;
  color: #333;
`;

export const EventDate = styled.p`
  font-size: 1rem;
  color: #555;
  margin: 5px 0;
`;

export const EventPrice = styled.div`
  padding: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
`;
