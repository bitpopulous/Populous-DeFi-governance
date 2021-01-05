
const {
    BN,           // Big Number support
    constants,    // Common constants, like the zero address and largest integers
    expectEvent,  // Assertions for emitted events
    expectRevert, // Assertions for transactions that should fail
    time,
} = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const { utils } = require('web3');
const BigNumber = require('bignumber.js');
const PopulousGovernanceV2 = artifacts.require('PopulousGovernanceV2');
const GovernanceStrategy = artifacts.require('GovernanceStrategy');
const MockPPT = artifacts.require('MockPPT');
const MockPXT = artifacts.require('MockPXT');
const Executor = artifacts.require('Executor');
const AaveTokenV2 = artifacts.require('AaveTokenV2');

const {makeSuite, deployGovernanceNoDelay, deployGovernanceWithoutExecutorAsOwner, deployGovernance, 
    initializeMakeSuite, getEthersSigners, getCurrentBlock, deployContract, getContract, getContractWithoutAddress,
    SignerWithAddress, testEnv} = require('./helpers/make-suite');
const {WAD, MAX_UINT_AMOUNT, ONE_ADDRESS, ONE_YEAR, ZERO_ADDRESS, ipfsBytes32Hash} = require('./helpers/constants');

const convertToCurrencyDecimals = async (token_address, amount) => {
    let _token = await Dai.at(token_address);
    let pDecimals = await _token.decimals();
    ////console.log(Number(pDecimals.toString()), 'dai decimals');

    let converted = new BigNumber(10 ** Number(pDecimals.toString()) * amount);
    return converted;
};

contract('Populous Governance V2 and Governance Strategy', async ([deployer, ...users]) => {

    before(async () => {
        //testing helper functions
        const signer = (await getEthersSigners())[0];
        console.log(signer);

        const currentBlock = await getCurrentBlock();
        console.log(currentBlock);

        let helperPPT = await deployContract(MockPPT, [], deployer);
        console.log(helperPPT.address, 'helper');

        let helperPPT_instance = await getContract(MockPPT, helperPPT.address)
        console.log(helperPPT_instance.address, 'helperPPT_instance address')
        //returns contract instance i.e., ABI with .address property. Same as above
        //console.log(await getContractWithoutAddress(MockPPT), 'get helperPPT_instance without address')
    
        await deployGovernance();
    });

    //NOTE - governance strategy makes use of Populous governance power delegationtoken constructs
    //executor is/inherits from proposal validator contract

    it('should deploy governance strategy and governance', async () => {

        //deploy Populous token V2 
        //let Populous = await AaveTokenV2.new({ from: deployer });

        //deploy PPT token - to replace Populous token
        let ppt = await MockPPT.new({ from: deployer });
        //await deployContract('MockPPT')
        //only deployer prints contract created address, using .new() does not
        console.log(ppt.address, 'ppt token address')

        //deploy PXT token - to replace stkPopulous token
        let pxt = await MockPXT.new({ from: deployer });
        console.log(pxt.address, 'pxt token address')


        let Populous = ppt.address; //address Populous, 
        let stkPopulous = pxt.address; //address stkPopulous

        //deploy Governance Strategy - required in Governance deployment
        let governanceStrategy = await GovernanceStrategy.new(
            Populous,
            stkPopulous,
            { from: deployer }
        );
        console.log(governanceStrategy.address, 'governance strategy address')

        //deploy Governance
        let votingDelay = 0; //uint256, 0 = no delay
        let guardian = deployer; //address
        let executors = []; //address[] memory

        let gov = await PopulousGovernanceV2.new(
            governanceStrategy.address,
            votingDelay,
            guardian,
            executors,
            { from: deployer }
        );
        console.log(gov.address, 'governance address')

        //deploy Executor
        const ONE_DAY = 60*60*24; // BigNumber.from('60').mul('60').mul('24');
        let admin = gov.address;
        let delay = '60'; // 60 secs
        let gracePeriod = (ONE_DAY*14).toString(); //ONE_DAY.mul('14').toString();
        let minimumDelay = '0';
        let maximumDelay = (ONE_DAY*30).toString();//ONE_DAY.mul('30').toString();
        let propositionThreshold = '100'; //  1% proposition 
        let voteDuration = '5'; // 5 blocks, to prevent to hang local EVM in testing
        let voteDifferential = '500'; // 5%
        let minimumQuorum = '2000'; // 20%
        let exec = await Executor.new(
            admin,
            delay,
            gracePeriod,
            minimumDelay,
            maximumDelay,
            propositionThreshold,
            voteDuration,
            voteDifferential,
            minimumQuorum,
            {from: deployer}
        );
        console.log(exec.address, 'executor address')
        
        //authorise executor
        await gov.authorizeExecutors([exec.address], {from: deployer});


        //transfer ownership of governance to executor?
        /*
        if (executorAsOwner == 'true') {
            await gov.transferOwnership(exec, {from: deployer});
        } */

        //time passes
        console.log((await time.latestBlock()).toNumber(), 'current block number')
        await time.advanceBlock()
        await time.advanceBlock()
        console.log((await time.latestBlock()).toNumber(), 'current block number')

        //console.log((await time.latestBlock()).toString())
        /* 
        //time passes
        await time.advanceBlock();
        await time.increase(2 * 604800);
        await time.advanceBlock();

        //time passes
        await time.increase(3000);
        const startingBlock = await time.latestBlock();
        const endBlock = startingBlock.addn(100);
        await time.advanceBlockTo(endBlock); 
        */


        console.log(deployer, 'deployers address')
        console.log(users[0], 'users[0] address')

        //mint ppt and pxt for deployer and users 0 to 3
        await ppt.mint("1000"+"00000000", {from: deployer})
        await pxt.mint("1000"+"00000000", {from: deployer})
        
        await ppt.mint("1000"+"00000000", {from: users[0]})
        await pxt.mint("1000"+"00000000", {from: users[0]})

        await ppt.mint("1000"+"00000000", {from: users[1]})
        await pxt.mint("1000"+"00000000", {from: users[1]})

        await ppt.mint("1000"+"00000000", {from: users[2]})
        await pxt.mint("1000"+"00000000", {from: users[2]})
    });


});