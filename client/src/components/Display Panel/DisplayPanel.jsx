import EarnedReward from "./EarnedReward";
import StakedAmount from "./StakedAmount";
import RewardRate from "./RewardRate";

const DisplayPanel= ()=>{

    return(
        <div className="flex flex-col justify-center items-center rounded-[24px] pt-[18px] py-2">
            <StakedAmount/>
            <RewardRate/>
            <EarnedReward/>
            <div className="w-[500px] text-black bg-white flex py-1.5 px-7 rounded-b-lg">
            <p className="font-bold">Note: </p>
            <p className="flex-wrap text-right">You have to first approve your staking token- GOKU in Token Approval section to stake it and start earning reward token- VEGETA. Thank You! </p>
        </div>
        </div>
    )
}

export default DisplayPanel;