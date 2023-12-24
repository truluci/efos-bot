const fs = require('fs');
const { EmbedBuilder } = require('discord.js');

const { help } = require('../config');

module.exports = {
  name: help.info.name,
  description: help.info.description,
  detailedDescription: help.info.detailedDescription,
  triggers: help.info.triggers,
  execute(message) {
    const content = message.content.toLowerCase().split(' ');
    const lang = content[0] == this.triggers[0] ? 'en' : 'tr';

    const embed = new EmbedBuilder();
    embed.setTitle(this.name[lang]);
    embed.setDescription(this.description[lang]);
    
    const commands = [];
    
    fs.readdirSync('./commands').forEach(file => {
      const command = require(`./${file}`);

      if (command.name && command.name[lang] && command.name[lang] != this.name[lang])
        commands.push(command);
    });

    if (!content[1]) {
      embed.setFields(commands.map(command => ({
        name: command.name[lang],
        value: command.description[lang]
      })));
    } else {
      const command = commands.find(command => command.triggers.includes(content[1]));

      if (command) {
        embed.setTitle(command.name[lang]);
        embed.setDescription(command.detailedDescription[lang] || command.description[lang]);
      } else {
        embed.setTitle(help.responses.command_not_found_title[lang]);
        embed.setDescription(help.responses.command_not_found[lang]);
      };
    };

    message.reply({ embeds: [embed] });
  }
};