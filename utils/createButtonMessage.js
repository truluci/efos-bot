const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = (data, callback) => {
  if (!data.triggerMessage)
    return callback(null, 'No channel provided for message.');

  if (!data.options)
    return callback(null, 'No options provided for message.');

  const row = new ActionRowBuilder();

  data.options.forEach(option => {
    const button = new ButtonBuilder()

    button.setStyle(option.style || (option.url ? ButtonStyle.Link : ButtonStyle.Success));
    button.setLabel(option.label || 'Button');

    if (!option.url && !option.customId)
      return callback(null, 'No URL or custom ID provided for button.');

    if (option.url)
      button.setURL(option.url);
    else
      button.setCustomId(option.customId || 'undefined');

    row.addComponents(button);
  });

  data.triggerMessage.channel.send({
    content: data.content,
    components: [row],
    reply: {
      messageReference: data.reply ? data.triggerMessage : undefined,
      failIfNotExists: false
    }
  }).then(createdMessage => {
    callback(createdMessage);
  });
};