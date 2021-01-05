pragma solidity 0.7.5;


import "./MintableERC20.sol";

contract MockPXT is MintableERC20 {

    uint256 public decimals = 8;
    string public symbol = "PXT";
    string public name = "PXT";
}