import { useState, useEffect, useContext} from "react";
import Web3Context from "../../context/Web3Context";
import {ethers} from "ethers";
import StakingContext from "../../context/StakingContext"; 
import { toast } from "react-hot-toast";

const StakedAmount= ()=>{
    const {stakingContract, selectedAccount}= useContext(Web3Context)
    const {isReload}= useContext(StakingContext);
    const [stakedAmount, setStakedAmount]= useState("0");

    useEffect(()=>{
        const fetchStakedBalance= async()=>{
            try {
                const amountStakedWei= await stakingContract.stakedBalance(selectedAccount);
                const amountStakedEth= ethers.formatUnits(amountStakedWei.toString(), 18);
                setStakedAmount(amountStakedEth);
            } catch (error) {
                toast.error("Error fetching staked amount");
                console.log(error.message);
            }
        }
        stakingContract && fetchStakedBalance()
    }, [stakingContract, selectedAccount, isReload])
    return(
        <div className="w-[500px] text-black bg-white flex justify-between items-center py-1.5 px-7 rounded-t-lg">
            <p className="font-bold">Staked Amount: </p>
            <span>{stakedAmount} GOKU tokens </span>
        </div>
    )
}

export default StakedAmount;