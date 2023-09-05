const Discord = require('discord.js');
const translate = require('google-translate-api-x');
const validUrl = require('valid-url');

module.exports = message => {
  if (validUrl.isUri(message.content)) return;
  if (!message.content.length) return;

  translate(message.content, { from: 'tr', to: 'en' }).then(res => {
    const embed = new Discord.EmbedBuilder()
      .setAuthor({
        name: message.member.nickname || message.author.username,
        iconURL: message.author.avatarURL()
      })
      .setDescription(res.text);

    if (message.reference) {
      const repliedMessage = message.channel.messages.cache.get(message.reference.messageId);

      if (repliedMessage) {
        embed.setFooter({
          text: `Replying to ${repliedMessage.member.nickname || repliedMessage.author.username}`,
        });
      };
    };

    message.channel.send({
      embeds: [embed],
      flags: [4096] // Silent message
    });
  }).catch(err => {
    console.error(err);
    message.channel.send({
      content: `bi sıkıntı çıktı kanzi: ${err}`,
      flags: [4096] // Silent message
    });
  });
};