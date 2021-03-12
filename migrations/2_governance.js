//const { exec } = require("child_process");

const PopulousGovernanceV2 = artifacts.require('PopulousGovernanceV2');
const GovernanceStrategy = artifacts.require('GovernanceStrategy');
const MockPPT = artifacts.require('MockPPT');
const MockPXT = artifacts.require('MockPXT');
const Executor = artifacts.require('Executor');
const PPTWrapper = artifacts.require('PPTWrapper');
const PXTWrapper = artifacts.require('PXTWrapper');

//const BigNumber = require('bignumber.js');

module.exports = function (deployer, network, accounts) {
    // Using the accounts within the migrations.
    const [root, alice, bob, carl, mike] = accounts;

    if (network == "development") {
        // Do something specific to the network named "development".
        deployer.then(async () => {

            //deploy PPT token - to replace Populous token
            let ppt = await deployer.deploy(MockPPT);
            //only deployer prints contract created address
            //let ppt = await MockPPT.new();
            //console.log(ppt.address, 'ppt token address')

            //deploy PXT token - to replace stkPopulous token
            let pxt = await deployer.deploy(MockPXT);

            //assign Populous and stkPopulous ERC-20 token addresses
            let Populous = ppt.address; //address Populous, 
            let stkPopulous = pxt.address; //address stkPopulous
            let pptWeight = '2';
            let pxtWeight = '1';
            //deploy Governance Strategy 
            let governanceStrategy = await deployer.deploy(
                GovernanceStrategy,
                Populous, 
                stkPopulous, 
                pptWeight,
                pxtWeight, 
                {from: root, overwrite: true}
            );

            //deploy Governance v2
            let votingDelay = 0; //uint256 - no delay
            let guardian = root; //address
            let executors = []; //address[] memory
            let gov = await deployer.deploy(
                PopulousGovernanceV2,
                governanceStrategy.address, 
                votingDelay, 
                guardian, 
                executors, //can be empty array if executor will not be given ownership
                {from: root, overwrite: true}
            );

            //deploy mock PopulousV2 token

            //deploy mock StkPopulousV2

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
            let exec = await deployer.deploy(
                Executor,
                admin,
                delay,
                gracePeriod,
                minimumDelay,
                maximumDelay,
                propositionThreshold,
                voteDuration,
                voteDifferential,
                minimumQuorum,
                {from: root, overwrite: true}
            );

            //authorise executor
            await gov.authorizeExecutors([exec.address], {from: root});

            //transfer ownership of governance to executor?
            /*
            if (executorAsOwner == 'true') {
                await gov.transferOwnership(exec, {from: deployer});
            } */

        });
    } else {
        deployer.then(async () => {
            //ROPSTEN DEPLOYMENT

            //root address in alchemy is different from infura
            //not using root here

            //deploy PPT token - to replace Populous token
            let pptWrapper = await deployer.deploy(PPTWrapper);
            //only deployer prints contract created address
            //let ppt = await MockPPT.new();
            //console.log(ppt.address, 'ppt token address')

            //deploy PXT token - to replace stkPopulous token
            let pxtWrapper = await deployer.deploy(PXTWrapper);

            //assign Populous and stkPopulous ERC-20 token addresses
            let Populous = pptWrapper.address; //address Populous, 
            let stkPopulous = pxtWrapper.address; //address stkPopulous
            let pptWeight = '2';
            let pxtWeight = '1';
            //deploy Governance Strategy 
            let governanceStrategy = await deployer.deploy(
                GovernanceStrategy,
                Populous, 
                stkPopulous, 
                pptWeight,
                pxtWeight,
            );

            //deploy Governance v2
            let votingDelay = 0; //uint256 - no delay
            let guardian = root; //address
            let executors = []; //address[] memory
            let gov = await deployer.deploy(
                PopulousGovernanceV2,
                governanceStrategy.address, 
                votingDelay, 
                guardian, 
                executors, //can be empty array if executor will not be given ownership
            );

            //deploy mock PopulousV2 token = ppt

            //deploy mock StkPopulousV2 = pxt

            //deploy Executor
            const ONE_DAY = 60*60*24; // BigNumber.from('60').mul('60').mul('24');
            let admin = gov.address;
            let delay = '60'; // 60 secs
            let gracePeriod = (ONE_DAY*14).toString(); //ONE_DAY.mul('14').toString();
            let minimumDelay = '0';
            let maximumDelay = (ONE_DAY*30).toString();//ONE_DAY.mul('30').toString();
            let propositionThreshold = '100'; //  1% proposition 
            let voteDuration = '20'; // 20 blocks
            let voteDifferential = '500'; // 5%
            let minimumQuorum = '2000'; // 20%
            let exec = await deployer.deploy(
                Executor,
                admin,
                delay,
                gracePeriod,
                minimumDelay,
                maximumDelay,
                propositionThreshold,
                voteDuration,
                voteDifferential,
                minimumQuorum,
            );

            //authorise executor
            await gov.authorizeExecutors([exec.address]);

            //transfer ownership of governance to executor?
            /*
            if (executorAsOwner == 'true') {
                await gov.transferOwnership(exec, {from: deployer});
            } */

        });
    }

};