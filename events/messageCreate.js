const isAdmin = require('../utils/isAdmin');

const createSetAvatarMenu = require('../commands/avatar/createSetAvatarMenu');
const createCityMenu = require('../commands/weather/createCityMenu');
const respondToKeywords = require('../commands/auto/respondToKeywords');
const setAvatar = require('../commands/avatar/setAvatar');
const startOutro = require('../commands/outro/startOutro');
const translateToEnglish = require('../commands/auto/translateToEnglish');

const CHANNELS_TO_TRANSLATE = process.env.CHANNELS_TO_TRANSLATE.split(',');
const COMMAND_TRIGGERS = {
  avatar: [
    'avatar',
    'pp'
  ],
  weather: [
    'weather',
    'hava'
  ],
  outro: [
    'outro',
    'çıkış'
  ]
};

module.exports = message => {
  if (!message.guild) return;
  if (message.author.bot) return;

  const command = message.content.toLowerCase().split(' ')[0];

  if (CHANNELS_TO_TRANSLATE.includes(message.channel.id))
    translateToEnglish(message);
  else
    respondToKeywords(message);
  
  if (COMMAND_TRIGGERS.outro.includes(command))
    startOutro(message);
  else if (COMMAND_TRIGGERS.weather.includes(command))
    createCityMenu(message);
  else if (COMMAND_TRIGGERS.avatar.includes(command))
    if (isAdmin(message.member))
      setAvatar(message, message.id);
    else
      createSetAvatarMenu(message);
};