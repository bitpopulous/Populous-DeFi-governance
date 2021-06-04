const MockPPT = artifacts.require('MockPPT');
const MockPXT = artifacts.require('MockPXT');
const GovernanceStrategy = artifacts.require('GovernanceStrategy');
const PopulousGovernanceV2 = artifacts.require('PopulousGovernanceV2');
const PopulousGovernanceV3 = artifacts.require('PopulousGovernanceV3');
const Executor = artifacts.require('Executor');
const MockVotingToken = artifacts.require('MockVotingToken');
const { deployProxy, prepareUpgrade, upgradeProxy } = require('@openzeppelin/truffle-upgrades');


module.exports = function (deployer, network, accounts) {
    // Using the accounts within the migrations.

    if (network == "ropsten") {

    } else if (network == "development") {
        /* deployer.then(async () => {
            const governance = await PopulousGovernanceV2.deployed();
            await upgradeProxy(governance.address, PopulousGovernanceV3, {deployer});
            console.log('version 2', (await PopulousGovernanceV3.deployed()).address);
        }) */
    }

}