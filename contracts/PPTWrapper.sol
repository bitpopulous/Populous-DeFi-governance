//pragma solidity ^0.5.0;
pragma solidity 0.7.5;

import "./ERC20.sol";
import "./MintableERC20.sol";

contract PPTWrapper is ERC20 {

    enum DelegationType {VOTING_POWER, PROPOSITION_POWER}

    address public pptToken = 0x350E7A260B584e24c04ac2ba682fa568D59c7829;
    
    /**
     * @dev Function to mint tokens
     * @param value The amount of tokens to mint.
     * @return A boolean that indicates if the operation was successful.
     */
    function mint(uint256 value) public returns (bool) {
        MintableERC20(address(pptToken)).mint(value);
        MintableERC20(address(pptToken)).transfer(msg.sender,value);
        //_mint(msg.sender, value);
        return true;
    }

    //new functions for governance
    function totalSupplyAt(uint256 blockNumber) external view returns (uint256) {
        return ERC20(address(pptToken)).totalSupply();
    }

    function getPowerAtBlock(
    address user,
    uint256 blockNumber,
    DelegationType delegationType
    ) external view returns (uint256) {
        return ERC20(address(pptToken)).balanceOf(user);
    }

}
