const Discord = require('discord.js');
const validUrl = require('valid-url');

const createButtonMenu = require('../utils/createButtonMenu');
const isAdmin = require('../utils/isAdmin');
const rejectInteraction = require('../utils/rejectInteraction');

module.exports = {
  name: 'Avatar',
  description: 'Change the bot\'s avatar.\n`avatar <link>`',
  detailedDescription: 'Change the bot\'s avatar.\n\n`avatar <link>`\n\nYou need admin approval to use this command if you are not an admin.',
  triggers: ['avatar', 'pp'],
  execute(message) {
    if (isAdmin(message.member))
      this.setAvatar(message);
    else
      createButtonMenu(message, {
        content: 'adminler izin veriyonuz mu?',
        options: [
          {
            label: 'veriyoz',
            style: Discord.ButtonStyle.Success,
            customId: 'confirm-set-avatar'
          },
          {
            label: 'yok',
            style: Discord.ButtonStyle.Danger,
            customId: 'reject-set-avatar'
          }
        ]
      });
  },
  setAvatar(message, interaction) {
    const content = message.content.split(' ');

    if (content.length != 2) {
      message.reply('avatar değiştirmek için bir tane link girmen lazım düzgün kullan');
      interaction?.message.delete();
      return;
    };

    if (!validUrl.isUri(content[1])) {
      message.reply('doğru link gir düzgün kullan');
      interaction.message.delete();
      return;
    };

    message.client.user.setAvatar(content[1]).then(() => {
      message.reply('yaptım reis, gifse olmamıştır ama').then(() => {
        message.delete();
      });

      interaction.message.delete();
    }).catch(err => {
      console.error(err);
      message.reply('bi sıkıntı çıktı kanzi: ' + err);

      interaction.message.delete();
    });
  },
  handleInteraction(interaction) {
    if (interaction.customId == 'confirm-set-avatar' && isAdmin(interaction.member))
      this.setAvatar(interaction.message.channel.messages.cache.get(interaction.message.reference.messageId), interaction);
    else
      rejectInteraction(interaction);
  }
};