"use client"; //need because of styled-components
import Web3, { AbiError } from 'web3';
import styled from 'styled-components';
import Layout from '../layout';
import { useState, useEffect } from 'react';
import { CONTRACT_ADDRESS } from '@/component/contractAddress';
import { comment } from 'postcss';
import ABI from '../../component/ABI.json'

const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545')
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
	  const accounts = await web3.eth.getAccounts();
	  const defaultAccount = accounts[0]
	  const result = await contract.methods.getTokensOfUser(defaultAccount).call({ from: accounts[0] });
	  console.log('Profile Result:', result);
	} catch (error) {
	  console.error('Error calling smart contract function:', error);
	}
}
