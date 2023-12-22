const { MessageFlags } = require('discord.js');

const { translate } = require('../config');
const googleTranslate = require('google-translate-api-x');
const validUrl = require('valid-url');

module.exports = {
  execute(message) {
    if (!translate.channels.includes(message.channel.id)) return;
    if (validUrl.isUri(message.content)) return;
    if (!message.content.length) return;

    googleTranslate(message.content, { from: 'tr', to: 'en' }).then(res => {
      const embed = {
        author: {
          name: message.member.nickname || message.author.username,
          icon_url: message.author.displayAvatarURL({ dynamic: true }),
        },
        description: res.text,
      };

      if (message.reference) {
        const repliedMessage = message.channel.messages.cache.get(message.reference.messageId);

        if (repliedMessage) {
          embed.footer = {
            text: `Replying to ${repliedMessage.member.nickname || repliedMessage.author.username}`,
          };
        };
      };

      message.channel.send({
        embeds: [embed],
        flags: [MessageFlags.SuppressNotifications]
      });
    }).catch(err => {
      console.error(err);
      message.channel.send({
        content: err,
        flags: [MessageFlags.SuppressNotifications]
      });
    });
  },
};