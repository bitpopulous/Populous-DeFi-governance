pragma solidity 0.7.5;

import "./ERC20.sol";

contract MockPXT is ERC20 {
    uint256 public decimals = 8;
    string public symbol = "PXT";
    string public name = "PXT";
}