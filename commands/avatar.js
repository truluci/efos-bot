const Discord = require('discord.js');
const validUrl = require('valid-url');

const { avatar } = require('../config');
const createButtonMenu = require('../utils/createButtonMenu');
const isAdmin = require('../utils/isAdmin');
const rejectInteraction = require('../utils/rejectInteraction');

module.exports = {
  name: avatar.info.name,
  description: avatar.info.description,
  detailedDescription: avatar.info.detailedDescription,
  triggers: avatar.info.triggers,
  execute(message) {
    const lang = message.content.toLowerCase().split(' ')[0] == this.triggers[0] ? 'en' : 'tr';

    if (isAdmin(message.member))
      this.setAvatar(message);
    else
      createButtonMenu(message, {
        content: avatar.responses.ask_admin_approval[lang],
        options: [
          {
            label: avatar.responses.admin_approval_confirm[lang],
            style: Discord.ButtonStyle.Success,
            customId: `confirm-set-avatar-${lang}`
          },
          {
            label: avatar.responses.admin_approval_reject[lang],
            style: Discord.ButtonStyle.Danger,
            customId: `reject-set-avatar-${lang}`
          }
        ]
      });
  },
  setAvatar(message, interaction) {
    const content = message.content.split(' ');
    const lang = content[0] == this.triggers[0] ? 'en' : 'tr';

    if (content.length != 2) {
      message.reply(avatar.responses.ask_link[lang]);
      interaction?.message.delete();
      return;
    };

    if (!validUrl.isUri(content[1])) {
      message.reply(avatar.responses.ask_valid_link[lang]);
      interaction?.message.delete();
      return;
    };

    message.client.user.setAvatar(content[1])
      .then(() => {
        message.reply(avatar.responses.confirm[lang])
          .then(() => {
            interaction?.message.delete();
          });

        interaction?.message.delete();
      }).catch(err => {
        console.error(err);
        message.reply(avatar.responses.error[lang] + err);
        interaction?.message.delete();
      });
  },
  handleInteraction(interaction) {
    if (interaction.customId.includes('confirm-set-avatar') && isAdmin(interaction.member))
      this.setAvatar(interaction.message.channel.messages.cache.get(interaction.message.reference.messageId), interaction);
    else
      rejectInteraction(interaction);
  }
};