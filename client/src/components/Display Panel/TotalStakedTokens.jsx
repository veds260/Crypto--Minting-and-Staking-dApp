import { useState, useEffect, useContext} from "react";
import Web3Context from "../../context/Web3Context";
import {ethers} from "ethers";
import StakingContext from "../../context/StakingContext"; 
import { toast } from "react-hot-toast";

const TotalStakedAmount= ()=>{
    const {stakingContract, selectedAccount}= useContext(Web3Context)
    const {isReload}= useContext(StakingContext);
    const [totalStakedAmount, setTotalStakedAmount]= useState("0");

    useEffect(()=>{
        const fetchTotalStakedBalance= async()=>{
            try {
                const amountTotalStakedWei= await stakingContract.totalStakedAmount;
                const amountTotalStakedEth= ethers.formatUnits(amountTotalStakedWei.toString(), 18);
                setTotalStakedAmount(amountTotalStakedEth);
            } catch (error) {
                toast.error("Error fetching staked amount");
                console.log(error.message);
            }
        }
        stakingContract && fetchTotalStakedBalance();
    }, [stakingContract, selectedAccount, isReload]);

    return(
        <div className="w-[500px] text-black bg-white flex justify-between items-center py-1.5 px-7 rounded-t-lg">
            <p className="font-bold">Total Staked Tokens: </p>
            <span>{totalStakedAmount} GOKU tokens</span>
        </div>
    );
}

export default TotalStakedAmount;
