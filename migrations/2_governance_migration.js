const MockPPT = artifacts.require('MockPPT');
const MockPXT = artifacts.require('MockPXT');
const GovernanceStrategy = artifacts.require('GovernanceStrategy');
const PopulousGovernanceV2 = artifacts.require('PopulousGovernanceV2');
const PopulousGovernanceV3 = artifacts.require('PopulousGovernanceV3');
const Executor = artifacts.require('Executor');
const MockVotingToken = artifacts.require('MockVotingToken');
const PopulousGovernanceToken = artifacts.require('PopulousGovernanceToken');
const { deployProxy, prepareUpgrade, upgradeProxy } = require('@openzeppelin/truffle-upgrades');


module.exports = function (deployer, network, accounts) {
    // Using the accounts within the migrations.

    if (network == "ropsten") {

        deployer.then(async () => {
            let ppt;
            let pxt;
            let votingToken;

            // governance strategy
            const votingDelay = 0;
            const guardian = '0xC6561dF9180a8863fA9a16aB376eFbca17166CF4';
            const executors = [];


            // mock PPT
            /* await deployer.deploy(MockPPT);
            ppt = (await MockPPT.deployed()).address; */

            // mock PXT
            /* await deployer.deploy(MockPXT);
            pxt = (await MockPXT.deployed()).address; */

            // mock votingToken
            /* await deployer.deploy(MockVotingToken);
            votingToken = (await MockVotingToken.deployed()).address; */

            ppt = '0xb98D0E430175f343D43DfC113E8b31F49F71892d';
            pxt = '0x9510D07aa3B3394D2236dF039C5292C063D12487';
            votingToken = '0x3772FfAA0C1FA1e25ED67572ADf1e982776115be';

            // governance strategy
            await deployer.deploy(GovernanceStrategy, pxt, ppt, votingToken);

            // governance
            /* await deployer.deploy(
                PopulousGovernanceV2, 
                votingToken,
                ppt,
                pxt,
                (await GovernanceStrategy.deployed()).address,
                votingDelay,
                guardian,
                executors
            ) */

            await deployProxy(
                PopulousGovernanceV2, 
                [
                    votingToken,
                    ppt,
                    pxt,
                    (await GovernanceStrategy.deployed()).address,
                    votingDelay,
                    guardian,
                    executors
                ],
                { deployer, initializer: 'initialize' }
            )
            const governanceInstance = await PopulousGovernanceV2.deployed();
            console.log('Governance V1 contract: ', governanceInstance.address);


            // voting token admin
            const votingTokenInstance = await MockVotingToken.at(votingToken);
            await votingTokenInstance.setAdmin(
                governanceInstance.address
            );
        
            let ONE_DAY = 60*60*24, // BigNumber.from('60').mul('60').mul('24');
            admin = governanceInstance.address,
            delay = '60', // 60 secs // minimum time between queueing and execution of proposal
            gracePeriod = (ONE_DAY*14).toString(), //ONE_DAY.mul('14').toString();
            minimumDelay = '0',
            maximumDelay = (ONE_DAY*30).toString(),//ONE_DAY.mul('30').toString();
            propositionThreshold = '100', //  1% proposition 
            voteDuration = '7200', // 5 days = 7200 blocks - 1 block per minute on ropsten
            voteDifferential = '500', // 5%
            minimumQuorum = '2000'; // 20%

            await deployer.deploy(
                Executor,
                admin,
                delay,
                gracePeriod,
                minimumDelay,
                maximumDelay,
                propositionThreshold,
                voteDuration,
                voteDifferential,
                minimumQuorum
            )
            
            const executorInstance = await Executor.deployed();
            await governanceInstance.authorizeExecutors(
                [executorInstance.address] 
            );
        })
    } else if (network == "development") {
        deployer.then(async () => {
            let ppt;
            let pxt;
            let votingToken;

            // governance strategy
            const votingDelay = 0;
            const guardian = accounts[0];
            const executors = [];

            // mock PPT
            await deployer.deploy(MockPPT);
            ppt = (await MockPPT.deployed()).address;

            // mock PXT
            await deployer.deploy(MockPXT);
            //await deployProxy(MockPXT, [3], {deployer, initializer: 'mint'})
            pxt = (await MockPXT.deployed()).address;

            // mock votingToken
            await deployer.deploy(PopulousGovernanceToken);
            votingToken = (await PopulousGovernanceToken.deployed()).address;

            // governance strategy
            await deployer.deploy(GovernanceStrategy, pxt, ppt, votingToken);

            // governance
            await deployProxy(
                PopulousGovernanceV2, 
                [
                    votingToken,
                    ppt,
                    pxt,
                    (await GovernanceStrategy.deployed()).address,
                    votingDelay,
                    guardian,
                    executors
                ],
                { deployer, initializer: 'initialize' }
            )

            const governanceInstance = await PopulousGovernanceV2.deployed();
            console.log('Governance V1 contract: ', governanceInstance.address);

            // voting token admin
            const votingTokenInstance = await MockVotingToken.at(votingToken);
            await votingTokenInstance.setAdmin(
                governanceInstance.address
            );
        
            let ONE_DAY = 60*60*24, // BigNumber.from('60').mul('60').mul('24');
            admin = governanceInstance.address,
            delay = '60', // 60 secs // minimum time between queueing and execution of proposal
            gracePeriod = (ONE_DAY*14).toString(), //ONE_DAY.mul('14').toString();
            minimumDelay = '0',
            maximumDelay = (ONE_DAY*30).toString(),//ONE_DAY.mul('30').toString();
            propositionThreshold = '100', //  1% proposition 
            voteDuration = '7200', // 5 days = 7200 blocks - 1 block per minute on ropsten
            voteDifferential = '500', // 5%
            minimumQuorum = '2000'; // 20%

            await deployer.deploy(
                Executor,
                admin,
                delay,
                gracePeriod,
                minimumDelay,
                maximumDelay,
                propositionThreshold,
                voteDuration,
                voteDifferential,
                minimumQuorum
            )
            
            const executorInstance = await Executor.deployed();
            await governanceInstance.authorizeExecutors(
                [executorInstance.address] 
            );

            /* console.log(await governance.getGuardian(), 'guardian before change')
            await governance.initialize(
            votingToken,
                    ppt,
                    pxt,
                    (await GovernanceStrategy.deployed()).address,
                    votingDelay,
                    accounts[1],
                    executors, {from: accounts[1]})
            console.log(await governance.getGuardian(), 'guardian after change')
 */
        })
    } else if (network == "live") {
        deployer.then(async () => {
            let ppt;
            let pxt;
            let votingToken;

            // governance strategy
            const votingDelay = 0;
            const guardian = "0x70393B06D018e148B593A91E022EA73071c17007";
            const executors = [];

            // PPT
            ppt = "0xd4fa1460F537bb9085d22C7bcCB5DD450Ef28e3a";

            // PXT
            pxt = "0xc14830E53aA344E8c14603A91229A0b925b0B262";

            // votingToken
            await deployer.deploy(PopulousGovernanceToken);
            votingToken = (await PopulousGovernanceToken.deployed()).address;

            // governance strategy
            await deployer.deploy(GovernanceStrategy, pxt, ppt, votingToken);

            // governance
            await deployProxy(
                PopulousGovernanceV2, 
                [
                    votingToken,
                    ppt,
                    pxt,
                    (await GovernanceStrategy.deployed()).address,
                    votingDelay,
                    guardian,
                    executors
                ],
                { deployer, initializer: 'initialize' }
            )

            const governanceInstance = await PopulousGovernanceV2.deployed();
            console.log('Governance V1 contract: ', governanceInstance.address);

            // voting token admin
            const votingTokenInstance = await PopulousGovernanceToken.at(votingToken);
            await votingTokenInstance.setAdmin(
                governanceInstance.address
            );
        
            let ONE_DAY = 60*60*24, // BigNumber.from('60').mul('60').mul('24');
            admin = governanceInstance.address,
            delay = '60', // 60 secs // minimum time between queueing and execution of proposal
            gracePeriod = (ONE_DAY*14).toString(), //ONE_DAY.mul('14').toString();
            minimumDelay = '0',
            maximumDelay = (ONE_DAY*30).toString(),//ONE_DAY.mul('30').toString();
            propositionThreshold = '100', //  1% proposition 
            voteDuration = '17200', // 17200 blocks
            voteDifferential = '500', // 5%
            minimumQuorum = '2000'; // 20%

            await deployer.deploy(
                Executor,
                admin,
                delay,
                gracePeriod,
                minimumDelay,
                maximumDelay,
                propositionThreshold,
                voteDuration,
                voteDifferential,
                minimumQuorum
            )
            
            const executorInstance = await Executor.deployed();
            await governanceInstance.authorizeExecutors(
                [executorInstance.address] 
            );

        })
    }

}