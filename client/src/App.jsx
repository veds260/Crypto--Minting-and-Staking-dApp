import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Web3Context from './context/Web3Context';
import LandingPage from './components/Pages/LandingPage';
import MintGokuToken from './components/MintToken/MintStakeToken';
import Main from './components/Pages/MainPage';
import { connectWallet } from './utils/connectWallet';
import './App.css';

const App = () => {
  const [state, setState] = useState({
    provider: null,
    selectedAccount: null,
    stakingContract: null,
    stakeTokenContract: null,
    rewardTokenContract: null,
    chainId: null,
  });

  const handleWalletConnect = async () => {
    try {
      const { provider, selectedAccount, stakingContract, stakeTokenContract, rewardTokenContract, chainId } = await connectWallet();
      setState({ provider, selectedAccount, stakingContract, stakeTokenContract, rewardTokenContract, chainId });
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  return (
    <Web3Context.Provider value={{ ...state, connectWallet: handleWalletConnect }}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/mint" element={<MintGokuToken />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </Router>
    </Web3Context.Provider>
  );
};

export default App;
