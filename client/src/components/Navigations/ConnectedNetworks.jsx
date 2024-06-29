import { useContext } from "react";
import Web3Context from "../../context/Web3Context";

const ConnectedNetwork= ()=>{
    const {chainId}= useContext(Web3Context);
    if (chainId===null){
        return <p className=" bg-blue-950 p-2 text-xs rounded-md text-white">Not Connected</p>
    }
    else if (chainId===11155111){
        return <p className=" bg-blue-950 p-2 text-xs rounded-md text-white">Sepolia</p>
    }
    else{
        return <p className=" bg-blue-950 p-2 text-xs rounded-md text-white">Network Not Detected</p>
    }
}

export default ConnectedNetwork;