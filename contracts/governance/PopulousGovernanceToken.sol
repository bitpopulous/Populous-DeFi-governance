//SPDX-License-Identifier: Unlicensed
pragma solidity 0.7.5;
pragma abicoder v2;

import "./ERC20.sol";
import "./interfaces/IPopulousGovernanceV2.sol";
import {Ownable} from './misc/Ownable.sol';

/**
 * @title MockVotingToken
 * @dev Implements ERC20 minting logic
 */
contract PopulousGovernanceToken is ERC20, Ownable {
    uint256 public decimals = 8;
    string public symbol = "PGT";
    string public name = "Populous Governance Token";

    address public admin;

    modifier onlyAdmin() {
        require(admin == _msgSender(), 'PopulousGovernanceToken: caller is not the admin');
        _;
    }

    function setAdmin(address _admin) public onlyOwner {
        require(_admin != address(0), "PopulousGovernanceToken: Invalid admin address");
        admin = _admin;
    }

    function mint(address account, uint256 amount) external onlyAdmin returns (bool) {
        _mint(account, amount);
        return true;
    }

    function burn(address account, uint256 amount) external onlyAdmin returns (bool) {
        _burn(account, amount);
        return true;
    }
}