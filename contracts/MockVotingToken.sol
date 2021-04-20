pragma solidity 0.7.5;
pragma abicoder v2;

import "./ERC20.sol";
import "./interfaces/IPopulousGovernanceV2.sol";
import {Ownable} from './dependencies/open-zeppelin/Ownable.sol';

/**
 * @title MockVotingToken
 * @dev Implements ERC20 minting logic
 */
contract MockVotingToken is ERC20, Ownable {
    uint256 public decimals = 8;
    string public symbol = "PGT";
    string public name = "Populous Governance Tokens";

    address public admin;

    modifier onlyAdmin() {
        require(admin == _msgSender(), 'MockVotingToken: caller is not the admin');
        _;
    }

    function setAdmin(address _admin) public onlyOwner {
        require(_admin != address(0), "MockVotingToken: Invalid admin address");
        admin = _admin;
    }

    function mint(address account, uint256 amount) external onlyAdmin {
        _mint(account, amount);
    }

    function burn(address account, uint256 amount) external onlyAdmin {
        _burn(account, amount);
    }
}