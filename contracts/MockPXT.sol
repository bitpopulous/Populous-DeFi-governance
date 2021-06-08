//SPDX-License-Identifier: Unlicensed
pragma solidity 0.7.5;

import "./ERC20.sol";

contract MockPXT is ERC20 {
    uint256 public decimals = 8;
    string public symbol = "PXT";
    string public name = "PXT";
    
    function mint(uint256 amount) external returns (bool) {
        _mint(msg.sender, amount);
        return true;
    }
}