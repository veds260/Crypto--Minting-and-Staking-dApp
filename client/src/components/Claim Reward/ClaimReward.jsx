import { useContext} from "react";
import web3Context from "../../context/Web3Context"
import { toast } from "react-hot-toast";
import { ethers } from "ethers";

const ClaimReward = ()=>{
  const {stakingContract, rewardTokenContract, selectedAccount, stakeTokenContract}=useContext(web3Context);
  const stakingContractAddress= '0xeA7f62072412ea979A21FeE90ac901ebF259Bb26';
  console.log(stakeTokenContract);
  const claimReward = async()=>{
try{
  console.log(stakingContractAddress);
  console.log(stakeTokenContract);
  if (!stakingContract || !rewardTokenContract) {
    toast.error("Contracts are not initialized.");
    return;
  }

  const userReward = await stakingContract.rewards(selectedAccount);
  const userRewardInTokens = ethers.formatUnits(userReward, 18);
  console.log(userRewardInTokens);

  if (!stakingContractAddress) {
    toast.error("Staking contract address is not available.");
    return;
  }

  const rewardTokenBalance = await rewardTokenContract.balanceOf(stakingContractAddress);
  console.log(rewardTokenBalance);
  const rewardTokenBalanceInTokens = ethers.formatUnits(rewardTokenBalance, 18);

  if (parseFloat(rewardTokenBalanceInTokens) < parseFloat(userRewardInTokens)) {
    toast.error("Not enough VGT tokens in the contract to fulfill the reward. We apologize. Please notify us for the issue!");
    return;
  }  
  const transaction = await stakingContract.claimReward();
    await toast.promise(transaction.wait(),
    {
      loading: "Transaction is pending...",
      success: 'Transaction successful 👌',
      error: 'Transaction failed 🤯'
    });

}catch(error){
     console.error("Claim Reward Failed",error.message)
   }
}
return (
  <>
  <div className="claim-reward">
  <button className=" bg-blue-950" type="button" label="Claim Reward" onClick={claimReward}> Claim Reward </button>
  </div>
  </>
)
}

export default ClaimReward;