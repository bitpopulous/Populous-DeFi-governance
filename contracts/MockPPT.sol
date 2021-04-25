pragma solidity 0.7.5;

import "./ERC20.sol";

contract MockPPT is ERC20 {
    uint256 public decimals = 8;
    string public symbol = "PPT";
    string public name = "PPT";

    function mint(address account, uint256 amount) external returns (bool) {
        _mint(account, amount);
        return true;
    }
}