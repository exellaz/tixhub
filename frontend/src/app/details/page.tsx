import React from 'react';
import styled from 'styled-components';
import Record from '../admin/events.json'; // Import JSON file

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
  const event = Record.find(event => event.id === eventId);

  if (!event) {
    return <p>Event not found</p>;
  }

  return (
    <PageBackground>
      <HeaderImage src="/images/eventbackground.jpeg" alt="HeaderImage" />
      <MainContainer>
        <TextContainer>
          <WorldTourSign>WORLD TOUR</WorldTourSign>
          <Title>{event.eventName}</Title>
          <Description>Don't miss the chance, get your ticket now!</Description>
          <Description>Location: {event.eventVenue}</Description>
          <Description>Date: {event.eventDate}</Description>
          {/* <CountdownTimer eventDate={event.eventDate} /> */}
          <BuyButton>Buy Ticket</BuyButton>
        </TextContainer>
        <ImageContainer>
          <TitleImage src={event.eventPoster} alt="Event Image" />
        </ImageContainer>
      </MainContainer>
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
