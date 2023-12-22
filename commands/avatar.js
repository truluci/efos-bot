const Discord = require('discord.js');
const validUrl = require('valid-url');

const createButtonMenu = require('../utils/createButtonMenu');
const isAdmin = require('../utils/isAdmin');
const rejectInteraction = require('../utils/rejectInteraction');

const RESPONSES = {
  confirm: {
    en: 'Avatar changed successfully. (if it\'s a gif, it might not work)',
    tr: 'yaptım reis, gifse olmamıştır ama'
  },
  error: {
    en: 'Something went wrong while changing the avatar.',
    tr: 'bi sıkıntı çıktı kanzi'
  },
  ask_link: {
    en: 'You need to provide a single link to change the avatar.',
    tr: 'avatar değiştirmek için bir tane link girmen lazım düzgün kullan'
  },
  ask_valid_link: {
    en: 'You need to provide a valid link.',
    tr: 'doğru link gir düzgün kullan'
  },
  ask_admin_approval: {
    en: 'Admins, do you approve?',
    tr: 'adminler izin veriyonuz mu?'
  },
  admin_approval_confirm: {
    en: 'Yes.',
    tr: 'veriyoz'
  },
  admin_approval_reject: {
    en: 'No.',
    tr: 'yok'
  }
};

module.exports = {
  name: {
    en: 'Avatar',
    tr: 'Resim'
  },
  description: {
    en: 'Change the bot\'s avatar.\n`avatar <link>`',
    tr: 'Botun avatarını değiştirir.\n`resim <link>`'
  },
  detailedDescription: {
    en: 'Change the bot\'s avatar.\n\n`avatar <link>`\n\nYou need admin approval to use this command if you are not an admin.',
    tr: 'Botun avatarını değiştirir.\n\n`avatar <link>`\n\nEğer admin değilseniz bu komutu kullanmak için admin onayına ihtiyacınız var.'
  },
  triggers: ['avatar', 'resim'],
  execute(message) {
    const lang = message.content.toLowerCase().split(' ')[0] == this.triggers[0] ? 'en' : 'tr';

    if (isAdmin(message.member))
      this.setAvatar(message);
    else
      createButtonMenu(message, {
        content: RESPONSES.ask_admin_approval[lang],
        options: [
          {
            label: RESPONSES.admin_approval_confirm[lang],
            style: Discord.ButtonStyle.Success,
            customId: 'confirm-set-avatar'
          },
          {
            label: RESPONSES.admin_approval_reject[lang],
            style: Discord.ButtonStyle.Danger,
            customId: 'reject-set-avatar'
          }
        ]
      });
  },
  setAvatar(message, interaction) {
    const content = message.content.split(' ');
    const lang = content[0] == this.triggers[0] ? 'en' : 'tr';

    if (content.length != 2) {
      message.reply(RESPONSES.ask_link[lang]);
      interaction?.message.delete();
      return;
    };

    if (!validUrl.isUri(content[1])) {
      message.reply(RESPONSES.ask_valid_link[lang]);
      interaction?.message.delete();
      return;
    };

    message.client.user.setAvatar(content[1])
      .then(() => {
        message.reply(RESPONSES.confirm[lang])
          .then(() => {
            interaction?.message.delete();
          });

        interaction?.message.delete();
      }).catch(err => {
        console.error(err);
        message.reply(RESPONSES.error[lang] + err);
        interaction?.message.delete();
      });
  },
  handleInteraction(interaction) {
    if (interaction.customId == 'confirm-set-avatar' && isAdmin(interaction.member))
      this.setAvatar(interaction.message.channel.messages.cache.get(interaction.message.reference.messageId), interaction);
    else
      rejectInteraction(interaction);
  }
};