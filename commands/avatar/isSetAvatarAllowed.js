const Discord = require('discord.js');

const setAvatar = require('./setAvatar');

module.exports = async (message) => {
  if (!message.guild) return;
  if (message.author.bot) return;

  const member = message.guild.members.cache.get(message.author.id);

  if (member && member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
    setAvatar(message);
  } else {
    message.reply({
      content: 'admin değilsin böhöhöyt, adminler izin veriyonuz mu?',
      components: [
        new Discord.ActionRowBuilder().addComponents(
          new Discord.ButtonBuilder({
            style: Discord.ButtonStyle.Success,
            label: 'veriyoz',
          })
            .setCustomId('confirm-avatar-change'),
          new Discord.ButtonBuilder({
            style: Discord.ButtonStyle.Danger,
            label: 'yok',
          })
            .setCustomId('reject-avatar-change')
        )
      ]
    });
  };
};