const logDurations = require('../commands/auto/logDurations');

module.exports = (oldState, newState) => {
  const member = newState.member;

  if (member)
    logDurations(oldState, newState);
};