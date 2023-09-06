const Discord = require('discord.js');

module.exports = (message, data) => {
  const row = new Discord.ActionRowBuilder();

  data.options.forEach(option => {
    row.addComponents(
      new Discord.ButtonBuilder({
        style: option.style,
        label: option.label
      })
        .setCustomId(option.customId)
    );
  });

  message.reply({
    content: data.content,
    components: [row]
  });
};