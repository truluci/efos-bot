const greet = require('../commands/greet');

module.exports = member => {
  greet.execute(member);
};