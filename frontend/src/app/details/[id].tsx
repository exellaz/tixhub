import { useRouter } from 'next/router';
import styled from 'styled-components';

const events = [
  { 
    id: 1, 
    image: '/images/event1.jpg', 
    title: 'Taylor Swift | The Era Tour', 
    date: '2024-11-05', 
    price: '1 ETH',
    description: 'Join Taylor Swift for an unforgettable night of music and magic.'
  },
  { 
    id: 2, 
    image: '/images/event2.jpg', 
    title: 'Cold Play Summer Tour', 
    date: '2024-12-11', 
    price: '1 ETH',
    description: 'Experience Cold Play live in concert during their summer tour.'
  },
  { 
    id: 3, 
    image: '/images/event3.jpg', 
    title: 'Bruno Mars 24K Magic Tour', 
    date: '2025-01-03', 
    price: '1 ETH',
    description: 'Don\'t miss Bruno Mars on his 24K Magic Tour.'
  },
  // Add more events as needed
];

const EventDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const event = events.find(event => event.id === parseInt(id as string));

  if (!event) {
    return <p>Event not found</p>;
  }

  return (
    <Container>
      <EventImage src={event.image} alt={event.title} />
      <EventTitle>{event.title}</EventTitle>
      <EventDate>{event.date}</EventDate>
      <EventPrice>{event.price}</EventPrice>
      <EventDescription>{event.description}</EventDescription>
    </Container>
  );
};

export default EventDetails;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const EventImage = styled.img`
  width: 100%;
  height: 300px; /* Set a fixed height */
  object-fit: cover; /* Ensure the image covers the area without distortion */
`;

const EventTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin: 10px 0;
  color: #333;
`;

const EventDate = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin: 5px 0;
`;

const EventPrice = styled.div`
  padding: 10px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

const EventDescription = styled.p`
  font-size: 1rem;
  color: #555;
  margin: 10px 0;
  text-align: center;
  max-width: 600px;
`;