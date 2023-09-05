const Discord = require('discord.js');

module.exports = message => {
  const row = new Discord.ActionRowBuilder().addComponents(
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
  );

  message.reply({
    content: 'admin değilsin böhöhöyt, adminler izin veriyonuz mu?',
    components: [row]
  });
};