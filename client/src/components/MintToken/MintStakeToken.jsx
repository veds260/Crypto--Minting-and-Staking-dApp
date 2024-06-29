import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Web3Context from '../../context/Web3Context';
import { toast } from 'react-hot-toast';
import Wallet from '../Wallet/Wallet';
import Navigation from '../Navigations/Navigation';

const MintGokuToken = () => {
  const navigate = useNavigate();
  const { stakeTokenContract, connectWallet, selectedAccount } = useContext(Web3Context);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedAccount) {
      connectWallet();
    }
  }, [selectedAccount, connectWallet]);

  const handleMint = async () => {
    if (!stakeTokenContract) {
      toast.error('Stake token contract is not initialized.');
      return;
    }

    setLoading(true);
    try {
      const transaction = await stakeTokenContract.mint(selectedAccount, 1); 
      await toast.promise(transaction.wait(), {
        loading: 'Transaction is pending...',
        success: 'Transaction successful 👌',
        error: 'Transaction failed 🤯'
      });
      navigate('/main');
    } catch (error) {
      toast.error('Minting Failed');
      console.error('Minting Failed: ', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mint-goku-token flex flex-col items-center justify-center h-screen rounded-lg bg-gray-900 p-10 mx-10">
      <Wallet>
      <Navigation/>
        <h1 className='m-4'>Mint GOKU Tokens</h1>
        <button onClick={handleMint} className="bg-blue-950 text-white p-2" disabled={loading}>
          {loading ? 'Minting...' : 'Mint Tokens'}
        </button>
      </Wallet>
    </div>
  );
};

export default MintGokuToken;
