const durationsOfEachMember = {};
const durationLog = require('../commands/durationLog');

module.exports = async (oldState, newState) => {
  const member = newState.member;

  if (member)
    durationLog(oldState, newState);
};