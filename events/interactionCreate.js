const weather = require('../commands/weather');

module.exports = async (interaction) => {
  if (!interaction.isStringSelectMenu())
    return;

  if (interaction.customId === 'weather')
    weather(interaction);
};