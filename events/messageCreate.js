const avatar = require('../commands/avatar');
const help = require('../commands/help');
const keyword = require('../commands/keyword');
const outro = require('../commands/outro');
const translate = require('../commands/translate');
const weather = require('../commands/weather');

module.exports = message => {
  if (!message.guild) return;
  if (message.author.bot) return;

  const command = message.content.toLowerCase().split(' ')[0];

  keyword.execute(message);
  translate.execute(message);
  
  if (outro.triggers.includes(command)) {
    outro.execute(message);
  } else if (weather.triggers.includes(command)) {
    weather.execute(message);
  } else if (avatar.triggers.includes(command)) {
    avatar.execute(message);
  } else if (help.triggers.includes(command)) {
    help.execute(message);
  };
};