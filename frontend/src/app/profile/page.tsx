"use client"; //need because of styled-components
import Web3, { AbiError } from 'web3';
import styled from 'styled-components';
import Layout from '../layout';
import { useState, useEffect } from 'react';
import { CONTRACT_ADDRESS } from '@/component/contractAddress';
import { comment } from 'postcss';
import ABI from '../../component/ABI.json'

declare global {
    interface Window {
        ethereum: any;
    }
}

const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS)

export default function ProfilePage() {
	// TODO
	// retrieve user tickets info
	callSmartContractFunction()
	// render each ticket as a card
	// when the card is clicked, prompt the user to sell
    return (
        <div>
          <h1>Profile Page</h1>
        </div>
    );
}

async function callSmartContractFunction() {
	try {
	web3.eth.getAccounts().then(console.log)
	  const accounts = await web3.eth.getAccounts();
	  const defaultAccount = accounts[0]
	  console.log(defaultAccount)
	  const result = await contract.methods.getTokensOfUser(defaultAccount).call({ from: accounts[0] });
	  console.log('Profile Result:', result);
	} catch (error) {
	  console.error('Error calling smart contract function:', error);
	}
}
