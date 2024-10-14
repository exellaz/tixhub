import { CONTRACT_ADDRESS } from './contractAddress';
import { Web3 } from 'web3';
import ABI from './ABI.json';

declare global {
    interface Window {
        ethereum: any;
    }
}

const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

export async function createEvent(newEvent: any) {
    const account = await web3.eth.getAccounts();
    const defaultAccount = account[0];

    try {
        const event = newEvent;
        const createOccasion = contract.methods.createOccasion(
            event.organiserAddress,
            event.eventName,
            event.eventDescription,
            event.ticketPrice,
            event.ticketAmount,
            event.ticketsPerAccount,
            event.eventDate,
            event.eventTime,
            event.eventVenue,
            ).send({ from: defaultAccount });
        console.log(createOccasion); // check does the transaction is successful
		if ((await createOccasion).status) { //if the transaction is successful
			try { //try to send the event data to the backend server
				const response = await fetch('http://localhost:3001/api/events', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(event),
				});
	
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
	
				const result = await response.json();
				console.log(result);
			} catch (error) {
				console.error('Error:', error);
			}
		}
    } catch (error) {
        console.error(error);
    }
};

export async function mintToken(eventId) {
    const account = await web3.eth.getAccounts();
    const defaultAccount = account[0];

    contract.methods.getOccasion(3).call().then(console.log); // check does the event exist in the blockchain

    let exportNullifier = localStorage.getItem('nullifierHash')
    let eventTicketPrice = localStorage.getItem('eventTicketPrice')
    console.log(exportNullifier); // check does nullifier hash is stored in local storage
    console.log(eventTicketPrice); // check does event ticket price is stored in local storage

    try {
        const createOccasion = contract.methods.mint(
            eventId,
            exportNullifier
            ).send({ from: defaultAccount, value: eventTicketPrice });
        console.log(createOccasion);
    } catch (error) {
        console.error(error);
    }
}
