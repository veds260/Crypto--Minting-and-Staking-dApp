import { useState, useEffect } from "react";
import { connectWallet } from "../../utils/connectWallet";
import Web3Context from "../../context/Web3Context";
import { handleAccountChange } from "../../utils/handleAccountChange";
import { handleChainChange } from "../../utils/handleChainChange";
import { toast } from "react-hot-toast";

const Wallet = ({ children }) => {
  const [state, setState] = useState({
    provider: null,
    selectedAccount: null,
    stakingContract: null,
    stakeTokenContract: null,
    rewardTokenContract: null,
    chainId: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => handleAccountChange(setState));
      window.ethereum.on("chainChanged", () => handleChainChange(setState));

      return () => {
        window.ethereum.removeListener("accountsChanged", () => handleAccountChange(setState));
        window.ethereum.removeListener("chainChanged", () => handleChainChange(setState));
      };
    }
  }, []);

  const handleWallet = async () => {
    try {
      setIsLoading(true);
      const { provider, selectedAccount, stakingContract, stakeTokenContract, rewardTokenContract, chainId } = await connectWallet();
      console.log(provider, selectedAccount, stakingContract, stakeTokenContract, rewardTokenContract, chainId);
      setState({ provider, selectedAccount, stakingContract, stakeTokenContract, rewardTokenContract, chainId });
    } catch (error) {
      toast.error("Error connecting wallet");
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center ">
      <Web3Context.Provider value={state}>
        {children}
      </Web3Context.Provider>
      {isLoading && <p>Loading...</p>}
      <button className="px-7 py-2 text-primary border-none bg-white rounded-md mt-4" onClick={handleWallet}>
        Connect Wallet
      </button>
    </div>
  );
};

export default Wallet;
