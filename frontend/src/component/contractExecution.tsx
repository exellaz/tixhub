import { CONTRACT_ADDRESS } from './contractAddress';
import { Web3 } from 'web3';
import ABI from './ABI.json';
import { create } from 'domain';

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
        const createOccasion = contract.methods.createOccasion(
            "0x4dd1EE2aA4272f418d5f5dd9f92868852BADA733", 
            "Event Title",
            "100", 
            "100", 
            "1",
            "12/12/2022", 
            "Event Time", 
            "Event location").send({ from: defaultAccount });
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
            ).send({ from: defaultAccount, value: web3.utils.toWei("0.0000000000000001", "ether") });
        console.log(createOccasion);
    } catch (error) {
        console.error(error);
    }
}