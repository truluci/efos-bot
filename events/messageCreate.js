const avatar = require('../commands/avatar');
const help = require('../commands/help');
const keyword = require('../commands/keyword');
const outro = require('../commands/outro');
const translate = require('../commands/translate');
const weather = require('../commands/weather');
const voteForAffirm = require('../commands/voteForAffirm');

const commandMap = {
  [outro.triggers[0]]: outro,
  [outro.triggers[1]]: outro,
  [weather.triggers[0]]: weather,
  [weather.triggers[1]]: weather,
  [avatar.triggers[0]]: avatar,
  [avatar.triggers[1]]: avatar,
  [help.triggers[0]]: help,
  [help.triggers[1]]: help,
  [voteForAffirm.triggers[0]]: voteForAffirm,
  [voteForAffirm.triggers[1]]: voteForAffirm
};

module.exports = message => {
  if (!message.guild || message.author.bot) return;

  const command = message.content.toLowerCase().split(' ')[0];

  keyword.execute(message);
  translate.execute(message);

  const commandToExecute = commandMap[command];
  if (commandToExecute) {
    commandToExecute.execute(message);
  }
};