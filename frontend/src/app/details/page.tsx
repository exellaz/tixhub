"use client";
import styled from 'styled-components';

const EventDetails = () => {
  return (
    <PageBackground>
      <Container>
        <EventTitle>Event Details</EventTitle>
        <EventDescription>This is the details page for the event.</EventDescription>
      </Container>
    </PageBackground>
  );
};

export default EventDetails;

const PageBackground = styled.div`
  position: relative;
  background-color: black;
  min-height: 100vh;
  color: white;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const EventTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const EventDescription = styled.p`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;