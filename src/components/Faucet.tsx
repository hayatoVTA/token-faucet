/* eslint-disable */
import * as React from 'react';
import { ethers, utils } from 'ethers'
import web3 from 'web3';
// import { Ethereumish } from '../types/Ethereumish';
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { faucetSchema } from '../types/faucetShema';
import { OutlinedInput } from '@mui/material';
import styled from '@emotion/styled';
import Balance from './Balance';

const tokenAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"

const FaucetTitle = styled.h2`
  font-size: 35px;
  text-align: center;
  margin-top: 50px;
`;

const FormGroup = styled.form`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  .MuiOutlinedInput-root {
    max-width: 500px;
    @media screen and (min-width: 550px) {
      width: 70%;
    }
    /* .MuiOutlinedInput-input {
    } */
  }
`;

const ValidErrorMessage = styled.p`
  color: #fc6767;
  text-align: center;
  margin-top: 10px;
`;


const Faucet = ({tokenContract}:any) => {

  const [tx, setTx] = React.useState();
  const [showTx, setShowTx] = React.useState(false);

  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(faucetSchema)
  });

  React.useEffect(() => {
    setShowTx(true)
  }, [tx])

  const onClickFaucet = async (inputData: any) => {
    if (typeof window.ethereum !== 'undefined') {
      // const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, tokenContract.abi, signer);
      const amount = web3.utils.toWei(inputData.amount.toString());
      contract.getMeSome(amount)
        .then((d: any) => setTx(d.hash))
        .catch((err: any) => console.log(err));
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
      <FaucetTitle>Test Token Faucet</FaucetTitle>
      <Balance tokenContract={tokenContract} />
      <FormGroup onSubmit={handleSubmit(onClickFaucet)}>
        <OutlinedInput
          {...register("amount")}
          placeholder="Amount"
          size="small"
        />

        <Button
          type="submit"
          variant="contained"
        >
          Get Token
        </Button>
      </FormGroup>
      <ValidErrorMessage>{errors.amount?.message}</ValidErrorMessage>
      {showTx && tx ? tx : ""}
    </div>
  )
}

export default Faucet;
