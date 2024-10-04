"use client"; //need because of styled-components
import styled from 'styled-components';
import Layout from '../layout';
import { useState, useEffect } from 'react';
import Link from 'next/link'; // Import Link component

const events = [
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

export default function EventPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Container>
      <Title2>Upcoming Event</Title2>
      <EventList>
        {events.map(event => (
          <Link href={`/details/${event.id}`} key={event.id} passHref>
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const EventList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: nowrap; /* Ensure all items are in one line */
  overflow-x: auto; /* Allow horizontal scrolling if needed */
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
  margin: 20px;
  width: 300px;
  text-align: center;
  overflow: hidden;
  flex-shrink: 0; /* Prevent shrinking */
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