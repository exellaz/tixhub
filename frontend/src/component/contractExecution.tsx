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

export async function createEvent() {
    const account = await web3.eth.getAccounts();
    const defaultAccount = localStorage.getItem('eventData');

    try {
        const event = EventInfo[0];
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

export async function mintToken() {
    const account = await web3.eth.getAccounts();
    const defaultAccount = account[0];

    let exportNullifier = localStorage.getItem('nullifierHash')
    console.log(exportNullifier); // check does nullifier hash is stored in local storage

    try {
        const createOccasion = contract.methods.mint(
            "3",
            exportNullifier
            ).send({ from: defaultAccount, value: EventInfo[0].ticketPrice });
        console.log(createOccasion);
    } catch (error) {
        console.error(error);
    }
}
