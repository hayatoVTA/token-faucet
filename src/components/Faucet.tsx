/* eslint-disable */
import * as React from 'react';
import { ethers, utils } from 'ethers'
import web3 from 'web3';
// import { Ethereumish } from '../types/Ethereumish';
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { faucetSchema } from '../types/faucetShema';


const tokenAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"

// declare global {
//     interface Window {
//         ethereum: Ethereumish;
//     }
// }

const Faucet = ({tokenContract}:any) => {

  const [balance, setBalance] = React.useState()
  const [showBalance, setShowBalance] = React.useState(false)

  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(faucetSchema)
  });

  const onClickFaucet = async (inputData: any) => {
    if (typeof window.ethereum !== 'undefined') {
      // const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, tokenContract.abi, signer);
      const amount = web3.utils.toWei(inputData.amount);
      contract.getMeSome(amount);
    }
  }

  const getBalance = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, tokenContract.abi, provider)
      // contract.balanceOf(account).then(d => console.log(d))
      const balance = await contract.balanceOf(account);
      console.log("Balance: ", balance.toString());
      setBalance(balance.toString());
      setShowBalance(true);
    }
  }

  // async function faucet() {
  //   if (typeof window.ethereum !== 'undefined') {
  //     const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const signer = provider.getSigner();
  //     const contract = new ethers.Contract(tokenAddress, tokenContract.abi, signer);
  //     contract.faucet(account[0], 100);
  //   }
  // }
  return (
    <div>
      {/* <form action="submit"> */}
        {/* <Button
          onClick={faucet}
          variant="contained"
        >
          Get Faucet Token
        </Button> */}
      {/* </form> */}
      <form onSubmit={handleSubmit(onClickFaucet)}>

        <input {...register("amount")} />
        <p>{errors.amount?.message}</p>
        {/* <input type="text" /> */}

        <Button
          type="submit"
          variant="contained"
        >
          Get Faucet Token
        </Button>
      </form>
      <Button
        onClick={getBalance}
        variant="contained"
      >
        Get Balance
      </Button>
      {balance}
    </div>
  )
}

export default Faucet;
