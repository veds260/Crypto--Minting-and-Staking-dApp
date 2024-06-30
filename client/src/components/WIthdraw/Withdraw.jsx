import { useState, useContext, useRef } from "react";
import { ethers } from "ethers";
import Web3Context from "../../context/Web3Context";
import StakingContext from "../../context/StakingContext";
import { toast } from "react-hot-toast";

const WithdrawStakeAmount= ()=>{
    const {stakingContract}= useContext(Web3Context);
    const withdrawStakeAmountRef= useRef(); 
    const [transactionStatus, setTransactionStatus]= useState("");
    const {isReload,setIsReload}= useContext(StakingContext);
   
    const withdrawStakeToken= async(e)=>{
        e.preventDefault();
        const amount= withdrawStakeAmountRef.current.value.trim();
        if (isNaN(amount) || amount<=0){
            console.error("Please enter a valid positive number");
            return;
        }
        const amountToWithdraw= ethers.parseUnits(amount, 18).toString();   
        console.log(amountToWithdraw);
        try {
            const transaction= await stakingContract.withdraw(amountToWithdraw)
            await toast.promise(transaction.wait(),
                {
                loading: "Transaction is pending...",
                success: 'Transaction successful 👌',
                error: 'Transaction failed 🤯'
                });
                withdrawStakeAmountRef.current.value=""
                setIsReload(!isReload);
            
        } catch (error) {
            toast.error("Staking Failed");
            console.error(error.message);
        }
    }
    return(
        <div>

            <form className="w-[500px] flex justify-center items-start flex-col p-[30px]" onSubmit={withdrawStakeToken}>
                <label className= "text-black font-bold opacity-80 text-sm mb-2 ">Amount to Withdraw: </label>
                <div className="flex items-center">
                    <input type="text" ref={withdrawStakeAmountRef} className="border border-black bg-[var(--bg-color)] text-black rounded opacity-80 hover:opacity-100"></input>
                    <span className="ml-2 text-black font-semibold mt-2">GOKU tokens</span>
                </div>
                <button onClick={withdrawStakeToken} type="submit" className="mt-2 text-sm text-white border border-black hover:bg-[#7c0b7e] hover:text-white" >Withdraw</button>
            </form>
        </div>
    )
}

export default WithdrawStakeAmount;