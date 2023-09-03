const logDurations = require('../commands/auto/logDurations');

module.exports = async (oldState, newState) => {
  const member = newState.member;

  if (member)
    logDurations(oldState, newState);
};