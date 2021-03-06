const { expect } = require('chai');
const { ZERO_ADDRESS, getGovernanceActorsAsync } = require('../../helpers/address');
const {expectBignumberEqual} = require('../../helpers/index');
const {deployExecutor, upgradeGovernance} = require('../helpers/deploy');
const {duration, toBN, increaseTo, shouldFailWithMessage, parseEther} = require('../../helpers/utils');
const {findEventInTransaction} = require('../../helpers/events');
const {PROPOSAL_STATES} = require('../../helpers/constants');
const {ethers} = require('ethers');
const {ipfsBytes32Hash, MAX_UINT_AMOUNT} = require('../helpers/constants');
const { advanceBlock } = require('@openzeppelin/test-helpers/src/time');
const { web3 } = require('@openzeppelin/test-helpers/src/setup');
const ExecutorWithTimelock = artifacts.require('ExecutorWithTimelock');

const mintAmount = 1000000 * (10 ** 8);
const votingTokenAmount = mintAmount/2;
const pxtPower = votingTokenAmount * 5;
const pptPower = votingTokenAmount;

describe('Proposal States', () => {
    
    describe('Successful Proposal', () => {

        let 
        governanceInstance,
        votingTokenInstance,
        pptInstance,
        pxtInstance,
        governanceStrategyInstance,
        votingDelay,
        guardian,
        executorInstance,
        proposalTx,
        proposalId;

        before(async () => {
            [
                governanceInstance,
                votingTokenInstance,
                pptInstance,
                pxtInstance,
                governanceStrategyInstance,
                votingDelay,
                guardian,
                executorInstance,
                {
                    owner, 
                    firstUser, 
                    secondUser, 
                    thirdUser, 
                    fourthUser
                }
            ] = await deployExecutor();

            const encodedArgument = ethers.utils.defaultAbiCoder.encode(['address'], [firstUser]);
            
            proposalTx = await governanceInstance.create(
                executorInstance.address, [pptInstance.address], ['0'], 
                ['balanceOf(address)'], [encodedArgument], [false], 
                ipfsBytes32Hash, { from: firstUser });
            
            proposalId = proposalTx.logs[0].args.id;
        });

        it('should move to pending state', async () => {
            expectBignumberEqual(await governanceInstance.getProposalState(proposalId), PROPOSAL_STATES.Pending);
        });


        xit('canceled proposal');


        it('should move to active state', async () => {
            await advanceBlock();
            // no voting delay
            expectBignumberEqual(await governanceInstance.getProposalState(proposalId), PROPOSAL_STATES.Active);
        });

        it('should estimate correct voting outcome for user based on token (PPT) amount', async () => {
            expectBignumberEqual(await governanceInstance.getProposalState(proposalId), PROPOSAL_STATES.Active);

            const mintAmount = 1000000 * (10 ** 8);
            const {owner, firstUser, secondUser, thirdUser, fourthUser} = await getGovernanceActorsAsync();
            for (let user of [firstUser, secondUser, thirdUser, fourthUser]) {
                expectBignumberEqual(await pptInstance.balanceOf(user), mintAmount);
                expectBignumberEqual(await pxtInstance.balanceOf(user), mintAmount);
            }

            const outcome = await governanceInstance.getVotingOutcome(
                pptInstance.address, votingTokenAmount,
                proposalId, true, {from: thirdUser});
            
            expectBignumberEqual(outcome[1], pptPower); // ppt issued x1 of voting token
            expectBignumberEqual(outcome[2], 0);
        });


        it('should estimate correct voting outcome for user based on token (PXT) amount', async () => {
            expectBignumberEqual(await governanceInstance.getProposalState(proposalId), PROPOSAL_STATES.Active);

            const mintAmount = 1000000 * (10 ** 8);
            const {owner, firstUser, secondUser, thirdUser, fourthUser} = await getGovernanceActorsAsync();
            for (let user of [firstUser, secondUser, thirdUser, fourthUser]) {
                expectBignumberEqual(await pptInstance.balanceOf(user), mintAmount);
                expectBignumberEqual(await pxtInstance.balanceOf(user), mintAmount);
            }

            const outcome = await governanceInstance.getVotingOutcome(
                pxtInstance.address, votingTokenAmount,
                proposalId, false, {from: secondUser});
            
            expectBignumberEqual(outcome[1], 0); // ppt issued x1 of voting token
            expectBignumberEqual(outcome[2], pxtPower);
        });

        it('should vote and move to succeeded state', async () => {
            expectBignumberEqual(await governanceInstance.getProposalState(proposalId), PROPOSAL_STATES.Active);
            
            

            // voting duration is 5 blocks, 5 mined TXs on ganache 
            // (one await advanceBlock(); in active test above) to get proposal from pending to active

            // 3 votes for with different tokens        
            await governanceInstance.submitVote(
                pxtInstance.address, votingTokenAmount,
                proposalId, true, {from: firstUser}
            )

            await governanceInstance.submitVote(
                pptInstance.address, votingTokenAmount,
                proposalId, true, {from: secondUser}
            )

            await governanceInstance.submitVote(
                pxtInstance.address, votingTokenAmount,
                proposalId, true, {from: thirdUser}
            )

            // 1 vote against
            await governanceInstance.submitVote(
                pxtInstance.address, votingTokenAmount,
                proposalId, false, {from: fourthUser}
            )

            const proposal = await governanceInstance.getProposalById(proposalId);

            // check locked PXT/PPT tokens and amount
            const fourthUserLockedTokens = await governanceInstance.getLockedTokens(proposalId, fourthUser);
            // check vote struct for voter support and voting power
            const fourthUserVotes = await governanceInstance.getVoteOnProposal(proposalId, fourthUser);
            
            expectBignumberEqual(fourthUserLockedTokens.amount, votingTokenAmount);
            expect(fourthUserLockedTokens.tokenAddress).to.be.equal(pxtInstance.address);
            expectBignumberEqual(fourthUserVotes.votingPower, pxtPower);
            expect(fourthUserVotes.support).to.be.equal(false);

            await advanceBlock();

            expectBignumberEqual(await governanceInstance.getProposalState(proposalId), PROPOSAL_STATES.Succeeded);

        });

        it('should move to queued state and allow any user to call queue', async () => {
            expectBignumberEqual(await governanceInstance.getProposalState(proposalId), PROPOSAL_STATES.Succeeded);

            //must have succeeded before queue
            await governanceInstance.queue(proposalId, {from: firstUser});

            expectBignumberEqual(await governanceInstance.getProposalState(proposalId), PROPOSAL_STATES.Queued);

        });


        it('should move to expired state if not executed before the end of grace period', async () => {
            expectBignumberEqual(await governanceInstance.getProposalState(proposalId), PROPOSAL_STATES.Queued);
            
            const proposal = await governanceInstance.getProposalById(proposalId);
            //must be queued - look at executor with time lock for times
            
            await increaseTo(proposal.executionTime);

            //Execute the proposal (If Proposal Queued)
            //will not: execute a canceled proposal; 
            //will not: execute a queued proposal before timelock; 
            //will not: execute a queued proposal after grace period (expired); 
            
            // 5 sec before grace period reached
            //await advanceBlockTo(executionTime + gracePeriod - 5);

            //conditions: block.timestamp >= executionTime (checks uint256 executionTime = block.timestamp.add(proposal.executor.getDelay()))
            const executeTx = await governanceInstance.execute(proposalId, {from: firstUser}) 
            //governanceInstance.execute calls executor.executeTransaction in executorWithTimeLock
            expectBignumberEqual(await governanceInstance.getProposalState(proposalId), PROPOSAL_STATES.Executed);
            
            const {args} = await findEventInTransaction(executeTx, 'ProposalExecuted');

            expectBignumberEqual(args.id, proposalId);

        });


        it('redeem locked tokens from proposal', async () => {
            const mintAmount = 1000000 * (10 ** 8);
            const fourthUserLockedTokens = await governanceInstance.getLockedTokens(proposalId, fourthUser);
            // check vote struct for voter support and voting power
            const fourthUserVotes = await governanceInstance.getVoteOnProposal(proposalId, fourthUser);
            
            expectBignumberEqual(fourthUserLockedTokens.amount, votingTokenAmount);
            expect(fourthUserLockedTokens.tokenAddress).to.be.equal(pxtInstance.address);
            expectBignumberEqual(fourthUserVotes.votingPower, pxtPower);
            expect(fourthUserVotes.support).to.be.equal(false);

            expectBignumberEqual(await pxtInstance.balanceOf(fourthUser), votingTokenAmount);
            expectBignumberEqual(await votingTokenInstance.balanceOf(fourthUser), pxtPower);

            await governanceInstance.redeemLockedTokens(proposalId, {from: fourthUser});
        
            expectBignumberEqual(await pxtInstance.balanceOf(fourthUser), mintAmount);
            expectBignumberEqual(await votingTokenInstance.balanceOf(fourthUser), 0);

        });

    })



    describe('Failed Proposal', () => {
        
        let 
        governanceInstance,
        votingTokenInstance,
        pptInstance,
        pxtInstance,
        governanceStrategyInstance,
        votingDelay,
        guardian,
        executorInstance,
        proposalTx,
        proposalId;

        before(async () => {
            [
                governanceInstance,
                votingTokenInstance,
                pptInstance,
                pxtInstance,
                governanceStrategyInstance,
                votingDelay,
                guardian,
                executorInstance,
                {
                    owner, 
                    firstUser, 
                    secondUser, 
                    thirdUser, 
                    fourthUser
                }
            ] = await deployExecutor();

            const encodedArgument = ethers.utils.defaultAbiCoder.encode(['address'], [firstUser]);
            
            proposalTx = await governanceInstance.create(
                executorInstance.address, [pptInstance.address], ['0'], 
                ['balanceOf(address)'], [encodedArgument], [false], 
                ipfsBytes32Hash, { from: firstUser });
            
            proposalId = proposalTx.logs[0].args.id;
        });

        it('should move to pending state', async () => {
            expectBignumberEqual(await governanceInstance.getProposalState(proposalId), PROPOSAL_STATES.Pending);
        });

        it('should move to active state', async () => {
            await advanceBlock();
            // no voting delay
            expectBignumberEqual(await governanceInstance.getProposalState(proposalId), PROPOSAL_STATES.Active);
        });

        it('should estimate correct voting outcome for user based on token (PPT) amount', async () => {
            expectBignumberEqual(await governanceInstance.getProposalState(proposalId), PROPOSAL_STATES.Active);

            const mintAmount = 1000000 * (10 ** 8);
            const {owner, firstUser, secondUser, thirdUser, fourthUser} = await getGovernanceActorsAsync();
            for (let user of [firstUser, secondUser, thirdUser, fourthUser]) {
                expectBignumberEqual(await pptInstance.balanceOf(user), mintAmount);
                expectBignumberEqual(await pxtInstance.balanceOf(user), mintAmount);
            }

            const outcome = await governanceInstance.getVotingOutcome(
                pptInstance.address, votingTokenAmount,
                proposalId, true, {from: thirdUser});
            
            expectBignumberEqual(outcome[1], pptPower); // ppt issued x2 of voting token
            expectBignumberEqual(outcome[2], 0);
        });


        it('should estimate correct voting outcome for user based on token (PXT) amount', async () => {
            expectBignumberEqual(await governanceInstance.getProposalState(proposalId), PROPOSAL_STATES.Active);

            const mintAmount = 1000000 * (10 ** 8);
            const {owner, firstUser, secondUser, thirdUser, fourthUser} = await getGovernanceActorsAsync();
            for (let user of [firstUser, secondUser, thirdUser, fourthUser]) {
                expectBignumberEqual(await pptInstance.balanceOf(user), mintAmount);
                expectBignumberEqual(await pxtInstance.balanceOf(user), mintAmount);
            }

            const outcome = await governanceInstance.getVotingOutcome(
                pxtInstance.address, votingTokenAmount,
                proposalId, false, {from: secondUser});
            
            expectBignumberEqual(outcome[0], pxtPower)
            expectBignumberEqual(outcome[1], 0); // ppt issued x1 of voting token
            expectBignumberEqual(outcome[2], pxtPower);
        });

        it('should vote and move to failed state', async () => {
            expectBignumberEqual(await governanceInstance.getProposalState(proposalId), PROPOSAL_STATES.Active);
            
            const mintAmount = 1000000 * (10 ** 8);

            // voting duration is 5 blocks, 5 mined TXs on ganache 
            // (one await advanceBlock(); in active test above) to get proposal from pending to active

            // 3 votes for with different tokens        
            await governanceInstance.submitVote(
                pxtInstance.address, votingTokenAmount,
                proposalId, false, {from: firstUser}
            )
        
            const outcome = await governanceInstance.getVotingOutcome(
                pptInstance.address, votingTokenAmount,
                proposalId, false, {from: secondUser});
            
            expectBignumberEqual(outcome[0], pptPower)
            expectBignumberEqual(outcome[1], 0);
            expectBignumberEqual(outcome[2], pptPower+pxtPower); // against votes / power

            await governanceInstance.submitVote(
                pptInstance.address, votingTokenAmount,
                proposalId, false, {from: secondUser}
            )

            await governanceInstance.submitVote(
                pxtInstance.address, votingTokenAmount,
                proposalId, false, {from: thirdUser}
            )

            // 1 vote against
            await governanceInstance.submitVote(
                pxtInstance.address, votingTokenAmount,
                proposalId, true, {from: fourthUser}
            )

            const proposal = await governanceInstance.getProposalById(proposalId);

            // check locked PXT/PPT tokens and amount
            const fourthUserLockedTokens = await governanceInstance.getLockedTokens(proposalId, fourthUser);
            // check vote struct for voter support and voting power
            const fourthUserVotes = await governanceInstance.getVoteOnProposal(proposalId, fourthUser);
            
            expectBignumberEqual(fourthUserLockedTokens.amount, votingTokenAmount);
            expect(fourthUserLockedTokens.tokenAddress).to.be.equal(pxtInstance.address);
            expectBignumberEqual(fourthUserVotes.votingPower, pxtPower);
            expect(fourthUserVotes.support).to.be.equal(true);

            await advanceBlock();

            expectBignumberEqual(await governanceInstance.getProposalState(proposalId), PROPOSAL_STATES.Failed);
        });

    })



    describe('Failed Proposal Without Votes', () => {
        
        let 
        governanceInstance,
        votingTokenInstance,
        pptInstance,
        pxtInstance,
        governanceStrategyInstance,
        votingDelay,
        guardian,
        executorInstance,
        proposalTx,
        proposalId;

        before(async () => {
            [
                governanceInstance,
                votingTokenInstance,
                pptInstance,
                pxtInstance,
                governanceStrategyInstance,
                votingDelay,
                guardian,
                executorInstance,
                {
                    owner, 
                    firstUser, 
                    secondUser, 
                    thirdUser, 
                    fourthUser
                }
            ] = await deployExecutor();

            const encodedArgument = ethers.utils.defaultAbiCoder.encode(['address'], [firstUser]);
            
            proposalTx = await governanceInstance.create(
                executorInstance.address, [pptInstance.address], ['0'], 
                ['balanceOf(address)'], [encodedArgument], [false], 
                ipfsBytes32Hash, { from: firstUser });
            
            proposalId = proposalTx.logs[0].args.id;
        });

        it('should move to pending state', async () => {
            expectBignumberEqual(await governanceInstance.getProposalState(proposalId), PROPOSAL_STATES.Pending);
        });

        it('should move to active state', async () => {
            await advanceBlock();
            // no voting delay
            expectBignumberEqual(await governanceInstance.getProposalState(proposalId), PROPOSAL_STATES.Active);
        });

        it('should move to failed state', async () => {
            
            expectBignumberEqual(await governanceInstance.getProposalState(proposalId), PROPOSAL_STATES.Active);
            
            // voting duration is 5 blocks
            await advanceBlock();
            await advanceBlock();
            await advanceBlock();
            await advanceBlock();
            await advanceBlock();

            await advanceBlock();
            expectBignumberEqual(await governanceInstance.getProposalState(proposalId), PROPOSAL_STATES.Failed);
        });

    })


    describe('Expired Proposal', () => {
        
        let 
        governanceInstance,
        votingTokenInstance,
        pptInstance,
        pxtInstance,
        governanceStrategyInstance,
        votingDelay,
        guardian,
        executorInstance,
        proposalTx,
        proposalId;

        before(async () => {
            [
                governanceInstance,
                votingTokenInstance,
                pptInstance,
                pxtInstance,
                governanceStrategyInstance,
                votingDelay,
                guardian,
                executorInstance,
                {
                    owner, 
                    firstUser, 
                    secondUser, 
                    thirdUser, 
                    fourthUser
                }
            ] = await deployExecutor();

            const encodedArgument = ethers.utils.defaultAbiCoder.encode(['address'], [firstUser]);
            
            proposalTx = await governanceInstance.create(
                executorInstance.address, [pptInstance.address], ['0'], 
                ['balanceOf(address)'], [encodedArgument], [false], 
                ipfsBytes32Hash, { from: firstUser });
            
            proposalId = proposalTx.logs[0].args.id;
        });

        it('should move to pending state', async () => {
            expectBignumberEqual(await governanceInstance.getProposalState(proposalId), PROPOSAL_STATES.Pending);
        });


        xit('canceled proposal');


        it('should move to active state', async () => {
            await advanceBlock();
            // no voting delay
            expectBignumberEqual(await governanceInstance.getProposalState(proposalId), PROPOSAL_STATES.Active);
        });

        it('should estimate correct voting outcome for user based on token (PPT) amount', async () => {
            expectBignumberEqual(await governanceInstance.getProposalState(proposalId), PROPOSAL_STATES.Active);

            const mintAmount = 1000000 * (10 ** 8);
            const {owner, firstUser, secondUser, thirdUser, fourthUser} = await getGovernanceActorsAsync();
            for (let user of [firstUser, secondUser, thirdUser, fourthUser]) {
                expectBignumberEqual(await pptInstance.balanceOf(user), mintAmount);
                expectBignumberEqual(await pxtInstance.balanceOf(user), mintAmount);
            }

            const outcome = await governanceInstance.getVotingOutcome(
                pptInstance.address, votingTokenAmount,
                proposalId, true, {from: thirdUser});
            
            expectBignumberEqual(outcome[1], pptPower); // ppt issued x1 of voting token
            expectBignumberEqual(outcome[2], 0);
        });


        it('should estimate correct voting outcome for user based on token (PXT) amount', async () => {
            expectBignumberEqual(await governanceInstance.getProposalState(proposalId), PROPOSAL_STATES.Active);

            const mintAmount = 1000000 * (10 ** 8);
            const {owner, firstUser, secondUser, thirdUser, fourthUser} = await getGovernanceActorsAsync();
            for (let user of [firstUser, secondUser, thirdUser, fourthUser]) {
                expectBignumberEqual(await pptInstance.balanceOf(user), mintAmount);
                expectBignumberEqual(await pxtInstance.balanceOf(user), mintAmount);
            }

            const outcome = await governanceInstance.getVotingOutcome(
                pxtInstance.address, votingTokenAmount,
                proposalId, false, {from: secondUser});
            
            expectBignumberEqual(outcome[1], 0); // ppt issued x1 of voting token
            expectBignumberEqual(outcome[2], pxtPower);
        });

        it('should vote and move to succeeded state', async () => {
            expectBignumberEqual(await governanceInstance.getProposalState(proposalId), PROPOSAL_STATES.Active);
            
            

            // voting duration is 5 blocks, 5 mined TXs on ganache 
            // (one await advanceBlock(); in active test above) to get proposal from pending to active

            // 3 votes for with different tokens        
            await governanceInstance.submitVote(
                pxtInstance.address, votingTokenAmount,
                proposalId, true, {from: firstUser}
            )

            await governanceInstance.submitVote(
                pptInstance.address, votingTokenAmount,
                proposalId, true, {from: secondUser}
            )

            await governanceInstance.submitVote(
                pxtInstance.address, votingTokenAmount,
                proposalId, true, {from: thirdUser}
            )

            // 1 vote against
            await governanceInstance.submitVote(
                pxtInstance.address, votingTokenAmount,
                proposalId, false, {from: fourthUser}
            )

            const proposal = await governanceInstance.getProposalById(proposalId);

            // check locked PXT/PPT tokens and amount
            const fourthUserLockedTokens = await governanceInstance.getLockedTokens(proposalId, fourthUser);
            // check vote struct for voter support and voting power
            const fourthUserVotes = await governanceInstance.getVoteOnProposal(proposalId, fourthUser);
            
            expectBignumberEqual(fourthUserLockedTokens.amount, votingTokenAmount);
            expect(fourthUserLockedTokens.tokenAddress).to.be.equal(pxtInstance.address);
            expectBignumberEqual(fourthUserVotes.votingPower, pxtPower);
            expect(fourthUserVotes.support).to.be.equal(false);

            await advanceBlock();

            expectBignumberEqual(await governanceInstance.getProposalState(proposalId), PROPOSAL_STATES.Succeeded);

        });

        it('should move to queued state and allow any user to call queue', async () => {
            expectBignumberEqual(await governanceInstance.getProposalState(proposalId), PROPOSAL_STATES.Succeeded);

            //must have succeeded before queue
            await governanceInstance.queue(proposalId, {from: firstUser});

            expectBignumberEqual(await governanceInstance.getProposalState(proposalId), PROPOSAL_STATES.Queued);

        });


        it('should execute proposal and allow any user to call execute', async () => {
            expectBignumberEqual(await governanceInstance.getProposalState(proposalId), PROPOSAL_STATES.Queued);
            
            const proposal = await governanceInstance.getProposalById(proposalId);
            //must be queued - look at executor with time lock for times
            
            await increaseTo(proposal.executionTime);

            ONE_DAY = 60*60*24; // BigNumber.from('60').mul('60').mul('24');
        
            delay = '60'; // 60 secs // minimum time between queueing and execution of proposal
            gracePeriod = (ONE_DAY*14).toString(); //ONE_DAY.mul('14').toString();

            await increaseTo(toBN(proposal.executionTime).add(toBN(gracePeriod).add(toBN(1))));

            expectBignumberEqual(await governanceInstance.getProposalState(proposalId), PROPOSAL_STATES.Expired);
        });


        it('redeem locked tokens from proposal', async () => {
            const mintAmount = 1000000 * (10 ** 8);
            const fourthUserLockedTokens = await governanceInstance.getLockedTokens(proposalId, fourthUser);
            // check vote struct for voter support and voting power
            const fourthUserVotes = await governanceInstance.getVoteOnProposal(proposalId, fourthUser);
            
            expectBignumberEqual(fourthUserLockedTokens.amount, votingTokenAmount);
            expect(fourthUserLockedTokens.tokenAddress).to.be.equal(pxtInstance.address);
            expectBignumberEqual(fourthUserVotes.votingPower, pxtPower);
            expect(fourthUserVotes.support).to.be.equal(false);

            expectBignumberEqual(await pxtInstance.balanceOf(fourthUser), votingTokenAmount);
            expectBignumberEqual(await votingTokenInstance.balanceOf(fourthUser), pxtPower);

            const governanceV2Instance = await upgradeGovernance(governanceInstance.address);

            //await governanceInstance.redeemLockedTokens(proposalId, {from: fourthUser});
            await shouldFailWithMessage(
                governanceV2Instance.payToRedeemLockedTokens(proposalId, {from: fourthUser}),
                "Governance: payToRedeemLockedTokens: msg.value is not above 0"
            );

            await governanceV2Instance.payToRedeemLockedTokens(proposalId, {from: fourthUser, value: parseEther('0.1')});

            expectBignumberEqual(await pxtInstance.balanceOf(fourthUser), mintAmount);
            expectBignumberEqual(await votingTokenInstance.balanceOf(fourthUser), 0);

        });

    })

})