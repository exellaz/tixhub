"use client"; //need because of styled-components
import styled from 'styled-components';
import React from 'react';
import Link from 'next/link'; // Import Link component
import Record from '../admin/events.json'; // Import JSON file

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
  return (
    <Container>
      <Title2>Upcoming Event</Title2>
      <EventList>
        {events.map(event => (
          <Link href={{ pathname: '/details'}} key={event.id}>
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
