const isAdmin = require('../utils/isAdmin');

const setAvatar = require('../commands/avatar/setAvatar');
const sendWeatherByCity = require('../commands/weather/sendWeatherByCity');
const rejectAvatarChange = require('../commands/avatar/rejectAvatarChange');

module.exports = interaction => {
  if (!interaction.isStringSelectMenu() && !interaction.isButton())
    return;

  if (interaction.customId == 'weather') {
    sendWeatherByCity(interaction);
  } else if (interaction.customId == 'confirm-avatar-change') {
    if (isAdmin(interaction.member))
      setAvatar(interaction.message.channel.messages.cache.get(interaction.message.reference.messageId), interaction);      
    else
      rejectAvatarChange(interaction);
  } else if (interaction.customId == 'reject-avatar-change') {
    rejectAvatarChange(interaction);
  };
};