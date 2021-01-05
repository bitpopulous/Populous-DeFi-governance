//const {tEthereumAddress} = require('../../helpers/types');
const {fromRpcSig, ECDSASignature} = require('ethereumjs-util');
const {signTypedData_v4} = require('eth-sig-util');

const buildPermitParams = (
  chainId,
  governance,
  id,
  support
) => ({
  types: {
    EIP712Domain: [
      {name: 'name', type: 'string'},
      {name: 'chainId', type: 'uint256'},
      {name: 'verifyingContract', type: 'address'},
    ],
    VoteEmitted: [
      {name: 'id', type: 'uint256'},
      {name: 'support', type: 'bool'},
    ],
  },
  primaryType: 'VoteEmitted',
  domain: {
    name: 'Aave Governance v2',
    version: '1',
    chainId: chainId,
    verifyingContract: governance,
  },
  message: {
    id,
    support,
  },
});

// Test case for ecrevocer bug
const buildFakePermitParams = (
  chainId,
  governance,
  id,
  support
) => ({
  types: {
    EIP712Domain: [
      {name: 'name', type: 'string'},
      {name: 'chainId', type: 'uint256'},
      {name: 'verifyingContract', type: 'address'},
      {name: 'version', type: 'uint256'}, // Missing EIP712Domain parameter at gov
    ],
    VoteEmitted: [
      {name: 'id', type: 'uint256'},
      {name: 'support', type: 'bool'},
    ],
  },
  primaryType: 'VoteEmitted',
  domain: {
    name: 'Aave Governance v2',
    version: '1',
    chainId: chainId,
    verifyingContract: governance,
  },
  message: {
    id,
    support,
  },
});

const getSignatureFromTypedData = (
  privateKey,
  typedData // TODO: should be TypedData, from eth-sig-utils, but TS doesn't accept it
) => { //ECDSASignature
  const signature = signTypedData_v4(Buffer.from(privateKey.substring(2, 66), 'hex'), {
    data: typedData,
  });
  return fromRpcSig(signature);
};

module.exports = {getSignatureFromTypedData, buildFakePermitParams, buildPermitParams};