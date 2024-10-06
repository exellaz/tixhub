import { CONTRACT_ADDRESS } from './contractAddress';
import { Web3 } from 'web3';
import ABI from './ABI.json';
import EventInfo from '../app/admin/events.json';

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
        console.log(createOccasion);
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
