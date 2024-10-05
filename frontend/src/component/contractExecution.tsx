import { CONTRACT_ADDRESS } from './contractAddress';
import { Web3 } from 'web3';
import ABI from './ABI.json';
import EventInfo from '../app/event/eventInfo.json';

declare global {
    interface Window {
        ethereum: any;
    }
}

const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

export async function init() {
    const account = await web3.eth.getAccounts();
    const defaultAccount = account[0];

    try {
        const event = EventInfo[0];
        const createOccasion = contract.methods.createOccasion(
            event.organizer,
            event.name,
            event.description,
            event.cost,
            event.maxTickets,
            event.ticketsPerUser,
            event.date,
            event.time,
            event.location,
            ).send({ from: defaultAccount });
        console.log(createOccasion);
    } catch (error) {
        console.error(error);
    }
};

export async function mintToken() {
    const account = await web3.eth.getAccounts();
    const defaultAccount = account[0];

    try {
        const createOccasion = contract.methods.mint(
            "1"
            ).send({ from: defaultAccount, value: EventInfo[0].cost });
        console.log(createOccasion);
    } catch (error) {
        console.error(error);
    }
}
