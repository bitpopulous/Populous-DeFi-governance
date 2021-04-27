const { expect } = require('chai');
const { ZERO_ADDRESS } = require('../../helpers/address');
const {expectBignumberEqual} = require('../../helpers/index');
const {
    deployExecutor
} = require('../helpers/deploy');
const {duration, toBN, advanceBlock, latest} = require('../../helpers/utils');
const {ethers} = require('ethers');
const {ipfsBytes32Hash} = require('../helpers/constants');
const {PROPOSAL_STATES} = require('../../helpers/constants');
const { web3 } = require('@openzeppelin/test-helpers/src/setup');
const { findEventInTransaction } = require('../../helpers/events');

describe('Proposal', () => {
    it('should create valid proposal without target, function signature or call data', async () => {
        const [
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

        const proposalTx = await governanceInstance.create(executorInstance.address, [ZERO_ADDRESS], ['0'], [''], ['0x'], [false], ipfsBytes32Hash, { from: firstUser });

        const {args} = await findEventInTransaction(proposalTx, 'ProposalCreated');
        
        expectBignumberEqual(args.id, 0);
        expectBignumberEqual(await governanceInstance.getProposalsCount(), 1);

    });

    it('shold return valid proposal information after proposal creation', async () => {
        const [
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

        const proposalTx = await governanceInstance.create(
                executorInstance.address, 
                [ZERO_ADDRESS], ['0'], [''], ['0x'], 
                [false], ipfsBytes32Hash, { from: firstUser });

        const {args} = await findEventInTransaction(proposalTx, 'ProposalCreated');

        expectBignumberEqual(args.id, 0);
        expectBignumberEqual(await governanceInstance.getProposalsCount(), 1);
        expect(args.creator).to.be.equal(firstUser);
        expect(args.executor).to.be.equal(executorInstance.address);
        expect(args.targets).to.have.members([ZERO_ADDRESS]);
        expectBignumberEqual(args.values[0], 0);
        expect(args.signatures).to.have.members(['']);
        expect(args.calldatas).to.have.members(['0x']);
        expect(args.withDelegatecalls).to.have.members([false]);
        expectBignumberEqual(args.startBlock, (toBN(await web3.eth.getBlockNumber())).add(await governanceInstance.getVotingDelay()))
        expectBignumberEqual(args.endBlock, toBN(args.startBlock).add(await executorInstance.VOTING_DURATION()));
        expect(args.strategy).to.be.equal(governanceStrategyInstance.address);
        expect(args.ipfsHash).to.be.equal(ipfsBytes32Hash);
    });
    

    it('should create valid proposal with target, function signature or call data', async () => {
        const [
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

        const proposalTx = await governanceInstance.create(executorInstance.address, [pptInstance.address], ['0'], ['balanceOf(address)'], [encodedArgument], [false], ipfsBytes32Hash, { from: firstUser });

        const proposalId = proposalTx.logs[0].args.id;
        startBlock = proposalTx.logs[0].blockNumber + votingDelay;
        endBlock = proposalTx.logs[0].blockNumber + votingDelay + await executorInstance.VOTING_DURATION();

        expect(parseInt(endBlock)).to.be.greaterThan(parseInt(startBlock));
        // console.log((await governanceInstance.getVotingDelay()).toString())
        // console.log((await web3.eth.getBlockNumber()).toString())
        // console.log((await governanceInstance.getProposalById(proposalId)) )
        expectBignumberEqual(await governanceInstance.getProposalState(proposalId), PROPOSAL_STATES.Pending);
        await advanceBlock();
        // no delay so proposal state should be active after proposal creation block is mined
        expectBignumberEqual(await governanceInstance.getProposalState(proposalId), PROPOSAL_STATES.Active);
    });
})

