// migrations/3_transfer_ownership.js
const { admin } = require('@openzeppelin/truffle-upgrades');
 
module.exports = async function (deployer, network, accounts) {
  // Use address of your Gnosis Safe
  const owner = accounts[0];
 
  if (network == "development") {
        // The owner of the ProxyAdmin can upgrade our contracts
        await admin.transferProxyAdminOwnership(owner);
  } else if (network == "ropsten") {
        await admin.transferProxyAdminOwnership("0x614b32516601b7C424d0B284B498D5E14323ED3A");
  } else if (network == "live") {
      await admin.transferProxyAdminOwnership("0x70393B06D018e148B593A91E022EA73071c17007");
  }
};