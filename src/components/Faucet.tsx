import * as React from 'react';
import { ethers } from 'ethers'
import { Ethereumish } from '../types/Ethereumish';

const tokenAddress = process.env.TOKEN_ADDRESS

declare global {
    interface Window {
        ethereum: Ethereumish;
    }
}

const Faucet = ({tokenContract}:any) => {

  const [balance, setBalance] = React.useState()
  const [showBalance, setShowBalance] = React.useState(false)


  async function getBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, tokenContract.abi, provider)
      const balance = await contract.balanceOf(account);
      console.log("Balance: ", balance.toString());
      setBalance(balance.toString());
      setShowBalance(true);
    }
  }

  async function faucet() {
    if (typeof window.ethereum !== 'undefined') {
      const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, tokenContract.abi, signer);
      contract.faucet(account[0], 100);
    }
  }
    return (
        <div>
        </div>
    )
}

export default Faucet;
