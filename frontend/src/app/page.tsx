"use client"; //need because of styled-components 
import styled from 'styled-components';

export default function Home() {
  return (
      <PageContainer>
        <TextContainer>
          <MainTitle>D'Ticket</MainTitle>
          <Subtitle>Your one stop shop for authentic tickets!</Subtitle>
          <Description>"Buy authentic tickets straight from event holders!"</Description>
        </TextContainer>
      </PageContainer>
  );
}

/////////////////////////////// STYLING ///////////////////////////////////
const PageContainer = styled.div`
 height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #1a202c;
  background-image: 
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), /* 0.5 opacity black overlay */
    url('/images/front.jpg');
  background-size: cover;
  background-position: center;
`;

const TextContainer = styled.div`
  text-align: left;
`;

const MainTitle = styled.div`
  font-size: 4.5rem; /* text-7xl */
  font-weight: bold;
  color: white;
`;

const Subtitle = styled.div`
  font-size: 1.25rem; /* text-xl */
  color: white;
  font-style: italic;
`;

const Description = styled.div`
  margin-top: 0.75rem; /* mt-3 */
  color: white;
  transition: all 0.1s ease-in-out; /* ease-in-out duration-100 */
`;