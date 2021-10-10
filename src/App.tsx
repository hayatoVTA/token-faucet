import React from 'react';
import FaucetToken from './artifacts/contracts/FaucetToken.sol/FaucetToken.json'
import Faucet from './components/Faucet';

function App() {
  return (
    <>
      <Faucet tokenContract={FaucetToken} />
    </>
  );
}

export default App;
