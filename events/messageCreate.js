const isSetAvatarAllowed = require('../commands/avatar/isSetAvatarAllowed');
const createCityMenu = require('../commands/weather/createCityMenu');
const repondToKeywords = require('../commands/auto/repondToKeywords');
const startOutro = require('../commands/outro/startOutro');

module.exports = async (message) => {
  if (!message.guild) return;

  const content = message.content.trim().toLowerCase();
  const command = content.split(' ')[0];

  repondToKeywords(message, content);
  
  if (command == 'outro')
    startOutro(message);
  else if (command == 'hava')
    createCityMenu(message);
  else if (command == 'avatar')
    isSetAvatarAllowed(message);
};