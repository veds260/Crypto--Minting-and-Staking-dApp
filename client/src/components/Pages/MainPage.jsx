import { useState } from 'react';
import Wallet from '../Wallet/Wallet';
import Navigation from '../Navigations/Navigation';
import DisplayPanel from '../Display Panel/DisplayPanel';
import TokenApproval from '../StakeToken/TokenApproval';
import StakeAmount from '../StakeToken/StakeAmount';
import WithdrawStakeAmount from '../WIthdraw/Withdraw'
import { StakingProvider } from '../../context/StakingContext';
import '../../App.css';

const MainPage = () => {
  const [displaySection, setDisplaySection] = useState("stake");

  const handleButtonClick = (section) => {
    setDisplaySection(section);
  };

  return (

    <div className="rounded-lg bg-gray-900 p-10">
      <Wallet>
        <Navigation />
        <StakingProvider>
          <DisplayPanel />
          <div className="flex flex-col items-center bg-blue-950 mt-4 rounded-md">
            <div className="flex w-96 justify-start mt-4  p-5">
              <button
                onClick={() => handleButtonClick("stake")}
                className={`w-24 px-4 py-2 mx-2 text-sm cursor-pointer rounded-t-lg hover:bg-blue-950 ${displaySection === "stake" ? "text-primary bg-gray-200" : "text-black bg-white"}`}
              >
                Stake
              </button>
              <button
                onClick={() => handleButtonClick("withdraw")}
                className={`w-24 px-4 mx-2 py-2 text-sm cursor-pointer rounded-t-lg  hover:bg-blue-950 ${displaySection === "withdraw" ? "text-primary bg-gray-200" : "text-black bg-white"}`}
              >
                Withdraw
              </button>
            </div>
            {displaySection === "stake" && (
              <div className="w-96 rounded-b-lg bg-white">
                
                <StakeAmount />
                <TokenApproval />
              </div>
            )}
            {displaySection === "withdraw" && (
              <div className="w-96 rounded-b-lg bg-white">
                <WithdrawStakeAmount />
              </div>
            )}
          </div>
        </StakingProvider>
      </Wallet>
    </div>
    
  );
}

export default MainPage;
