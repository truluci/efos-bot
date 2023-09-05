const sendGreetingMessage = require('../commands/greet/sendGreetingMessage');

module.exports = member => {
  sendGreetingMessage(member);
};