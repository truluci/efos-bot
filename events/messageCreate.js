const changeBotsAvatarMenu = require('../commands/changeBotsAvatarMenu');
const keywordResponse = require('../commands/keywordResponse');
const outro = require('../commands/outro');
const weather = require('../commands/weatherMenu');

module.exports = async (message) => {
  if (!message.guild) return;

  const content = message.content.trim().toLowerCase();

  keywordResponse(message, content);

  const command = content.split(' ')[0];
  
  if (command == 'outro')
    outro(message);

  if (command == 'hava')
    weather(message);

  if (command == 'avatar')
    changeBotsAvatarMenu(message);
};