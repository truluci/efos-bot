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
    
    const commands = [];
    
    fs.readdirSync('./commands').forEach(file => {
      const command = require(`./${file}`);

      if (command.name && command.name != this.name)
        commands.push(command);
    });

    if (!content[1]) {
      commands.forEach(command => {
        embed.addFields({
          name: command.name,
          value: command.description
        });
      });
    } else {
      const command = commands.find(command => command.triggers.includes(content[1]));

      if (command) {
        embed.setTitle(command.name);
        embed.setDescription(command.detailedDescription || command.description);
      } else {
        embed.setTitle('Error');
        embed.setDescription('Command not found. Please use `help` to see all commands.');
      };
    };

    message.reply({ embeds: [embed] });
  }
};