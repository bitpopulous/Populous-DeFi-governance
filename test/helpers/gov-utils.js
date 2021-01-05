const {Signer, BigNumberish} = require('ethers');
const BigNumber = require('bignumber.js');
const {getCurrentBlock } = require('./make-suite');
//const {latestBlock, DRE} = require('../../helpers/misc-utils');
const {expect, use} = require('chai');
const { Test } = require('mocha');

const emptyBalances = async (users, testEnv) => {
  for (let i = 0; i < users.length; i++) {
    const balanceBefore = await testEnv.Populous.balanceOf(users[i]);//TODO - if balance > 0
    if (new BigNumber(balanceBefore).shiftedBy(-8).toNumber() > 0) {
      await (
        await testEnv.Populous.transfer(testEnv.minter.address, balanceBefore, {from: users[i]})
      ).wait();
    }
  }
};

const setBalance = async (user, amount, testEnv) => {
  // emptying
  const balanceBefore = await testEnv.Populous.balanceOf(user);
  if (new BigNumber(balanceBefore).shiftedBy(-8).toNumber() > 0) {
    await (
      await testEnv.Populous.transfer(testEnv.minter.address, balanceBefore, {from: user})
    ).wait();
  }
  // filling
  await testEnv.Populous.transfer(user, amount, {from: testEnv.minter.address});
};

const getInitContractData = async (testEnv) => ({
  votingDelay: await testEnv.gov.getVotingDelay(),
  votingDuration: await testEnv.executor.VOTING_DURATION(),
  executionDelay: await testEnv.executor.getDelay(),
  minimumPower: await testEnv.executor.getMinimumVotingPowerNeeded(
    await testEnv.strategy.getTotalVotingSupplyAt(await getCurrentBlock()) //TODO add new function to ppt token
  ),
  minimumCreatePower: await testEnv.executor.getMinimumPropositionPowerNeeded(
    testEnv.gov.address,
    await getCurrentBlock()
  ),
  gracePeriod: await testEnv.executor.GRACE_PERIOD(),
});

const expectProposalState = async (
  proposalId,
  state,
  testEnv
) => {
  expect(new BigNumber(await testEnv.gov.getProposalState(proposalId)).toNumber()).to.be.equal(
    state
  );
};

const getLastProposalId = async (testEnv) => {
  const currentCount = await testEnv.gov.getProposalsCount();
  return currentCount.eq('0') ? currentCount : currentCount.sub('1');
};

const encodeSetDelay = async (newDelay, testEnv) =>
  testEnv.gov.interface.encodeFunctionData('setVotingDelay', [new BigNumber(newDelay)]);

module.exports = { encodeSetDelay, getLastProposalId, expectProposalState, getInitContractData, 
  setBalance, emptyBalances};