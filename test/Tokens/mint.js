const { expect } = require('chai');
const { ZERO_ADDRESS } = require('../../helpers/address');
const {expectBignumberEqual} = require('../../helpers/index');
const {
    deployMockPPT, 
    deployMockPXT, 
    deployMockVotingToken
} = require('../helpers/deploy');

describe('MockPPT mint', () => {
    it('should mint correct amount', async () => {
        const accounts = await web3.eth.getAccounts();
        const [pptInstance, {owner}] = await deployMockPPT();
        const user = accounts[1];
        const amountToMint = 10 * (10**8);

        expectBignumberEqual(await pptInstance.balanceOf(user), 0);

        await pptInstance.mint(user, amountToMint, {from: owner});

        expectBignumberEqual(await pptInstance.balanceOf(user), amountToMint);
    });

});

describe('MockPXT mint', () => {
    it('should mint correct amount', async () => {
        const accounts = await web3.eth.getAccounts();
        const [pxtInstance, {owner}] = await deployMockPXT();
        const user = accounts[1];
        const amountToMint = 10 * (10**8);

        expectBignumberEqual(await pxtInstance.balanceOf(user), 0);

        await pxtInstance.mint(user, amountToMint, {from: owner});

        expectBignumberEqual(await pxtInstance.balanceOf(user), amountToMint);
    });

});