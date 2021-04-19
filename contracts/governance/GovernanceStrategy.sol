// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.7.5;
pragma abicoder v2;

import {IGovernanceStrategy} from '../interfaces/IGovernanceStrategy.sol';
import {IERC20} from '../interfaces/IERC20.sol';
import {IGovernancePowerDelegationToken} from '../interfaces/IGovernancePowerDelegationToken.sol';
import {Ownable} from '../dependencies/open-zeppelin/Ownable.sol';
import {SafeMath} from '../dependencies/open-zeppelin/SafeMath.sol';

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

  address public immutable Populous;
  address public immutable stkPopulous;

  /**
   * @dev Constructor, register tokens used for Voting and Proposition Powers.
   * @param _populous The address of the Populous Token contract.
   * @param _stkPopulous The address of the stkPopulous Token Contract
   **/
  constructor(address _populous, address _stkPopulous) {
    require(_populous != address(0), "GovernanceStrategy: Invalid populous token address");
    require(_stkPopulous != address(0), "GovernanceStrategy: Invalid stkPopulous token address");
    Populous = _populous;
    stkPopulous = _stkPopulous;
  }

  /**
   * @dev Returns the total supply of Proposition Tokens Available for Governance
   * = Populous Available for governance      + stkPopulous available
   * The supply of Populous staked in stkPopulous are not taken into account so:
   * = (Supply of Populous - Populous in stkPopulous) + (Supply of stkPopulous)
   * = Supply of Populous, Since the supply of stkPopulous is equal to the number of Populous staked
   * @param blockNumber Blocknumber at which to evaluate
   * @return total supply at blockNumber
   **/
  function getTotalPropositionSupplyAt(uint256 blockNumber) public view override returns (uint256) {
    return IERC20(Populous).totalSupplyAt(blockNumber);
  }

  /**
   * @dev Returns the total supply of Outstanding Voting Tokens 
   * @param blockNumber Blocknumber at which to evaluate
   * @return total supply at blockNumber
   **/
  function getTotalVotingSupplyAt(uint256 blockNumber) public view override returns (uint256) {
    return getTotalPropositionSupplyAt(blockNumber);
  }

  /**
   * @dev Returns the Proposition Power of a user at a specific block number.
   * @param user Address of the user.
   * @param blockNumber Blocknumber at which to fetch Proposition Power
   * @return Power number
   **/
  function getPropositionPowerAt(address user, uint256 blockNumber)
    public
    view
    override
    returns (uint256)
  {
    return
      _getPowerByTypeAt(user, blockNumber, IGovernancePowerDelegationToken.DelegationType.PROPOSITION_POWER);
  }

  /**
   * @dev Returns the Vote Power of a user at a specific block number.
   * @param user Address of the user.
   * @param blockNumber Blocknumber at which to fetch Vote Power
   * @return Vote number
   **/
  function getVotingPowerAt(address user, uint256 blockNumber)
    public
    view
    override
    returns (uint256)
  {
    return _getPowerByTypeAt(user, blockNumber, IGovernancePowerDelegationToken.DelegationType.VOTING_POWER);
  }

  function _getPowerByTypeAt(
    address user,
    uint256 blockNumber,
    IGovernancePowerDelegationToken.DelegationType powerType
  ) internal view returns (uint256) {
    return
    IGovernancePowerDelegationToken(stkPopulous).getPowerAtBlock(user, blockNumber, powerType);
      /* (IGovernancePowerDelegationToken(Populous).getPowerAtBlock(user, blockNumber, powerType).mul(pptWeight))
      .add
      (IGovernancePowerDelegationToken(STK_Populous).getPowerAtBlock(user, blockNumber, powerType).mul(pxtWeight)); */
  }
}
