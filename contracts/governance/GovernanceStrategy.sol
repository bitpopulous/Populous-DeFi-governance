// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.7.5;
pragma abicoder v2;

import {IGovernanceStrategy} from '../interfaces/IGovernanceStrategy.sol';
import {IERC20} from '../interfaces/IERC20.sol';
import {IGovernancePowerDelegationToken} from '../interfaces/IGovernancePowerDelegationToken.sol';
import {Ownable} from '../dependencies/open-zeppelin/Ownable.sol';
import {SafeMath} from '../dependencies/open-zeppelin/SafeMath.sol';
import {ERC20} from '../ERC20.sol';

/**
 * @title Governance Strategy contract
 * @dev Smart contract containing logic to measure users' relative power to propose and vote.
 * User Power = User Power from Populous Token + User Power from stkPopulous Token.
 * User Power from Token = Token Power + Token Power as Delegatee [- Token Power if user has delegated]
 * Two wrapper functions linked to Populous Tokens's GovernancePowerDelegationERC20.sol implementation
 * - getPropositionPowerAt: fetching a user Proposition Power at a specified block
 * - getVotingPowerAt: fetching a user Voting Power at a specified block
 * @author Populous
 **/
contract GovernanceStrategy is Ownable, IGovernanceStrategy {
  using SafeMath for uint256;

  ERC20 public PXT;
  ERC20 public PPT;
  ERC20 public votingToken;

  /**
   * @dev Constructor, register tokens used for Voting and Proposition Powers.
   * @param pxt_ The address of the Populous PXT Token contract.
   **/
  constructor(address pxt_, address ppt_, address votingToken_) {
    require(
      (pxt_ != address(0)) &&
      (ppt_ != address(0)) &&
      (votingToken_ != address(0)), 
      "GovernanceStrategy: Invalid PXT/PPT token address"
    );

    votingToken = votingToken_;
    PPT = ERC20(ppt_);
    PXT = ERC20(pxt_);
  }

  /**
   * @dev Returns the total supply of Proposition Tokens Available for Governance
   * @return total supply at blockNumber
   **/
  function getTotalPropositionSupply() public view override returns (uint256) {
    return PXT.totalSupply();
  }

  /**
   * @dev Returns the total supply of Outstanding Voting Tokens 
   * @return total supply at blockNumber
   **/
  function getTotalVotingSupply() public view override returns (uint256) {
    return votingToken.totalSupply();
  }

  /**
   * @dev Returns the Proposition Power of a user at a specific block number.
   * @param user Address of the user.
   * @return Power number
   **/
  function getPropositionPower(address user)
    public
    view
    override
    returns (uint256)
  {
    return PXT.balanceOf(user);
  }

  /**
   * @dev Returns the Vote Power of a user at a specific block number.
   * @param user Address of the user.
   * @return Vote number
   **/
  function getVotingPower(address user)
    public
    view
    override
    returns (uint256)
  {
    return votingToken.balanceOf(user);
  }
}
