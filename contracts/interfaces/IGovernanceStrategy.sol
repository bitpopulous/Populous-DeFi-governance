// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.7.5;
pragma abicoder v2;

interface IGovernanceStrategy {
  /**
   * @dev Returns the Proposition Power of a user at a specific block number.
   * @param user Address of the user.
   * @return Power number
   **/
  function getPropositionPower(address user) external view returns (uint256);
  /**
   * @dev Returns the total supply of Outstanding Proposition Tokens 
   * @return total supply at blockNumber
   **/
  function getTotalPropositionSupply() external view returns (uint256);
  /**
   * @dev Returns the total supply of Outstanding Voting Tokens 
   * @return total supply at blockNumber
   **/
  function getTotalVotingSupply() external view returns (uint256);
  /**
   * @dev Returns the Vote Power of a user.
   * @param user Address of the user.
   * @return Vote number
   **/
  function getVotingPower(address user) external view returns (uint256);
}
