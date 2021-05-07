const { expect } = require('chai');
const { ZERO_ADDRESS } = require('../../helpers/address');
const {expectBignumberEqual} = require('../../helpers/index');
const {
    deployMockVotingToken
} = require('../helpers/deploy');


describe('MockVotingToken mint and burn', () => {
    it('should allow valid admin mint and burn', async () => {
        const accounts = await web3.eth.getAccounts();
        const [votingTokenInstance, {owner}] = await deployMockVotingToken();
        const admin = accounts[1];
        const user = accounts[2];
        const mintAmount = 10 * (10**8);

        await votingTokenInstance.setAdmin(admin, {from: owner});

        expectBignumberEqual(await votingTokenInstance.balanceOf(user), 0);
        
        await votingTokenInstance.mint(user, mintAmount, {from: admin});
        expectBignumberEqual(await votingTokenInstance.balanceOf(user), mintAmount);

        await votingTokenInstance.burn(user, mintAmount, {from: admin});
        expectBignumberEqual(await votingTokenInstance.balanceOf(user), 0);

    });
});