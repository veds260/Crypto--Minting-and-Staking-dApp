import { useState, useContext, useRef } from "react";
import { ethers } from "ethers";
import Web3Context from "../../context/Web3Context";
import StakingContext from "../../context/StakingContext";
import { toast } from "react-hot-toast";

const TokenApproval= ()=>{
    const {stakeTokenContract, stakingContract}= useContext(Web3Context);
    const approvedTokenRef= useRef();
    const {isReload, setIsReload}= useContext(StakingContext);
    const approvedToken= async(e)=>{
        e.preventDefault();
        const amount= approvedTokenRef.current.value.trim();
        if (isNaN(amount) || amount<=0){
            toast.error("Please enter a valid positive number");
            return;
        }
        const amountToSend= ethers.parseUnits(amount, 18).toString();   
        console.log(amountToSend);
        try {
            const transaction= await stakeTokenContract.approve(stakingContract.target, amountToSend)
            await toast.promise(transaction.wait(),
            {
                loading: "Transaction is pending...",
                success: 'Transaction successful 👌',
                error: 'Transaction failed 🤯'
            });
            approvedTokenRef.current.value= "";
            setIsReload(!isReload);
            
        } catch (error) {
             toast.error("Staking Failed");
             console.error(error.message);
        }
    }
    return(
        <div>
            <form onSubmit={approvedToken} className="w-[500px] flex flex-col justify-center items-start p-[36px] pt-[0px] ">
                <label className="opacity-100 text-l font-bold mb-2 text-black font-bold">Token Approval: </label>
                <div className="flex items-center">
                    <input className="bg-white border rounded border-black text-black" type="text" ref={approvedTokenRef}></input><br></br>
                    <span className="ml-2 text-black font-semibold mt-2">GOKU tokens</span>
                </div>
                <br></br>
                <button onClick={approvedToken} type="submit" >Token Approval</button>
            </form>
        </div>
    )
}

export default TokenApproval;
