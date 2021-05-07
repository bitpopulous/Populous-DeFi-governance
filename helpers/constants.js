const PROPOSAL_STATES = {
  Pending: 0,
  Canceled: 1,
  Active: 2,
  Failed: 3,
  Succeeded: 4,
  Queued: 5,
  Expired: 6,
  Executed: 7
};

const ZERO_BYTES32 = '0x0000000000000000000000000000000000000000000000000000000000000000';

const DEFAULT_GRACE_PERIOD = '604800'; // 1 week in seconds

module.exports = {
  PROPOSAL_STATES,
  DEFAULT_GRACE_PERIOD,
  ZERO_BYTES32
};
