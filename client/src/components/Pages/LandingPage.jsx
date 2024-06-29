import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Web3Context from '../../context/Web3Context';
import Wallet from '../Wallet/Wallet';
import Navigation from '../Navigations/Navigation';

const LandingPage = () => {
  const navigate = useNavigate();
  const { connectWallet, selectedAccount } = useContext(Web3Context);

  useEffect(() => {
    if (selectedAccount) {
      // Wallet is already connected, navigate to the main page or mint page accordingly
    }
  }, [selectedAccount]);

  return (
    <div className="landing-page flex flex-col items-center justify-center h-screen rounded-lg bg-gray-900 p-10">
      <Wallet>
      <Navigation/>
        <h1 className="text-2xl m-4">Want to buy GOKU token to stake or already have GOKU tokens?</h1>
        <div className="flex ">
          <button
            onClick={() => {
              if (selectedAccount) {
                navigate('/mint');
              } else {
                connectWallet().then(() => navigate('/mint'));
              }
            }}
            className="bg-blue-950 text-white p-2 mx-2"
          >
            Buy GOKU
          </button>
          <button
            onClick={() => {
              if (selectedAccount) {
                navigate('/main');
              } else {
                connectWallet().then(() => navigate('/main'));
              }
            }}
            className="bg-green-500 text-white p-2 mx-2"
          >
            Already Have
          </button>
        </div>
      </Wallet>
    </div>
  );
};

export default LandingPage;
