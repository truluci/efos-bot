const client = require("../client");

module.exports = async (message) => {
  if (!message.guild) return;
  if (message.author.bot) return;
  
  if (message.content === "ping") {
    message.reply("pong");
  };

  console.log(message.content);
};