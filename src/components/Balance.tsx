import * as React from 'react'
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import { ethers } from 'ethers'

const tokenAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"

const BalanceWrapper = styled.div``;

const Balance = ({tokenContract}: any) => {

  const [balance, setBalance] = React.useState();
  const [showBalance, setShowBalance] = React.useState(false);

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

  return (
    <BalanceWrapper>
      <Button
        onClick={getBalance}
        variant="contained"
        color="success"
      >
        Get Balance
      </Button>
      {balance}
    </BalanceWrapper>
  )
}

export default Balance
