const { keyword } = require("../config");

module.exports = {
  execute(message) {
    const content = message.content.toLowerCase();

    if (content in keyword.responses)
      message.reply(keyword.responses[content]);
  }
};