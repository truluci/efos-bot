const avatar = require('../commands/avatar');
const help = require('../commands/help');
const keyword = require('../commands/keyword');
const outro = require('../commands/outro');
const translate = require('../commands/translate');
const weather = require('../commands/weather');
const vote = require('../commands/vote');
const math = require('../commands/math');

const commands = [
  outro,
  weather,
  avatar,
  help,
  vote,
  math
];
const commandMap = {};

commands.forEach(command => {
  command.triggers.forEach(trigger => {
    commandMap[trigger] = command;
  });
});

module.exports = message => {
  if (!message.guild || message.author.bot) return;

  const command = message.content.toLowerCase().split(' ')[0];

  keyword.execute(message);
  translate.execute(message);

  commandMap[command]?.execute(message);
};