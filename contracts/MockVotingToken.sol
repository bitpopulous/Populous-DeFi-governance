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
    enum DelegationType {VOTING_POWER, PROPOSITION_POWER}

    ERC20 public pxtToken;
    IPopulousGovernanceV2 public governance;

    uint256 public decimals = 8;
    string public symbol = "GT";
    string public name = "Populous Governance Tokens";

    event Deposit(address indexed user, uint256 amount);
    event Redeemed(address indexed user, uint256 amount);

    constructor(address _pxt) public {
        require(_pxt != address(0), "MockVotingToken: Invalid pxt address");
        pxtToken = ERC20(_pxt);
    }

    // only owner/admin
    function setGov(address _governance) public onlyOwner {
        require(_governance != address(0), "MockVotingToken: Invalid governance address");
        governance = IPopulousGovernanceV2(_governance);
    }

    function getGov() public returns(address) {
        return address(governance);
    }

    function getPXT() public returns(address) {
        return address(pxtToken);
    }

    function deposit() public {
        uint256 balance = pxtToken.balanceOf(msg.sender);
        require(balance > 0, "MockVotingToken: PXT balance must be above 0");
        require(balanceOf(msg.sender) == 0, "MockVotingToken: Voting token balance must be 0");
        require(
            pxtToken.transferFrom(msg.sender, address(this), balance) == true,
            "MockVotingToken: TransferFrom failed"
        );
        _mint(msg.sender, balance);
        emit Deposit(msg.sender, balance);
    }

    function redeem() public {
        uint256 govBalance = balanceOf(msg.sender);
        _burn(msg.sender, govBalance);

        for (uint256 i = 0; i < governance.getProposalsCount(); i++) {
            uint256 state = uint256(governance.getProposalState(i));
            if (governance.getVoteOnProposal(i, msg.sender).votingPower > 0) {
                require (
                    (
                        state != 0 || state != 2
                    ),
                    "MockVotingToken: User cannot have vote on pending or active proposal"
                );
            }
        }

        require(
            pxtToken.transfer(msg.sender, govBalance) == true,
            "MockVotingToken: Transfer failed"
        );
    }

    // increase voting power
    // how many tokens? pxt or ppt or both and 1:1?

    function getPowerAtBlock(
        address user,
        uint256 blockNumber,
        DelegationType delegationType
    ) external view returns (uint256) {
        return balanceOf(user);
    }
}