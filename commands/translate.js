const { EmbedBuilder, MessageFlags } = require('discord.js');

const { translate } = require('../config');
const googleTranslate = require('google-translate-api-x');
const validUrl = require('valid-url');

module.exports = {
  execute(message) {
    if (!translate.channels.includes(message.channel.id)) return;
    if (validUrl.isUri(message.content)) return;
    if (!message.content.length) return;

    googleTranslate(message.content, {
      from: translate.language.from,
      to: translate.language.to,
    }).then(res => {
      const embed = new EmbedBuilder();

      embed.setAuthor({
        name: message.member.nickname || message.author.username,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
      });
      embed.setDescription(res.text);

      if (message.reference) {
        const repliedMessage = message.channel.messages.cache.get(message.reference.messageId);

        if (repliedMessage) {
          embed.setFooter({
            text: translate.responses.replying_to[translate.language.to].replace('{user}', repliedMessage.member.nickname || repliedMessage.author.username)
          });
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