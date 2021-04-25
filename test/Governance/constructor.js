const { expect } = require('chai');
const { ZERO_ADDRESS } = require('../../helpers/address');
const {expectBignumberEqual} = require('../../helpers/index');
const {
    deployExecutor
} = require('../helpers/deploy');
const {duration} = require('../../helpers/utils');


describe('Governance deployment', () => {
    it('should deploy with correct addresses and variables', async () => {
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

        expect(governanceInstance.address).to.not.be.equal(ZERO_ADDRESS);
        expect(await governanceInstance.owner()).to.be.equal(owner);
        expect(await governanceInstance._PPT()).to.be.equal(pptInstance.address);
        expect(await governanceInstance._PXT()).to.be.equal(pxtInstance.address);
        expect(await governanceInstance._votingToken()).to.be.equal(votingTokenInstance.address);
        expectBignumberEqual(await governanceInstance.getProposalsCount(), 0);
        expect(await governanceInstance.isExecutorAuthorized(executorInstance.address)).to.be.equal(true);
        expect(await governanceInstance.getGuardian()).to.be.equal(owner);
        expectBignumberEqual(await governanceInstance.getVotingDelay(), votingDelay);
    });

    it('should set correct governance guardian and executor with timelock admin', async () => {
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

        expect(await executorInstance.getAdmin()).to.be.equal(governanceInstance.address);
        expect(await governanceInstance.isExecutorAuthorized(executorInstance.address)).to.be.equal(true);
        expect(await governanceInstance.getGuardian()).to.be.equal(owner);
    });

    it('should return correct total propostion power from governance strategy', async () => {
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

        const mintAmount = 1000000 * (10**8);

        expectBignumberEqual(await governanceStrategyInstance.getTotalPropositionSupply(), mintAmount * 5);
        expectBignumberEqual(await governanceStrategyInstance.getPropositionPower(firstUser), mintAmount);
    });

    it('should get correct executor variables', async () => {
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
        propositionThreshold = 100;
        const minimumPropositionPower = (await governanceStrategyInstance.getTotalPropositionSupply()) * propositionThreshold / 10000
        expectBignumberEqual(await executorInstance.getMinimumPropositionPowerNeeded(governanceInstance.address), minimumPropositionPower);
        expectBignumberEqual(await executorInstance.MINIMUM_QUORUM(), 2000); //20%
        expectBignumberEqual(await executorInstance.VOTE_DIFFERENTIAL(), 500); //5%
        expectBignumberEqual(await executorInstance.VOTING_DURATION(), 5); // 5 blocks
        expectBignumberEqual(await executorInstance.GRACE_PERIOD(), duration.days(14)); //14 days
    });
});