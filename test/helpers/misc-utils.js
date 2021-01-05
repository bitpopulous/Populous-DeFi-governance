const BigNumber = require('bignumber.js');
const BN = require('bn.js');
const {WAD} = require('./constants');
const {Wallet, ContractTransaction} = require('ethers');
const {ethers} = require('ethers');

const toWad = (value) => new BigNumber(value).times(WAD).toFixed();
const bnToBigNumber = (amount) => new BigNumber(amount);
const stringToBigNumber = (amount) => new BigNumber(amount);
const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
const createRandomAddress = () => Wallet.createRandom().address;
let provider = new ethers.providers.Web3Provider(web3.currentProvider);

const evmSnapshot = async () => await provider.send('evm_snapshot', []);
const evmRevert = async (id) => await provider.send('evm_revert', [id]);
const timeLatest = async () => {
  const block = await provider.getBlock('latest');
  return new BigNumber(block.timestamp);
};

const advanceBlock = async (timestamp) =>
  await provider.send('evm_mine', timestamp ? [timestamp] : []);

const latestBlock = async () => await provider.getBlockNumber();

const advanceBlockTo = async (target) => {
  const currentBlock = await latestBlock();
  const start = Date.now();
  let notified;
  if (target < currentBlock)
    throw Error(`Target block #(${target}) is lower than current block #(${currentBlock})`);
  while ((await latestBlock()) < target) {
    if (!notified && Date.now() - start >= 5000) {
      notified = true;
      console.log(`advanceBlockTo: Advancing too many blocks is causing this test to be slow.'`);
    }
    await advanceBlock();
  }
};

const increaseTime = async (secondsToIncrease) => {
  await provider.send('evm_increaseTime', [secondsToIncrease]);
  await provider.send('evm_mine', []);
};

const waitForTx = async (tx) => await tx.wait(1);

module.exports = {waitForTx, increaseTime, advanceBlock, advanceBlockTo, latestBlock,
toWad, bnToBigNumber, stringToBigNumber, sleep,
createRandomAddress, evmSnapshot, evmRevert, timeLatest}