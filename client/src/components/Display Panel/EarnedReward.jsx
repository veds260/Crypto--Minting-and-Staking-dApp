import { useState, useEffect, useContext} from "react";
import Web3Context from "../../context/Web3Context";
import {ethers} from "ethers";
import { toast } from "react-hot-toast";

const EarnedReward= ()=>{
    const {stakingContract, selectedAccount}= useContext(Web3Context)
    const [earnedReward, setEarnedReward]= useState("0");

    useEffect(()=>{
        const fetchEarnedReward= async()=>{
            try {
                const amountEarnedRewardWei= await stakingContract.earned(selectedAccount);
                const amountEarnedRewardEth= ethers.formatUnits(amountEarnedRewardWei.toString(), 18);
                const roundedReward= parseFloat(amountEarnedRewardEth).toFixed(2)
                setEarnedReward(roundedReward);
            } catch (error) {
                toast.error("Error fetching the reward:");
                console.log(error.message);
            }
        }

            const interval= setInterval(()=>{
                stakingContract && fetchEarnedReward()
            }, 1000)

            return ()=> clearInterval(interval);

        
    }, [stakingContract, selectedAccount])
    return(
        <div className="w-[500px] flex justify-between items-center py-1.5 px-7 bg-white text-black">
            <p className="font-bold">Earned Amount: </p>
            <span> {earnedReward} VEGETA tokens</span>
        </div>
    )
}

export default EarnedReward;