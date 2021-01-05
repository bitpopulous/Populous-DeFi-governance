//const {evmRevert, evmSnapshot, DRE} = require('../../helpers/misc-utils');
const {Signer, ethers} = require('ethers');
//const ethers = require("ethers");
const BigNumber = require('bignumber.js');
//const {rawBRE} = require('hardhat');
const {chai} = require('chai');
// @ts-ignore
const {solidity} = require('ethereum-waffle');
const { web3 } = require('@openzeppelin/test-helpers/src/setup');
//const {getEthersSigners} = require('../../helpers/contracts-helpers'); //addresses of local accounts in network
/* const {
  getAaveGovernanceV2,
  getAaveV2Mocked,
  getExecutor,
  getGovernanceStrategy,
} = require('../../helpers/contracts-getters'); */ //addresses of the deployed smart contracts
/* const {tEthereumAddress} = require('../../helpers/types');
const {AaveGovernanceV2} = require('../../types/AaveGovernanceV2');
const {AaveTokenV2} = require('../../types/AaveTokenV2');
const {Executor} = require('../../types/Executor');
const {GovernanceStrategy} = require('../../types/GovernanceStrategy'); */

const AaveGovernanceV2 = artifacts.require('AaveGovernanceV2');
const GovernanceStrategy = artifacts.require('GovernanceStrategy');
const Executor = artifacts.require('Executor');
const MockPPT = artifacts.require('MockPPT'); //for aave v2 token
const MockPXT = artifacts.require('MockPXT');//for stkAave token
const AaveTokenV2 = artifacts.require('AaveTokenV2');

//chai.use(solidity);

const SignerWithAddress = {
  signer: "...",
  address: "..."
}

/* const TestEnv = {
  deployer: SignerWithAddress,
  minter: SignerWithAddress,
  users: [], //array of SignerWithAddress
  aave: AaveTokenV2,
  stkAave: AaveTokenV2, // TODO change to a mock of stkAAVE
  gov: AaveGovernanceV2,
  strategy: GovernanceStrategy,
  executor: Executor
} */

const TestEnv = {
  deployer: SignerWithAddress,
  minter: SignerWithAddress,
  users: [], //array of addresses
  aave: "",
  stkAave: "", // TODO change to a mock of stkAAVE
  gov: "",
  strategy: "",
  executor: ""
}

//ethers - https://docs.ethers.io/v5/api/contract/contract-factory/

/* const getEthersSigners = async () =>
  await Promise.all(await ethers.getSigners());

  const getEthersSignersAddresses = async () =>
  await Promise.all((await ethers.getSigners()).map((signer) => signer.getAddress()));
 */
const getEthersSigners = async () => {
  return (await web3.eth.getAccounts());
};

const getCurrentBlock = async () => {
  return (await web3.eth.getBlockNumber());
};

/* const deployContract = async (
  contractName, //string
  args //any array []
) => {
  const contract = (await (await ethers.getContractFactory(contractName)).deploy(
    ...args
  ));
  await waitForTx(contract.deployTransaction);
  return contract;
}; */

const deployContract = async (
  contractName,
  args, //any array []
  deployer
) => {
  const contract = (await contractName.new(...args, {from: deployer}));
  return contract;
};

/* const getContract = async (
  contractName,
  address //string
) => (await ethers.getContractAt(contractName, address));
 */
const getContract = async (
  contractName,
  address //string
) => {
  return (await contractName.at(address));
}

const getContractWithoutAddress = async (
  contractName
) => {
  return (await contractName.deployed());
}


/* let buidlerevmSnapshotId = '0x1';
const setBuidlerevmSnapshotId = (id) => {
  if (DRE.network.name === 'hardhat') {
    buidlerevmSnapshotId = id;
  }
}; */

/* const testEnv: TestEnv = {
  deployer: {} as SignerWithAddress,
  minter: {} as SignerWithAddress,
  users: [] as SignerWithAddress[],
  aave: {} as AaveTokenV2,
  stkAave: {} as AaveTokenV2,
  gov: {} as AaveGovernanceV2,
  strategy: {} as GovernanceStrategy,
  executor: {} as Executor,
} as TestEnv; */


/*
task(`migrate:dev`, `Deploy governance for tests and development purposes`)
  .addFlag('verify')
  .addFlag('silent')
  .addParam('votingDelay', '', '15')
  .addParam('executorAsOwner', '', 'true') // had issue with other types than string
  .setAction(async ({votingDelay, executorAsOwner, verify, silent}, _DRE) => {
    await _DRE.run('set-DRE');
    const [adminSigner, tokenMinterSigner] = await _DRE.ethers.getSigners();
    const admin = await adminSigner.getAddress();
    const tokenMinter = await tokenMinterSigner.getAddress();
    // Deploy mocked AAVE v2
    const token = await _DRE.run('deploy:mocked-aave', {
      minter: tokenMinter,
      verify,
    });

    // Deploy mocked AAVE v2
    const stkToken = await _DRE.run('deploy:mocked-stk-aave', {
      minter: tokenMinter,
      verify,
    });

    // Deploy strategy
    const strategy = await _DRE.run('deploy:strategy', {
      aave: token.address,
      stkAave: stkToken.address,
    });

    // Deploy governance v2
    const governance = await _DRE.run('deploy:gov', {
      strategy: strategy.address,
      guardian: admin,
      votingDelay,
      verify,
    });

    // Deploy executor
    const delay = '60'; // 60 secs
    const gracePeriod = ONE_DAY.mul('14').toString();
    const minimumDelay = '0';
    const maximumDelay = ONE_DAY.mul('30').toString();
    const propositionThreshold = '100'; //  1% proposition 
    const voteDuration = '5'; // 5 blocks, to prevent to hang local EVM in testing
    const voteDifferential = '500'; // 5%
    const minimumQuorum = '2000'; // 20%

    const executor = await _DRE.run('deploy:executor', {
      admin: governance.address,
      delay,
      gracePeriod,
      minimumDelay,
      maximumDelay,
      propositionThreshold,
      voteDuration,
      voteDifferential,
      minimumQuorum,
      verify,
    });

    // authorize executor
    await _DRE.run('init:gov', {
      executorAsOwner,
      governance: governance.address,
      executor: executor.address,
    });

    if (!silent) {
      console.log('- Contracts deployed for development');
    }
  });
*/

const testEnv = TestEnv;

//to replace migrate:dev task
const migrate_test_env = async (votingDelay, executorAsOwner, silent) => {
  const [adminSigner, tokenMinterSigner] = await getEthersSigners();
  const admin = adminSigner;
  const tokenMinter = tokenMinterSigner;
  // Deploy mocked AAVE v2 / ppt token
  const token = await deployContract(MockPPT, [], admin); //contract, params, deployer/admin

  // Deploy mocked AAVE v2 / pxt token
  const stkToken = await deployContract(MockPXT, [], admin);

  // Deploy strategy
  const strategy = await deployContract(GovernanceStrategy, [token.address, stkToken.address], admin)

  // Deploy governance v2
  //const strategy = strategy.address
  const guardian = admin
  const executors = []
  const governance = await deployContract(
    AaveGovernanceV2, 
    [strategy.address, votingDelay, guardian, executors], 
    admin);

  // Deploy executor
  const ONE_DAY = 60*60*24; // BigNumber.from('60').mul('60').mul('24');
  const delay = '60'; // 60 secs
  //const gracePeriod = (ONE_DAY*14).toString(); //ONE_DAY.mul('14').toString(); //two weeks in seconds
  const gracePeriod = (ONE_DAY*0.5).toString();  //TODO changed for testing and advancing blocks
  const minimumDelay = '0';
  //const maximumDelay = (ONE_DAY*30).toString();//ONE_DAY.mul('30').toString();
  const maximumDelay = (ONE_DAY*1).toString();  //TODO changed for testing and advancing blocks
  const propositionThreshold = '100'; //  1% proposition 
  const voteDuration = '5'; // 5 blocks, to prevent to hang local EVM in testing
  const voteDifferential = '500'; // 5%
  const minimumQuorum = '2000'; // 20%

  const executor = await deployContract(
    Executor,
    [governance.address,
    delay,
    gracePeriod,
    minimumDelay,
    maximumDelay,
    propositionThreshold,
    voteDuration,
    voteDifferential,
    minimumQuorum],
    admin
  );

  // authorize executor
  await governance.authorizeExecutors([executor.address], {from: admin});
  //transfer ownership to executor
  if (executorAsOwner) {
    await governance.transferOwnership(executor.address, {from: admin});
  }

  if (!silent) { //if silent == false
    console.log('-> Contracts deployed for development');
  }


  const [_deployer, _minter, ...restSigners] = await getEthersSigners();

  const deployer = { //SignerWithAddress
    address: _deployer,
    signer: _deployer,
  };
  const minter = { //SignerWithAddress
    address: _minter,
    signer: _minter,
  };
  testEnv.users = restSigners;
  testEnv.deployer = deployer;
  testEnv.minter = minter;
  //console.log(testEnv.minter, "MINTER")
  testEnv.aave = token;
  testEnv.stkAave = stkToken;
  testEnv.gov = governance;
  testEnv.strategy = strategy;
  testEnv.executor = executor;
}

/* async function initializeMakeSuite() {
  const [_deployer, _minter, ...restSigners] = await getEthersSigners();
  const deployer = { //SignerWithAddress
    address: await _deployer.getAddress(),
    signer: _deployer,
  };
  const minter = { //SignerWithAddress
    address: await _minter.getAddress(),
    signer: _minter,
  };

  testEnv.users = await Promise.all(
    restSigners.map(async (signer) => ({
      signer,
      address: await signer.getAddress(),
    }))
  );

  testEnv.deployer = deployer;
  testEnv.minter = minter;
  testEnv.aave = await getAaveV2Mocked();
  testEnv.stkAave = await getAaveV2Mocked();
  testEnv.gov = await getAaveGovernanceV2();
  testEnv.strategy = await getGovernanceStrategy();
  testEnv.executor = await getExecutor();
} */



//THIS TAKES THE INFO OF CONTRACTS DEPLOYED WITH MIGRATION FILES USING .deployed() in getContractWithoutAddress()
//The deployer object/API in the truffle migration suite aides in deployment by both providing a clear syntax for deploying smart contracts as well as performing some of deployment's more mundane duties, such as saving deployed artifacts for later use
const initializeMakeSuite = async () => { 
  const [_deployer, _minter, ...restSigners] = await getEthersSigners();

  const deployer = { //SignerWithAddress
    address: _deployer,
    signer: _deployer,
  };
  const minter = { //SignerWithAddress
    address: _minter,
    signer: _minter,
  };

  /* testEnv.users = await Promise.all(
    restSigners.map(async (signer) => ({
      signer,
      address: signer,
    }))
  ); */

  testEnv.users = restSigners;
  testEnv.deployer = deployer;
  testEnv.minter = minter;
  testEnv.aave = await getContractWithoutAddress(MockPPT);
  testEnv.stkAave = await getContractWithoutAddress(MockPXT);
  testEnv.gov = await getContractWithoutAddress(AaveGovernanceV2);
  testEnv.strategy = await getContractWithoutAddress(GovernanceStrategy);
  testEnv.executor = await getContractWithoutAddress(Executor);
}


async function deployGovernance() {
  console.log('-> Deploying governance test environment...');
  //const migrate_test_env = async (votingDelay, executorAsOwner, silent) => {
  //await rawBRE.run('migrate:dev');
  await migrate_test_env('15', true, false);
  //await initializeMakeSuite();
  console.log('\n***************');
  console.log('Setup finished');
  console.log('***************\n');
}


async function deployGovernanceWithoutExecutorAsOwner() {
  console.log('-> Deploying governance test environment...');
  //const migrate_test_env = async (votingDelay, executorAsOwner, silent) => {
  await migrate_test_env('15', false, false);
  //await rawBRE.run('migrate:dev', {executorAsOwner: 'false'});
  //await initializeMakeSuite();
  console.log('\n***************');
  console.log('Setup and snapshot finished');
  console.log('***************\n');
}

async function deployGovernanceNoDelay() {
  console.log('-> Deploying governance test environment with no delay...');
  //const migrate_test_env = async (votingDelay, executorAsOwner, silent) => {
  await migrate_test_env('0', false, false);
  //await rawBRE.run('migrate:dev', {votingDelay: '0'});
  //await initializeMakeSuite();
  console.log('\n***************');
  console.log('Setup and snapshot finished');
  console.log('***************\n');
}

async function makeSuite(name, deployment) {
  /* beforeEach(async () => {
    //rawBRE.run('set-DRE');
    setBuidlerevmSnapshotId(await evmSnapshot());
  }); */
  
  //console.log('******running ' + name + ' *******')
  //await deployment;
  
  //describe(name, async () => {
    //before(deployment);
    //tests(testEnv);
  //});
  /* afterEach(async () => {
    await evmRevert(buidlerevmSnapshotId);
  }); */
}

module.exports = { makeSuite, deployGovernanceNoDelay, deployGovernanceWithoutExecutorAsOwner, deployGovernance, 
initializeMakeSuite, getEthersSigners, getCurrentBlock, deployContract, getContract, getContractWithoutAddress,
SignerWithAddress, testEnv};