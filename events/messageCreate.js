const client = require("../client");

const keywordResponses = {
  "ping": "pong",
  "zort": "zarrrrt",
  "selam": "selamın aleyküm",
  "sa": "as",
  // Add more keywords and responses here
};

const commandPrefix = "."; // Change this to your command prefix

module.exports = async (message) => {
  if (!message.guild) return;
  if (message.author.bot) return;

  const content = message.content.toLowerCase();
  
  if (content in keywordResponses) {
    message.reply(keywordResponses[content]);
  };

  if (content.startsWith(commandPrefix)) {
    const args = content.slice(commandPrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (commandName === 'outro') {
      const outroCommand = require(`../commands/outro`);
      outroCommand.execute(message);
    };
  };

  console.log(message.content);
};