const { expect } = require('chai');
const { ZERO_ADDRESS } = require('../../helpers/address');
const {expectBignumberEqual} = require('../../helpers/index');
const {
    deployMockPPT, 
    deployMockPXT, 
    deployMockVotingToken
} = require('../helpers/deploy');

describe('MockPPT deployment', () => {
    it('should deploy with valid contract address', async () => {
        const accounts = await web3.eth.getAccounts();
        const [pptInstance, {owner}] = await deployMockPPT();

        expect(pptInstance.address).to.not.be.equal(ZERO_ADDRESS);
        expect(owner).to.be.equal(accounts[0]);
    });

    it('should deploy with valid metadata - name, symbol, decimals', async () => {
        const decimals = 8;
        const symbol = "PPT";
        const name = "PPT";

        const [pptInstance] = await deployMockPPT();

        expect(await pptInstance.name()).to.be.equal(name);
        expect(await pptInstance.symbol()).to.be.equal(symbol);
        expectBignumberEqual(await pptInstance.decimals(), decimals);
    })
});

describe('MockPXT deployment', () => {
    it('should deploy with valid contract address', async () => {
        const accounts = await web3.eth.getAccounts();
        const [pxtInstance, {owner}] = await deployMockPXT();

        expect(pxtInstance.address).to.not.be.equal(ZERO_ADDRESS);
        expect(owner).to.be.equal(accounts[0]);
    });

    it('should deploy with valid metadata - name, symbol, decimals', async () => {
        const decimals = 8;
        const symbol = "PXT";
        const name = "PXT";

        const [pxtInstance] = await deployMockPXT();

        expect(await pxtInstance.name()).to.be.equal(name);
        expect(await pxtInstance.symbol()).to.be.equal(symbol);
        expectBignumberEqual(await pxtInstance.decimals(), decimals);
    })
});

describe('MockVotingToken deployment', () => {
    it('should deploy with valid contract address and owner address', async () => {
        const accounts = await web3.eth.getAccounts();
        const [votingTokenInstance, {owner}] = await deployMockVotingToken();

        expect(votingTokenInstance.address).to.not.be.equal(ZERO_ADDRESS);
        expect(owner).to.be.equal(accounts[0]);
        expect(await votingTokenInstance.owner()).to.be.equal(owner);
        expect(await votingTokenInstance.admin()).to.be.equal(ZERO_ADDRESS);
        
    });

    it('should deploy with valid metadata - name, symbol, decimals', async () => {
        const decimals = 8;
        const symbol = "PGT";
        const name = "Populous Governance Token";

        const [votingTokenInstance] = await deployMockVotingToken();

        expect(await votingTokenInstance.name()).to.be.equal(name);
        expect(await votingTokenInstance.symbol()).to.be.equal(symbol);
        expectBignumberEqual(await votingTokenInstance.decimals(), decimals);
    });
});