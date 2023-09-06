const duration = require('../commands/duration');

module.exports = (oldState, newState) => {
  duration.execute(oldState, newState);
};