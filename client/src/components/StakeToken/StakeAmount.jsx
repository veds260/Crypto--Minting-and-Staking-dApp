import { useContext,useRef } from "react";
import {ethers} from "ethers"
import Web3Context from "../../context/Web3Context";

import StakingContext from "../../context/StakingContext";
import { toast } from "react-hot-toast";


const StakeAmount =()=>{
 const {stakingContract}=useContext(Web3Context);
 const {isReload,setIsReload}=useContext(StakingContext)
 const stakeAmountRef = useRef();

 const stakeToken=async(e)=>{
   e.preventDefault();
   const amount = stakeAmountRef.current.value.trim();
   console.log(amount)
   if(isNaN(amount) || amount<=0){
    toast.error("Please enter a valid positive number.");
    return;
   }
   const amountToStake = ethers.parseUnits(amount,18).toString();
   try{
    console.log(stakingContract);
    console.log(amountToStake);
    const transaction = await stakingContract.stake(amountToStake)
    console.log("trying2");
    await toast.promise(transaction.wait(),
    {
      loading: "Transaction is pending...",
      success: 'Transaction successful 👌',
      error: 'Transaction failed 🤯'
    });
    stakeAmountRef.current.value = "";
    setIsReload(!isReload);
    
    } catch (error) {
      toast.error("Staking Failed");
      console.error(error.message)
    }
  };
    return (
      <form onSubmit={stakeToken} className="w-[500px] flex flex-col justify-center items-start p-[36px] pt-[12px] ">
        <label className=" text-black font-bold stakopacity-80 text-l mb-2-input-label">Enter Staked Amount:</label>
        <div className="flex items-center">
    <input className="bg-white border rounded border-black mt-2 text-black" type="text" ref={stakeAmountRef} />
    <span className="ml-2 text-black font-semibold mt-2">GOKU tokens</span>
  </div>
  <br></br>
        <button onClick={stakeToken} type="submit" label="Stake Token"> Stake</button>
      </form>
       )
}
export default StakeAmount;