const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = (data, callback) => {
  if (!data.channel)
    return callback(null, 'No channel provided for message.');

  if (!data.options)
    return callback(null, 'No options provided for message.');

  if (!data.customId)
    return callback(null, 'No custom ID provided for message.');

  const row = new ActionRowBuilder()
    .addComponents(
      new StringSelectMenuBuilder()
        .setCustomId(data.customId)
        .addOptions(data.options)
  );
  
  data.channel.send({
    content: data.content,
    components: [row],
    reply: {
      messageReference: data.replyTo,
      failIfNotExists: false,
    }
  }).then(createdMessage => {
    callback(createdMessage);
  });
};