const isAdmin = require('../utils/isAdmin');

const { interaction } = require('../config');

module.exports = interact => {
  const lang = interact.customId.split('-').pop();

  if (isAdmin(interact.member)) {
    interact.message.channel.messages.cache.get(interact.message.reference.messageId)
      .reply(interaction.responses.reject_interaction[lang]);
    interact.message.delete();
  } else {
    interact.reply({
      content: interaction.responses.not_admin[lang],
      ephemeral: true
    });
  };
};