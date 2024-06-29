import { useState, useEffect, useContext} from "react";
import Web3Context from "../../context/Web3Context";
import {ethers} from "ethers";
import StakedAmount from "./StakedAmount";
import { toast } from "react-hot-toast";

const RewardRate= ()=>{
    const {stakingContract, selectedAccount}= useContext(Web3Context);
    const [rewardRate, setRewardRate]= useState("0");

    useEffect(()=>{
        const fetchRewardRate= async()=>{
            try {
                const rewardRateWei= await stakingContract.REWARDRATE();
                const rewardRateEth= ethers.formatUnits(rewardRateWei.toString(), 18);
                setRewardRate(rewardRateEth);
            } catch (error) {
                toast.error("Error fetching reward rate");
                console.log(error.message);
            }
        }
        stakingContract && fetchRewardRate  ()
    }, [stakingContract, selectedAccount])
    return(
        <div className="w-[500px] flex justify-between items-center pt-1.5 pb-1.5 px-7 bg-white text-black">
        <p className="font-bold">Reward Amount: </p>
        <span>{rewardRate} VEGETA token/second</span>
        </div>
    )
}

export default RewardRate;