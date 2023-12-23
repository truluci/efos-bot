const fs = require('fs');

const { help } = require('../config');

module.exports = {
  name: help.info.name,
  description: help.info.description,
  detailedDescription: help.info.detailedDescription,
  triggers: help.info.triggers,
  execute(message) {
    const content = message.content.toLowerCase().split(' ');
    const lang = content[0] == this.triggers[0] ? 'en' : 'tr';

    const embed = {
      title: this.name[lang],
      description: this.description[lang],
      fields: []
    };
    
    const commands = [];
    
    fs.readdirSync('./commands').forEach(file => {
      const command = require(`./${file}`);

      if (command.name && command.name[lang] && command.name[lang] != this.name[lang])
        commands.push(command);
    });

    if (!content[1]) {
      commands.forEach(command => {
        embed.fields.push({
          name: command.name[lang],
          value: command.description[lang]
        });
      });
    } else {
      const command = commands.find(command => command.triggers.includes(content[1]));

      if (command) {
        embed.title = command.name[lang];
        embed.description = command.detailedDescription[lang] || command.description[lang];
      } else {
        embed.title = help.responses.command_not_found_title[lang];
        embed.description = help.responses.command_not_found[lang];
      };
    };

    message.reply({ embeds: [embed] });
  }
};