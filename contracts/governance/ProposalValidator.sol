// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.7.5;
pragma abicoder v2;

import {IPopulousGovernanceV2} from '../interfaces/IPopulousGovernanceV2.sol';
import {IGovernanceStrategy} from '../interfaces/IGovernanceStrategy.sol';
import {IProposalValidator} from '../interfaces/IProposalValidator.sol';
import {SafeMath} from '../dependencies/open-zeppelin/SafeMath.sol';

/**
 * @title Proposal Validator Contract, inherited by  Populous Governance Executors
 * @dev Validates/Invalidations propositions state modifications.
 * Proposition Power functions: Validates proposition creations/ cancellation
 * Voting Power functions: Validates success of propositions.
 * @author Populous
 **/
contract ProposalValidator is IProposalValidator {
  using SafeMath for uint256;

  uint256 public immutable override PROPOSITION_THRESHOLD;
  uint256 public immutable override VOTING_DURATION;
  uint256 public immutable override VOTE_DIFFERENTIAL;
  uint256 public immutable override MINIMUM_QUORUM;
  uint256 public constant override ONE_HUNDRED_WITH_PRECISION = 10000; // Equivalent to 100%, but scaled for precision

  /**
   * @dev Constructor
   * @param propositionThreshold minimum percentage of supply needed to submit a proposal
   * - In ONE_HUNDRED_WITH_PRECISION units
   * @param votingDuration duration in blocks of the voting period
   * @param voteDifferential percentage of supply that `for` votes need to be over `against`
   *   in order for the proposal to pass
   * - In ONE_HUNDRED_WITH_PRECISION units
   * @param minimumQuorum minimum percentage of the supply in FOR-voting-power need for a proposal to pass
   * - In ONE_HUNDRED_WITH_PRECISION units
   **/
  constructor(
    uint256 propositionThreshold,
    uint256 votingDuration,
    uint256 voteDifferential,
    uint256 minimumQuorum
  ) {
    PROPOSITION_THRESHOLD = propositionThreshold;
    VOTING_DURATION = votingDuration;
    VOTE_DIFFERENTIAL = voteDifferential;
    MINIMUM_QUORUM = minimumQuorum;
  }

  /**
   * @dev Called to validate a proposal (e.g when creating new proposal in Governance)
   * @param governance Governance Contract
   * @param user Address of the proposal creator
   * @return boolean, true if can be created
   **/
  function validateCreatorOfProposal(
    IPopulousGovernanceV2 governance,
    address user
  ) external view override returns (bool) {
    return isPropositionPowerEnough(governance, user);
  }

  /**
   * @dev Called to validate the cancellation of a proposal
   * Needs to creator to have lost proposition power threashold
   * @param governance Governance Contract
   * @param user Address of the proposal creator
   * @return boolean, true if can be cancelled
   **/
  function validateProposalCancellation(
    IPopulousGovernanceV2 governance,
    address user
  ) external view override returns (bool) {
    return !isPropositionPowerEnough(governance, user);
  }

  /**
   * @dev Returns whether a user has enough Proposition Power to make a proposal.
   * @param governance Governance Contract
   * @param user Address of the user to be challenged.
   * @return true if user has enough power
   **/
  function isPropositionPowerEnough(
    IPopulousGovernanceV2 governance,
    address user
  ) public view override returns (bool) {
    IGovernanceStrategy currentGovernanceStrategy = IGovernanceStrategy(
      governance.getGovernanceStrategy()
    );
    return
      currentGovernanceStrategy.getPropositionPower(user) >=
      getMinimumPropositionPowerNeeded(governance);
  }

  /**
   * @dev Returns the minimum Proposition Power needed to create a proposition.
   * @param governance Governance Contract
   * @return minimum Proposition Power needed
   **/
  function getMinimumPropositionPowerNeeded(IPopulousGovernanceV2 governance)
    public
    view
    override
    returns (uint256)
  {
    IGovernanceStrategy currentGovernanceStrategy = IGovernanceStrategy(
      governance.getGovernanceStrategy()
    );
    return
      currentGovernanceStrategy
        .getTotalPropositionSupply()
        .mul(PROPOSITION_THRESHOLD)
        .div(ONE_HUNDRED_WITH_PRECISION);
  }

  /**
   * @dev Returns whether a proposal passed or not
   * @param governance Governance Contract
   * @param proposalId Id of the proposal to set
   * @return true if proposal passed
   **/
  function isProposalPassed(IPopulousGovernanceV2 governance, uint256 proposalId)
    external
    view
    override
    returns (bool)
  {
    return (isQuorumValid(governance, proposalId) &&
      isVoteDifferentialValid(governance, proposalId));
  }

  /**
   * @dev Calculates the minimum amount of Voting Power needed for a proposal to Pass
   * @param votingSupply Total number of oustanding voting tokens
   * @return voting power needed for a proposal to pass
   **/
  function getMinimumVotingPowerNeeded(uint256 votingSupply)
    public
    view
    override
    returns (uint256)
  {
    return votingSupply.mul(MINIMUM_QUORUM).div(ONE_HUNDRED_WITH_PRECISION);
  }

  /**
   * @dev Check whether a proposal has reached quorum, ie has enough FOR-voting-power
   * Here quorum is not to understand as number of votes reached, but number of for-votes reached
   * @param governance Governance Contract
   * @param proposalId Id of the proposal to verify
   * @return voting power needed for a proposal to pass
   **/
  function isQuorumValid(IPopulousGovernanceV2 governance, uint256 proposalId)
    public
    view
    override
    returns (bool)
  {
    IPopulousGovernanceV2.ProposalWithoutVotes memory proposal = governance.getProposalById(proposalId);
    uint256 votingSupply = proposal.forVotes + proposal.againstVotes; //IGovernanceStrategy(proposal.strategy).getTotalVotingSupply();

    return proposal.forVotes >= getMinimumVotingPowerNeeded(votingSupply);
  }

  /**
   * @dev Check whether a proposal has enough extra FOR-votes than AGAINST-votes
   * FOR VOTES - AGAINST VOTES > VOTE_DIFFERENTIAL * voting supply
   * @param governance Governance Contract
   * @param proposalId Id of the proposal to verify
   * @return true if enough For-Votes
   **/
  function isVoteDifferentialValid(IPopulousGovernanceV2 governance, uint256 proposalId)
    public
    view
    override
    returns (bool)
  {
    IPopulousGovernanceV2.ProposalWithoutVotes memory proposal = governance.getProposalById(proposalId);
    uint256 votingSupply = proposal.forVotes + proposal.againstVotes; //IGovernanceStrategy(proposal.strategy).getTotalVotingSupply();

    if (votingSupply > 0) {
      return (proposal.forVotes.mul(ONE_HUNDRED_WITH_PRECISION).div(votingSupply) >
      proposal.againstVotes.mul(ONE_HUNDRED_WITH_PRECISION).div(votingSupply).add(
        VOTE_DIFFERENTIAL
      ));
    } else {
      return false;
    }
    
  }
}
