import {ethers, Contract} from "ethers";
import stakingABI from "../ABI/stakingABI.json";
import stakeTokenABI from "../ABI/stakeTokenABI.json";
import rewardTokenABI from "../ABI/rewardTokenABI.json";

export const connectWallet= async()=>{
    try{
        let [signer, provider, stakingContract, stakeTokenContract, rewardTokenContract, chainId]= [null];
        if (window.ethereum== null){
            throw new Error("Metamask is not installed");
        }
        const accounts= await window.ethereum.request({
            method: "eth_requestAccounts"
        })

        const chainIdHex= await window.ethereum.request({
            method: "eth_chainId"
        })

        chainId= parseInt(chainIdHex,16)
        let selectedAccount= accounts[0];
        if (!selectedAccount){
            throw new Error("No Ethereum Accounts available");
        }

        provider= new ethers.BrowserProvider(window.ethereum);
        signer= await provider.getSigner();

        const stakingContractAddress= "0xeA7f62072412ea979A21FeE90ac901ebF259Bb26"
        const stakeTokenContractAddress= "0x49af01F6bb1C1f3853cF46e5093084121b3c4568"  
        const rewardTokenContractAddress="0xb55B02BB0879Add0B5E64C0f1f84fA93B932D7A0"
        stakingContract= new Contract(stakingContractAddress,stakingABI, signer);
        stakeTokenContract= new Contract(stakeTokenContractAddress, stakeTokenABI, signer);
        rewardTokenContract = new Contract(rewardTokenContractAddress, rewardTokenABI, signer);


        return{provider, selectedAccount, stakingContract, stakeTokenContract, rewardTokenContract, chainId};
    }catch(error){
        console.error(error);
        throw error;
    }
}

export const stakingContractAddress= "0xeA7f62072412ea979A21FeE90ac901ebF259Bb26";
export const rewardTokenContractAddress="0xb55B02BB0879Add0B5E64C0f1f84fA93B932D7A0";
export const stakeTokenContractAddress= "0x49af01F6bb1C1f3853cF46e5093084121b3c4568";
