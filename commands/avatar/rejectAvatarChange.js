const isAdmin = require('../../utils/isAdmin');

module.exports = interaction => {
  if (isAdmin(interaction.member)) {
    interaction.message.channel.messages.cache.get(interaction.message.reference.messageId)
      .reply('emir yüksek yerlerden geldi, yapamam');
    interaction.message.delete();
  } else {
    interaction.reply({
      content: 'admin değilsin böhöhöyt',
      ephemeral: true
    });
  };
};