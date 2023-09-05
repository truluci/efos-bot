const isSetAvatarAllowed = require('../commands/avatar/isSetAvatarAllowed');
const createCityMenu = require('../commands/weather/createCityMenu');
const respondToKeywords = require('../commands/auto/respondToKeywords');
const startOutro = require('../commands/outro/startOutro');
const translateToEnglish = require('../commands/auto/translateToEnglish');

module.exports = async (message) => {
  if (!message.guild) return;
  if (message.author.bot) return;

  const content = message.content.trim().toLowerCase();
  const command = content.split(' ')[0];

  respondToKeywords(message, content);

  if (message.channel.id == '1046874392254218320')
    translateToEnglish(message);
  
  if (command == 'outro')
    startOutro(message);
  else if (command == 'hava')
    createCityMenu(message);
  else if (command == 'avatar')
    isSetAvatarAllowed(message);
};