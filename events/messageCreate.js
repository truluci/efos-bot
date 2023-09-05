const isSetAvatarAllowed = require('../commands/avatar/isSetAvatarAllowed');
const createCityMenu = require('../commands/weather/createCityMenu');
const respondToKeywords = require('../commands/auto/respondToKeywords');
const startOutro = require('../commands/outro/startOutro');
const translateToEnglish = require('../commands/auto/translateToEnglish');

const CHANNELS_TO_TRANSLATE = process.env.CHANNELS_TO_TRANSLATE.split(',');

module.exports = message => {
  if (!message.guild) return;
  if (message.author.bot) return;

  const command = message.content.trim().toLowerCase().split(' ')[0];

  if (CHANNELS_TO_TRANSLATE.includes(message.channel.id))
    translateToEnglish(message);
  else
    respondToKeywords(message);
  
  if (command == 'outro')
    startOutro(message);
  else if (command == 'hava')
    createCityMenu(message);
  else if (command == 'avatar')
    isSetAvatarAllowed(message);
};