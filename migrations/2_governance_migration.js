const MockPPT = artifacts.require('MockPPT');
const MockPXT = artifacts.require('MockPXT');
const GovernanceStrategy = artifacts.require('GovernanceStrategy');
const PopulousGovernanceV2 = artifacts.require('PopulousGovernanceV2');
const Executor = artifacts.require('Executor');
const MockVotingToken = artifacts.require('MockVotingToken');


module.exports = function (deployer, network, accounts) {
    // Using the accounts within the migrations.
    const [root, alice, bob, carl] = accounts;

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
            await deployer.deploy(
                PopulousGovernanceV2, 
                votingToken,
                ppt,
                pxt,
                (await GovernanceStrategy.deployed()).address,
                votingDelay,
                guardian,
                executors
            )

            // voting token admin
            const votingTokenInstance = await MockVotingToken.at(votingToken);
            const governanceInstance = await PopulousGovernanceV2.deployed();
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

        
        

    }

}