const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
  name: 'Help',
  description: 'You can get detailed info about a command by using `help <command>`.',
  triggers: ['help', 'yardım'],
  execute(message) {
    const content = message.content.toLowerCase().split(' ');

    const embed = new Discord.EmbedBuilder()
      .setTitle(this.name)
      .setDescription(this.description);

    fs.readdirSync('./commands').forEach(file => {
      const command = require(`./${file}`);

      if (!command.name || command.name == this.name) return;

      if (content[1]) {
        if (command.triggers.includes(content[1])) {
          embed.setTitle(command.name);
          embed.setDescription(command.detailedDescription || command.description);
          return;
        } else {
          embed.setDescription('Command not found. Use `help` to get a list of commands.');
        };
      } else {
        embed.addFields({
          name: command.name,
          value: command.description
        });
      };
    });

    message.reply({ embeds: [embed] });
  }
};