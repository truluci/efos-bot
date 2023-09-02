const keywordResponse = require('../commands/keywordResponse');
const outro = require('../commands/outro');

module.exports = async (message) => {
  if (!message.guild) return;

  const content = message.content.trim().toLowerCase();

  keywordResponse(message, content);
  
  if (content.split(' ')[0] == 'outro')
    outro(message);
};