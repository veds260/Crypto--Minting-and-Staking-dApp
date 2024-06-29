// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Staking is ReentrancyGuard{
    using SafeMath for uint256;
    IERC20 public s_stakingToken;
    IERC20 public s_rewardToken;

    uint public constant REWARDRATE=1e18;
    uint public totalStakedTokens;
    uint public rewardPerTokenStored;
    uint public lastUpdateTime;

    mapping (address=>uint) public stakedBalance;
    mapping (address=>uint) public rewards;
    mapping (address=>uint) public userRewardPerTokenPaid;

    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardsClaimed(address indexed user, uint256 indexed amount);

    constructor(address stakingToken, address rewardToken){
        s_rewardToken= IERC20(rewardToken); // We typecast the received argument token to IERC20 so we can use all the functions of a IERC20 token and because s_staing and rewardtokens are IERC20
        s_stakingToken= IERC20(stakingToken); 
    }

    function rewardPerToken() public view returns(uint){  //It is a total of rewards distributed for the total token staked on the platform 
        if (totalStakedTokens==0){
            return rewardPerTokenStored;
        }
        uint TotalTime= block.timestamp-lastUpdateTime;
        uint totalRewards= REWARDRATE*TotalTime;
        return rewardPerTokenStored+totalRewards/totalStakedTokens;
    }

    function earned(address account) public view returns (uint) {
        return (stakedBalance[account] * (rewardPerToken() - userRewardPerTokenPaid[account])) + rewards[account];
    }

     modifier updateReward(address account) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = block.timestamp;
        if (account != address(0)) {
            rewards[account] = earned(account);
            userRewardPerTokenPaid[account] = rewardPerTokenStored;
        }
        _;
    }

    function stake(uint amount) external nonReentrant updateReward(msg.sender) {
        require(amount>0, "Amount must be greater than zero");
        totalStakedTokens+=amount;
        stakedBalance[msg.sender]+=amount;
        emit Staked(msg.sender, amount);

        bool success= s_stakingToken.transferFrom(msg.sender, address(this), amount);
        require(success, "Transfer Failed");
    }

    function withdraw(uint amount) external nonReentrant updateReward(msg.sender) {
        require(amount>0, "Amount must be greater than zero");
        require(stakedBalance[msg.sender]>=amount, "You do not have enough tokens staked");
        totalStakedTokens-=amount;
        stakedBalance[msg.sender]-=amount;
        emit Withdrawn(msg.sender, amount);

        bool success= s_stakingToken.transfer(msg.sender, amount);
        require(success, "Transfer Failed");
    }

    function claimReward() external nonReentrant updateReward(msg.sender) {
        uint reward= rewards[msg.sender];
        require(reward>0, "No Rewards to claim");
        rewards[msg.sender]= 0;
        emit RewardsClaimed(msg.sender, reward);

        bool success= s_rewardToken.transfer(msg.sender, reward);
        require(success, "Transfer Failed");
    }

}