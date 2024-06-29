import ClaimReward from "../Claim Reward/ClaimReward";
import ConnectedAccount from "./ConnectedAccounts";
import ConnectedNetwork from "./ConnectedNetworks";

const Navigation= ()=>{
    return(
        <header className="w-full h-20 flex flex-row-reverse justify-between items-center bg-custom-bg border-b border-gray-400">
            <div className="text-xs justify-center items-center flex flex-row-reverse gap-3">
                <ClaimReward/>
            </div>
            <div className="text-xs justify-center items-center flex flex-row-reverse text-white">
                <ConnectedAccount/>
                <ConnectedNetwork/>
            </div>
        </header>
    )
}

export default Navigation;