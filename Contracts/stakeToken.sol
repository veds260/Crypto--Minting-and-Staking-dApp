// contracts/StakeToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract StakeToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Goku", "GOKU") {
        _mint(msg.sender, initialSupply * 10**18);
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount * 10**18 );
    }
}
