// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.7.5;
pragma abicoder v2;

interface IVotingStrategy {
  function getVotingPower(address user) external view returns (uint256);
}
