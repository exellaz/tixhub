"use client";
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

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
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
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

interface DetailsPageProps {
  eventId: number;
}

const DetailsPage: React.FC<DetailsPageProps> = ({ eventId }) => {
  const eventIdNumber = parseInt(eventId as unknown as string, 10);

  return (
    <PageBackground>
      {eventIdNumber === 1 && (
        <>
          <HeaderImage src="/images/eventbackground.jpeg" alt="HeaderImage" />
          <MainContainer>
            <TextContainer>
              <WorldTourSign>WORLD TOUR</WorldTourSign>
              <Title>Taylor Swift The <PinkColor>Era Tour</PinkColor></Title>
              <Description>Don't miss the chance, get your ticket now!</Description>
              <CountdownTimer />
              <BuyButton>Buy Ticket</BuyButton>
            </TextContainer>
            <ImageContainer>
              <TitleImage src="/images/event1.jpg" alt="Taylor Swift Image" />
            </ImageContainer>
          </MainContainer>
        </>
      )}
      {eventIdNumber === 2 && (
        <>
          <HeaderImage src="/images/eventbackground.jpeg" alt="HeaderImage" />
          <MainContainer>
            <TextContainer>
              <WorldTourSign>WORLD TOUR</WorldTourSign>
              <Title>Cold Play <PinkColor>Era Tour</PinkColor></Title>
              <Description>Don't miss the chance, get your ticket now!</Description>
              <CountdownTimer />
              <BuyButton>Buy Ticket</BuyButton>
            </TextContainer>
            <ImageContainer>
              <TitleImage src="/images/event2.jpg" alt="Cold Play Image" />
            </ImageContainer>
          </MainContainer>
        </>
      )}
      {eventIdNumber === 3 && (
        <>
          <HeaderImage src="/images/eventbackground.jpeg" alt="HeaderImage" />
          <MainContainer>
            <TextContainer>
              <WorldTourSign>WORLD TOUR</WorldTourSign>
              <Title>Bruno Mars <PinkColor>Era Tour</PinkColor></Title>
              <Description>Don't miss the chance, get your ticket now!</Description>
              <CountdownTimer />
              <BuyButton>Buy Ticket</BuyButton>
            </TextContainer>
            <ImageContainer>
              <TitleImage src="/images/event3.jpg" alt="Bruno Mars Image" />
            </ImageContainer>
          </MainContainer>
        </>
      )}
      {!eventIdNumber && <div>Event not found</div>}
    </PageBackground>
  );
};

export default DetailsPage;

// Styled components
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

const PinkColor = styled.span`
  color: blue;
`;

const BuyButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: black;
  background-color: #4ad0ff; //light blue
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

const TimerContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const TimeBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.5rem;
`;

const Label = styled.span`
  font-size: 0.75rem;
  margin-top: 5px;
`;

const Description = styled.p`
  margin-top: 10px;
  font-size: 1.2rem;
`;