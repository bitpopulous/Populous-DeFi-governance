//const { exec } = require("child_process");

const AaveGovernanceV2 = artifacts.require('AaveGovernanceV2');
const GovernanceStrategy = artifacts.require('GovernanceStrategy');
const MockPPT = artifacts.require('MockPPT');
const MockPXT = artifacts.require('MockPXT');
const Executor = artifacts.require('Executor');
//const BigNumber = require('bignumber.js');

module.exports = function (deployer, network, accounts) {
    // Using the accounts within the migrations.
    const [root, alice, bob, carl, mike] = accounts;

    if (network == "development" ) {
        // Do something specific to the network named "development".
        deployer.then(async () => {

            //deploy PPT token - to replace Aave token
            let ppt = await deployer.deploy(MockPPT);
            //only deployer prints contract created address
            //let ppt = await MockPPT.new();
            //console.log(ppt.address, 'ppt token address')

            //deploy PXT token - to replace stkAAVE token
            let pxt = await deployer.deploy(MockPXT);

            //assign AAVE and stkAave ERC-20 token addresses
            let aave = ppt.address; //address aave, 
            let stkAave = pxt.address; //address stkAave

            //deploy Governance Strategy 
            let governanceStrategy = await deployer.deploy(
                GovernanceStrategy,
                aave, 
                stkAave, 
                {from: root, overwrite: true}
            );

            //deploy Governance v2
            let votingDelay = 0; //uint256 - no delay
            let guardian = root; //address
            let executors = []; //address[] memory
            let gov = await deployer.deploy(
                AaveGovernanceV2,
                governanceStrategy.address, 
                votingDelay, 
                guardian, 
                executors, //can be empty array if executor will not be given ownership
                {from: root, overwrite: true}
            );

            //deploy mock AaveV2 token

            //deploy mock StkAaveV2

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
            //await gov.authorizeExecutors([exec.address], {from: deployer});

            //transfer ownership of governance to executor?
            /*
            if (executorAsOwner == 'true') {
                await gov.transferOwnership(exec, {from: deployer});
            } */


            //deploy FlashAttacks? (in helpers/contracts-deployments.js)
        });
    } else {

    }

};