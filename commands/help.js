const fs = require('fs');

const RESPONSES = {
  command_not_found_title: {
    en: 'Error',
    tr: 'Hata'
  },
  command_not_found: {
    en: 'Command not found. Please use `help` to see all commands.',
    tr: 'Komut bulunamadı. Tüm komutları görmek için `yardım` kullanın.'
  }
};

module.exports = {
  name: {
    en: 'Help',
    tr: 'Yardım'
  },
  description: {
    en: 'You can get detailed info about a command by using `help <command>`.',
    tr: 'Bir komut hakkında detaylı bilgi almak için `yardım <komut>` kullanabilirsiniz.'
  },
  triggers: ['help', 'yardım'],
  execute(message) {
    const content = message.content.toLowerCase().split(' ');
    const lang = content[0] == this.triggers[0] ? 'en' : 'tr';

    const embed = {
      title: this.name[lang],
      description: this.description[lang],
      fields: []
    }
    
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
        embed.title = RESPONSES.command_not_found_title[lang];
        embed.description = RESPONSES.command_not_found[lang];
      };
    };

    message.reply({ embeds: [embed] });
  }
};