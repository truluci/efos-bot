const logDurations = require('../commands/auto/logDurations');

module.exports = (oldState, newState) => {
  if (newState.member)
    logDurations(oldState, newState);
};