
const {
    BN,           // Big Number support
    constants,    // Common constants, like the zero address and largest integers
    expectEvent,  // Assertions for emitted events
    expectRevert, // Assertions for transactions that should fail
    time,
} = require('@openzeppelin/test-helpers');
const { expect, use } = require('chai');
const { utils } = require('web3');
const BigNumber = require('bignumber.js');
const AaveGovernanceV2 = artifacts.require('AaveGovernanceV2');
const GovernanceStrategy = artifacts.require('GovernanceStrategy');
const MockPPT = artifacts.require('MockPPT');
const MockPXT = artifacts.require('MockPXT');
const Executor = artifacts.require('Executor');
const AaveTokenV2 = artifacts.require('AaveTokenV2');

const {makeSuite, deployGovernanceNoDelay, deployGovernanceWithoutExecutorAsOwner, 
    deployGovernance, initializeMakeSuite, getEthersSigners, 
    getCurrentBlock, deployContract, getContract, getContractWithoutAddress,
    SignerWithAddress, testEnv
} = require('./helpers/make-suite');

const {
    WAD, MAX_UINT_AMOUNT, 
    ONE_ADDRESS, ONE_YEAR, ZERO_ADDRESS, 
    ipfsBytes32Hash
} = require('./helpers/constants');

const {solidity} = require('ethereum-waffle');
const {BytesLike, formatEther, parseEther, splitSignature} = require('ethers/lib/utils');
const {Signer, ethers, BigNumberish, Wallet} = require('ethers');
const {
  emptyBalances,
  getInitContractData,
  setBalance,
  expectProposalState,
  getLastProposalId,
} = require('./helpers/gov-utils');
const {buildPermitParams, getSignatureFromTypedData} = require('./helpers/permit');
const {fail} = require('assert');
const {waitForTx, increaseTime, advanceBlock, advanceBlockTo, latestBlock,
  toWad, bnToBigNumber, stringToBigNumber, sleep,
  createRandomAddress, evmSnapshot, evmRevert, timeLatest} = require('./helpers/misc-utils');
const { exec } = require('child_process');

use(solidity);

const proposalStates = {
    PENDING: 0,
    CANCELED: 1,
    ACTIVE: 2,
    FAILED: 3,
    SUCCEEDED: 4,
    QUEUED: 5,
    EXPIRED: 6,
    EXECUTED: 7,
  };
  
const snapshots = new Map(); //new Map https://stackoverflow.com/questions/4246980/how-to-create-a-simple-map-using-javascript-jquery // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set

const convertToCurrencyDecimals = async (token_address, amount) => {
    let _token = await MockPPT.at(token_address);
    let pDecimals = await _token.decimals();
    ////console.log(Number(pDecimals.toString()), 'MockPPT decimals');
    let converted = new BigNumber(10 ** Number(pDecimals.toString()) * amount);
    return converted;
};


//TODO - to number function
//expect(new BigNumber(await daiInstance.balanceOf(bob)).shiftedBy(-18).toNumber()).to.be.equal(50000, "Invalid balance after mint");
//.toNumber()

/* contract('Populous Governance V2 and Governance Strategy', async ([deployer, ...users]) => {

    before(async () => {
        
    });

    //beforeEach(async () => {
    //});
    
    it('', async () => {

    })

}); */

contract('Populous Governance V2', async ([deployer, ...users]) => {

    let votingDelay;
    let votingDuration;
    let executionDelay;
    let minimumPower;
    let minimumCreatePower;
    let proposalId;
    let startBlock;
    let endBlock;
    let executionTime;
    let gracePeriod;

  // Snapshoting main states as entry for later testing
  // Then will test by last snap shot first.
  before(async () => {
    await deployGovernanceNoDelay();

    const provider = new ethers.providers.Web3Provider(web3.currentProvider);
    console.log(provider, 'current provider')

    /* //testEnv structure
    deployer: SignerWithAddress,
    minter: SignerWithAddress,
    users: [], //array of addresses
    aave: "",
    stkAave: "", // TODO change to a mock of stkAAVE
    gov: "",
    strategy: "",
    executor: "" */
    const {dep, minter, users, aave, stkAave, gov, strategy, executor} = testEnv;
    const [user1, user2, user3, user4, user5] = users;

    console.log(testEnv.strategy.address, 'governance strategy address')
    
    await testEnv.aave.mint("1000000"+"00000000", {from: minter.address})
    console.log(await testEnv.aave.totalSupply(), 'total ppt tokens')
    
    const totalSupply = await testEnv.strategy.getTotalVotingSupplyAt(await getCurrentBlock())

    console.log(totalSupply, 'total voting supply')

    let {
      votingDelay,
      votingDuration,
      executionDelay,
      minimumPower,
      minimumCreatePower,//TODO - test and print this
      gracePeriod,
    } = await getInitContractData(testEnv);

    console.log(votingDelay, 'voting delay')
    console.log(votingDuration, 'voting duration')
    console.log(executionDelay, 'execution delay')
    console.log(minimumPower, 'minimum voting power')
    console.log(minimumCreatePower, 'minimum create power')
    console.log(gracePeriod, 'grace period')

    // Cleaning users balances
    await emptyBalances(users, testEnv);

    console.log(await evmSnapshot(), 'evm snapshot')
    // SNAPSHOT: EMPTY GOVERNANCE
    snapshots.set('start', await evmSnapshot());//save ethereum virtual machine snapshot to map/mapping

    //console.log(new BigNumber(minimumPower).shiftedBy(-8).toNumber() / 2 + 2 , 'power div 2')
    //console.log(await convertToCurrencyDecimals(aave.address, new BigNumber(minimumPower).shiftedBy(-8).toNumber() / 2 + 2) , 'amount after conversion')

    // Preparing users with different powers for test
    // user 1: 50% min voting power + 2 = 10%+ total power
    await setBalance(user1, await convertToCurrencyDecimals(aave.address, new BigNumber(minimumPower).shiftedBy(-8).toNumber() / 2 + 2), testEnv);
    // user 2: 50% min voting power + 2 = 10%+ total power
    await setBalance(user2, await convertToCurrencyDecimals(aave.address, new BigNumber(minimumPower).shiftedBy(-8).toNumber() / 2 + 2), testEnv);
    // user 3: 2 % min voting power, will be used to swing the vote
    //await setBalance(user3, minimumPower.mul('2').div('100').add('10'), testEnv);
    await setBalance(user3, await convertToCurrencyDecimals(aave.address, new BigNumber(minimumPower).shiftedBy(-8).toNumber() * 2 / 100 + 10), testEnv)
    // user 4: 75% min voting power + 10 : = 15%+ total power, can barely make fail differential
    await setBalance(user4, await convertToCurrencyDecimals(aave.address, new BigNumber(minimumPower).shiftedBy(-8).toNumber() * 75 / 100 + 10), testEnv);
    // user 5: 50% min voting power + 2 = 10%+ total power.
    await setBalance(user5, await convertToCurrencyDecimals(aave.address, new BigNumber(minimumPower).shiftedBy(-8).toNumber() / 2 + 2), testEnv);
    
    let block = await provider.getBlockNumber();
    expect(new BigNumber(await strategy.getVotingPowerAt(user5, block)).shiftedBy(-8).toNumber()).to.be.equal( //TODO add new function to ppt token
      new BigNumber(minimumPower).shiftedBy(-8).toNumber() / 2 + 2
    );

    /*
    // user 5 delegates to user 2 => user 2 reached quorum
    await waitForTx(await aave.connect(user5.signer).delegate(user2.address));
    block = await DRE.ethers.provider.getBlockNumber();
    // checking delegation worked
    expect(await strategy.getVotingPowerAt(user5.address, block)).to.be.equal('0');
    expect(await strategy.getVotingPowerAt(user2.address, block)).to.be.equal(
      minimumPower.div('2').add('2').mul(2)
    );
    */

    //to create proposal, users proposition power should be greater or equal to mimimum create power (shown above)
    //this is checked in governance create function
    console.log((await strategy.getPropositionPowerAt(user1, await provider.getBlockNumber())).toNumber() >= (await executor.getMinimumPropositionPowerNeeded(gov.address, await provider.getBlockNumber())).toNumber())
    console.log(await executor.isPropositionPowerEnough(gov.address, user1, await provider.getBlockNumber())) //this checks condition above in smart contract
    console.log(await executor.validateCreatorOfProposal(gov.address, user1, await provider.getBlockNumber()))//this calls function above
  
    //const callData = await encodeSetDelay('400', testEnv);
    //Creating first proposal: Changing delay to 400 via no sig + calldata
    /* const tx1 = 
      await gov
        .create(executor.address, gov.address, ['0'], [''], [callData], [false], ipfsBytes32Hash, {from: user1}); */


    //Creating first proposal: no sig + no calldata
    const tx1 = 
      await gov
        .create(executor.address, [ZERO_ADDRESS], ['0'], [''], ['0x'], [false], ipfsBytes32Hash, {from: user1});
    console.log(tx1.logs[0].blockNumber)

    //Proposal 1

    // fixing constants
    proposalId = tx1.logs[0].args.id;//proposal id is first parameter in ProposalCreated event
    startBlock = tx1.logs[0].blockNumber + votingDelay.toNumber();
    endBlock = tx1.logs[0].blockNumber + votingDelay.toNumber() + votingDuration.toNumber();
    // delay = 0, should be active
    await expectProposalState(proposalId, proposalStates.PENDING, testEnv);

    // SNAPSHOT PENDING
    snapshots.set('active', await evmSnapshot());

    const balanceAfter = await aave.balanceOf(user1);
    console.log(new BigNumber(balanceAfter).toNumber())

    // Pending => Active
    // => go to start block
    await advanceBlockTo(Number(startBlock + 1 ).toString());
    await expectProposalState(proposalId, proposalStates.ACTIVE, testEnv);

    // SNAPSHOT: ACTIVE PROPOSAL
    snapshots.set('active', await evmSnapshot());

    // Active => Succeeded, user 1 + user 2 votes > threshold
    /*
    await expect(gov.submitVote(proposalId, true, {from: user1}))
      .to.emit(gov, 'VoteEmitted')
      .withArgs(proposalId, user1.address, true, balanceAfter);

    await expect(gov.connect(user2.signer).submitVote(proposalId, true))
      .to.emit(gov, 'VoteEmitted')
      .withArgs(proposalId, user2.address, true, balanceAfter.mul('2'));
    */ 
    const voteTx1 = await gov.submitVote(proposalId, true, {from: user1})
    //console.log(voteTx1.logs)
    await expect(voteTx1.logs[0].event).to.be.equal('VoteEmitted')

    const voteTx2 = await gov.submitVote(proposalId, true, {from: user2})
    //console.log(voteTx1.logs)
    await expect(voteTx2.logs[0].event).to.be.equal('VoteEmitted')

    // go to end of voting period
    await advanceBlockTo(Number(endBlock + 3 ).toString());
    await expectProposalState(proposalId, proposalStates.SUCCEEDED, testEnv);

    // SNAPSHOT: SUCCEEDED PROPOSAL
    snapshots.set('succeeded', await evmSnapshot());

    // Succeeded => Queued:
    const queueTx = await gov.queue(proposalId, {from: user1});//proposal executionTime is created here - uint256 executionTime = block.timestamp.add(proposal.executor.getDelay())
    await expectProposalState(proposalId, proposalStates.QUEUED, testEnv);
    
    // SNAPSHOT: QUEUED PROPOSAL
    executionTime = (await gov.getProposalById(proposalId)).executionTime;
    console.log(executionTime, 'proposal 1 execution unix timestamp');
    snapshots.set('queued', await evmSnapshot());

    const blockTime = await provider.getBlock(queueTx.blockNumber);

    const execTime = blockTime.timestamp + Number(executionDelay.toString());
    console.log(execTime, 'actual exec unix timestamp')
    console.log(Number(executionDelay.toString()), 'exec delay unix timestamp')
    console.log(blockTime.timestamp, 'block timestamp')

    await advanceBlock(Number(execTime.toString()))

    console.log(gracePeriod, 'grace period')
    //Execute the proposal (If Proposal Queued)
    //will not: execute a canceled proposal; execute a queued proposal before timelock; execute a queued proposal after grace period (expired); 
    // 5 sec before grace period reached
    /* await advanceBlockTo(Number(executionTime + gracePeriod - 5).toString());
    await expect(gov.votingDelay()).to.be.equal(votingDelay)
    //governance: function execute(uint256 proposalId) external payable override {
    const executeTx = await gov.execute(proposalId, {from: user1}) //conditions: block.timestamp >= executionTime (checks uint256 executionTime = block.timestamp.add(proposal.executor.getDelay()))
    //gov.execute calls executor.executeTransaction in executorWithTimeLock
    await expect(executeTx.logs[0].event).to.be.equal('ProposalExecuted') */


    
    //Creating 2nd proposal: Changing delay to 300 via sig + argument data
    const encodedArgument2 = ethers.utils.defaultAbiCoder.encode(['uint'], [300]);
    const tx2 = 
      await gov
        .create(
          executor.address,
          [gov.address],
          ['0'],
          ['setVotingDelay(uint256)'],
          [encodedArgument2],
          [false],
          ipfsBytes32Hash, 
          {from: user1}
    );
    const proposal2Id = tx2.logs[0].args.id

    startBlock = tx2.logs[0].blockNumber + votingDelay.toNumber();
    endBlock = tx2.logs[0].blockNumber + votingDelay.toNumber() + votingDuration.toNumber();
    // delay = 0, should be active
    await expectProposalState(proposal2Id, proposalStates.PENDING, testEnv);

    // SNAPSHOT PENDING
    snapshots.set('active', await evmSnapshot());

    /* const balanceAfter = await aave.balanceOf(user1);
    console.log(new BigNumber(balanceAfter).toNumber()) */

    // Pending => Active
    // => go to start block
    await advanceBlockTo(Number(startBlock + 1 ).toString());
    await expectProposalState(proposal2Id, proposalStates.ACTIVE, testEnv);

    // SNAPSHOT: ACTIVE PROPOSAL
    snapshots.set('active', await evmSnapshot());

    // Active => Succeeded, user 1 + user 2 votes > threshold
    /*
    await expect(gov.submitVote(proposalId, true, {from: user1}))
      .to.emit(gov, 'VoteEmitted')
      .withArgs(proposalId, user1.address, true, balanceAfter);

    await expect(gov.connect(user2.signer).submitVote(proposalId, true))
      .to.emit(gov, 'VoteEmitted')
      .withArgs(proposalId, user2.address, true, balanceAfter.mul('2'));
    */ 
    const voteTx3 = await gov.submitVote(proposal2Id, true, {from: user1})
    //console.log(voteTx1.logs)
    await expect(voteTx3.logs[0].event).to.be.equal('VoteEmitted')

    const voteTx4 = await gov.submitVote(proposal2Id, true, {from: user2})
    //console.log(voteTx1.logs)
    await expect(voteTx4.logs[0].event).to.be.equal('VoteEmitted')

    // go to end of voting period
    await advanceBlockTo(Number(endBlock + 3 ).toString());
    await expectProposalState(proposal2Id, proposalStates.SUCCEEDED, testEnv);

    // SNAPSHOT: SUCCEEDED PROPOSAL
    snapshots.set('succeeded', await evmSnapshot());

    // Succeeded => Queued:
    const queueTx2 = await gov.queue(proposal2Id, {from: user1});//proposal executionTime is created here - uint256 executionTime = block.timestamp.add(proposal.executor.getDelay())
    await expectProposalState(proposal2Id, proposalStates.QUEUED, testEnv);
    
    // SNAPSHOT: QUEUED PROPOSAL
    executionTime = (await gov.getProposalById(proposal2Id)).executionTime;
    console.log(executionTime, 'proposal 1 execution unix timestamp');
    snapshots.set('queued', await evmSnapshot());

    const blockTime2 = await provider.getBlock(queueTx.blockNumber);

    const execTime2 = blockTime2.timestamp + Number(executionDelay.toString());
    console.log(execTime, 'actual exec unix timestamp')
    console.log(Number(executionDelay.toString()), 'exec delay unix timestamp')
    console.log(blockTime.timestamp, 'block timestamp')

    await advanceBlock(Number(execTime.toString()))

    console.log(gracePeriod, 'grace period')
    //Execute the proposal (If Proposal Queued)
    //will not: execute a canceled proposal; execute a queued proposal before timelock; execute a queued proposal after grace period (expired); 
    // 5 sec before grace period reached
    /* await advanceBlockTo(Number(executionTime + gracePeriod - 5).toString());
    await expect(gov.votingDelay()).to.be.equal(votingDelay)
    //governance: function execute(uint256 proposalId) external payable override {
    const executeTx = await gov.execute(proposal2Id, {from: user1}) //conditions: block.timestamp >= executionTime (checks uint256 executionTime = block.timestamp.add(proposal.executor.getDelay()))
    //gov.execute calls executor.executeTransaction in executorWithTimeLock
    await expect(executeTx.logs[0].event).to.be.equal('ProposalExecuted')
    //after execute, check that voting delay is changed
    expect(await gov.getVotingDelay()).to.be.equal(Number(300)); */


  });


 
  it('', async () => {
  
  })

})