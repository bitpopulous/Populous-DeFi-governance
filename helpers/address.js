const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

const getOwner = accounts => accounts[0];

const getUserAddress = (accounts, i) => {
  if (i < 0 || i > 5) throw Error('Index must be between 0 and 5');
  return accounts[5 + i];
};

const getAccountsAsync = web3.eth.getAccounts;

const getGovernanceActors = accounts => ({
  owner: getOwner(accounts),
  firstUser: getUserAddress(accounts, 1),
  secondUser: getUserAddress(accounts, 2),
  thirdUser: getUserAddress(accounts, 3),
  fourthUser: getUserAddress(accounts, 4)
});

const getGovernanceActorsAsync = async () => {
  const accounts = await getAccountsAsync();

  return getGovernanceActors(accounts);
};

module.exports = {
  ZERO_ADDRESS,
  getUserAddress,
  getOwner,
  getGovernanceActorsAsync,
  getAccountsAsync,
};
