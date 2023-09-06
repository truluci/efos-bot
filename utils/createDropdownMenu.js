const Discord = require('discord.js');

module.exports = (message, data) => {
  const row = new Discord.ActionRowBuilder()
    .addComponents(
      new Discord.StringSelectMenuBuilder()
        .setCustomId(data.customId)
        .addOptions(data.options)
  );
  
  message.reply({
    content: data.content,
    components: [row]
  });
};