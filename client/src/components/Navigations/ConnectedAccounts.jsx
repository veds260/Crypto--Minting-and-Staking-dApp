import { useContext } from "react";
import Web3Context from "../../context/Web3Context";

const ConnectedAccount= ()=>{
    const {selectedAccount}= useContext(Web3Context);
    return(
        <p className=" bg-blue-950 p-2 m-4 text-xs rounded-md text-white">
            {selectedAccount ? selectedAccount : "Connect Account"}
            </p>
    )
}

export default ConnectedAccount;