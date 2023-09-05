const Discord = require('discord.js');
const validUrl = require('valid-url');

let content;

module.exports = async event => {
  if (!event.customId) {
    content = event.content.trim().toLowerCase().split(' ');
  } else {
    content = (await event.message.channel.messages.fetch(event.message.reference.messageId)).content.trim().toLowerCase().split(' ');
  };

  if (content.length != 2) {
    event.reply('avatar değiştirmek için bir tane link girmen lazım düzgün kullan');
    return;
  };

  if (!validUrl.isUri(content[1])) {
    event.reply('doğru link gir düzgün kullan');
    return;
  };

  if (event.customId == 'confirm-avatar-change') {
    const member = event.guild.members.cache.get(event.user.id);
    const messageWithUrl = await event.message.channel.messages.fetch(event.message.reference.messageId);

    if (member && member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
      messageWithUrl.client.user.setAvatar(messageWithUrl.content.split(' ')[1]);
      messageWithUrl.reply('yaptım reis, gifse olmamıştır ama');
      event.message.delete();
    } else {
      event.reply({
        content: 'admin değilsin böhöhöyt',
        ephemeral: true
      });
    };
  } else if (event.customId == 'reject-avatar-change') {
    const member = event.guild.members.cache.get(event.user.id);

    if (member && member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
      const messageWithUrl = await event.message.channel.messages.fetch(event.message.reference.messageId);

      messageWithUrl.reply('emir yüksek yerlerden geldi, yapamam');
      event.message.delete();
    } else {
      event.reply({
        content: 'admin değilsin böhöhöyt',
        ephemeral: true
      });
    };
  } else {
    event.client.user.setAvatar(content[1]);
    event.reply('yaptım reis, gifse olmamıştır ama');
  };
};