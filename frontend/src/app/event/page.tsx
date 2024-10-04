"use client"; //need because of styled-components
import styled from 'styled-components';
import { useState, useEffect } from 'react';

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

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (): TimeLeft => {
  const difference = +new Date('2024-11-05') - +new Date();
  let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }

  return timeLeft;
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <TimerContainer>
      <TimeBox>{timeLeft.days || '0'}<Label>Days</Label></TimeBox>
      <TimeBox>{timeLeft.hours || '0'}<Label>Hours</Label></TimeBox>
      <TimeBox>{timeLeft.minutes || '0'}<Label>Minutes</Label></TimeBox>
      <TimeBox>{timeLeft.seconds || '0'}<Label>Seconds</Label></TimeBox>
    </TimerContainer>
  );
};

export default function EventPage() {

  return (
      <PageBackground>
        <HeaderImage src="/images/eventbackground.jpeg" alt="HeaderImage" />
        <MainContainer>
          <TextContainer>
            <WorldTourSign>WORLD TOUR</WorldTourSign>
            <Title>Blackpink in Your <PinkColor> Area </PinkColor></Title>
            <Description>Don't miss the chance, get your ticket now!</Description>
            <CountdownTimer />
            <BuyButton>Buy Ticket</BuyButton>
          </TextContainer>
          <ImageContainer>
            <TitleImage src="/images/blackpink.png" alt="Blackpink Image" />
          </ImageContainer>
        </MainContainer>
        <Container>
          <Title2>Upcoming Event</Title2>
          <EventList>
            {events.map(event => (
              <EventCard key={event.id}>
                <EventImage src={event.image} alt={`Event ${event.id}`} />
                <EventTitle>{event.title}</EventTitle>  {/* Displays title */}
                <EventDate>{event.date}</EventDate>    {/* Displays date */}
                <EventPrice>{event.price}</EventPrice> {/* Displays price */}
              </EventCard>
            ))}
          </EventList>
        </Container>
      </PageBackground>
  );
};

const PageBackground = styled.div`
  position: relative;
  background-color: black;
  min-height: 100vh;
  color: white;
`;

const HeaderImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  opacity: 0.3; 
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 50px;
  left: 20px;
  right: 20px;
  padding: 50px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  height: 450px;
`;

const TextContainer = styled.div`
  flex: 1;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: left;
  margin-left: 60px;
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  margin-right: 100px;
`;

const WorldTourSign = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
`;

const Title2 = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

const Description = styled.p`
  margin-top: 10px;
  font-size: 1rem;
`;

const BuyButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: black;
  background-color: pink;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #585554; //lighter black
    color: white;
  }
`;

const TitleImage = styled.img`
  width: 300px; /* Adjust the size as needed */
  height: auto;
`;

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

const PinkColor = styled.span`
  color: pink;
`;

const TimerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const TimeBox = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  min-width: 60px;
`;

const Label = styled.div`
  font-size: 0.8rem;
  margin-top: 5px;
`;
