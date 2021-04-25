const MockPPT = artifacts.require('MockPPT');
const MockPXT = artifacts.require('MockPXT');
const GovernanceStrategy = artifacts.require('GovernanceStrategy');
const PopulousGovernanceV2 = artifacts.require('PopulousGovernanceV2');
const Executor = artifacts.require('Executor');
const MockVotingToken = artifacts.require('MockVotingToken');

// const {deployProxy} = require('@openzeppelin/truffle-upgrades');
// const {ethers} = require('ethers');
// const {latest, duration, toBN} = require('../../helpers/utils');
// const {parseEther} = ethers.utils;

const {getGovernanceActorsAsync} = require('../../helpers/address');


const deployMockPPT = async () => {
  const {owner} = await getGovernanceActorsAsync();
  const pptInstance = await MockPPT.new({from: owner});

  return [pptInstance, {owner}];
};

const deployMockPXT = async () => {
  const {owner} = await getGovernanceActorsAsync();
  const pxtInstance = await MockPXT.new({from: owner});

  return [pxtInstance, {owner}];
};

const deployMockVotingToken = async () => {
  const {owner} = await getGovernanceActorsAsync();
  const votingTokenInstance = await MockVotingToken.new({from: owner});

  return [votingTokenInstance, {owner}];
};

const deployGovernanceStrategy = async () => {
  const {owner} = await getGovernanceActorsAsync();

  const [pxtInstance] = await deployMockPXT();
  const [pptInstance] = await deployMockPPT();
  const [votingTokenInstance] = await deployMockVotingToken();

  const governanceStrategyInstance = await GovernanceStrategy.new(
    pxtInstance.address,
    pptInstance.address,
    votingTokenInstance.address,
    {from: owner}
  );

  return [
    governanceStrategyInstance,
    pxtInstance,
    pptInstance,
    votingTokenInstance,
    {owner}
  ];
};

const deployGovernance = async () => {
  const {owner, firstUser, secondUser, thirdUser, fourthUser} = await getGovernanceActorsAsync();
  const votingDelay = 0;
  const guardian = owner;
  const executors = [];

  const [
    governanceStrategyInstance,
    pxtInstance,
    pptInstance,
    votingTokenInstance
  ] = await deployGovernanceStrategy();

  const governanceInstance = await PopulousGovernanceV2.new(
    votingTokenInstance.address,
    pptInstance.address,
    pxtInstance.address,
    governanceStrategyInstance.address,
    votingDelay,
    guardian,
    executors,
    {from: owner}
  );

  // todo - mint ppt and pxt for users
  const amountToMint = 1000000 * (10**8);
  for (let from of [owner, firstUser, secondUser, thirdUser, fourthUser]) {
    
  }

  // set governance as voting token admin
  await votingTokenInstance.setAdmin(governanceInstance.address, {from: owner});

  return [
    governanceInstance,
    votingTokenInstance,
    pptInstance,
    pxtInstance,
    governanceStrategyInstance,
    votingDelay,
    guardian,
    executors,
    {owner}
  ];
};

const deployExecutor = async (options = {}) => {
  const {owner} = await getGovernanceActorsAsync();
  
  const [governanceInstance] = await deployGovernance();

  const {
    ONE_DAY = 60*60*24, // BigNumber.from('60').mul('60').mul('24');
    admin = governanceInstance.address,
    delay = '60', // 60 secs
    gracePeriod = (ONE_DAY*14).toString(), //ONE_DAY.mul('14').toString();
    minimumDelay = '0',
    maximumDelay = (ONE_DAY*30).toString(),//ONE_DAY.mul('30').toString();
    propositionThreshold = '100', //  1% proposition 
    voteDuration = '5', // 5 blocks, to prevent to hang local EVM in testing
    voteDifferential = '500', // 5%
    minimumQuorum = '2000', // 20%
  } = options;

  const executorInstance = await Executor.new(
      admin,
      delay,
      gracePeriod,
      minimumDelay,
      maximumDelay,
      propositionThreshold,
      voteDuration,
      voteDifferential,
      minimumQuorum,
      {from: owner}
  );        
  
  await governanceInstance.authorizeExecutors(
    [executorInstance.address], 
    {from: owner}
  );

  return [executorInstance, governanceInstance, {owner}];
};

module.exports = {
  deployExecutor,
  deployGovernance,
  deployGovernanceStrategy,
  deployMockPPT,
  deployMockPXT,
  deployMockVotingToken
};
