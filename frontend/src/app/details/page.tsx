import React from 'react';
import styled from 'styled-components';
import Record from '../admin/events.json'; // Import JSON file
import { IDKitWidget, VerificationLevel, ISuccessResult, useIDKit } from '@worldcoin/idkit';
import { verify } from '../../component/verifyProof';
import { useWallet } from '../../component/walletConnect';
import { mintToken } from '../../component/contractExecution';

interface DetailsPageProps {
  eventId: number;
}

const DetailsPage: React.FC<DetailsPageProps> = ({ eventId }) => {
  const event = Record.find(event => event.id === eventId);
  const defaultAccount = useWallet();
  const app_id = process.env.NEXT_PUBLIC_WLD_APP_ID as `app_${string}`;
  const action = process.env.NEXT_PUBLIC_WLD_ACTION;

  const handleBuyTicket = () => {
    if (!defaultAccount) {
        alert("Please connect your wallet to buy tickets!");
      } else {
        try{
          mintToken(eventId);
        } catch (error) {
          console.error(error);
      }
    }
  }

  //error handling if app_id and action is not set
  if (!app_id) {
    throw new Error("app_id is not set in environment variables!");
  }
  if (!action) {
    throw new Error("action is not set in environment variables!");
  }

  //open the worldcoin verification when the button is clicked
  const { setOpen } = useIDKit(); 

  // This function is called when a user has been successfully verified
  const onSuccess = (result: ISuccessResult): void => {
    //do code here after successful verification
    handleBuyTicket();
    localStorage.setItem('nullifierHash', result.nullifier_hash);
    localStorage.setItem('eventTicketPrice', event.ticketPrice);
  };

  // This function is called when a user has been successfully verified and the proof has been sent to the backend
  const handleProof = async (result: ISuccessResult) => {
    console.log(
      "Proof received from IDKit, sending to backend:\n",
      JSON.stringify(result)
    ); // Log the proof from IDKit to the console for visibility


    //get the proof from the backend (verify the proof)
    const data = await verify(result);
    if (data.success == true) { //check if the verification was success or not
        console.log("Successful response from backend:\n", JSON.stringify(data)); // Log the response from our backend for visibility
    } else {
        throw new Error(`${data.detail}`); // Throw an error if the verification failed
    }
  };

  if (!event) {
    return <p>Event not found</p>;
  }

  return (
    <PageBackground>
      <HeaderImage src="/images/eventbackground.jpeg" alt="HeaderImage" />
      <MainContainer>
        <TextContainer>
        <WorldTourSign>{`Event ${event.id}`}</WorldTourSign>
          <Title>{event.eventName}</Title>
          <Description>Don't miss the chance, get your ticket now!</Description>
          <Description>Location: {event.eventVenue}</Description>
          <Description>Date: {event.eventDate}</Description>
          {/* <CountdownTimer eventDate={event.eventDate} /> */}
          <IDKitWidget 
            action={action}
            app_id={app_id}
            onSuccess={onSuccess}
            handleVerify={handleProof}
            verification_level={VerificationLevel.Device}
          />
          <BuyButton onClick={() => setOpen(true)}>Buy Ticket</BuyButton>
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