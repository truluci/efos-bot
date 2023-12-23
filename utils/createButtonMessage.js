const Discord = require('discord.js');

module.exports = (data, callback) => {
  if (!data.channel)
    return callback(null, 'No channel provided for message.');

  if (!data.options)
    return callback(null, 'No options provided for message.');

  const row = new Discord.ActionRowBuilder();

  data.options.forEach(option => {
    const button = new Discord.ButtonBuilder()

    button.setStyle(option.style || (option.url ? Discord.ButtonStyle.Link : Discord.ButtonStyle.Success));
    button.setLabel(option.label || 'Button');

    if (!option.url && !option.customId)
      return callback(null, 'No URL or custom ID provided for button.');

    if (option.url)
      button.setURL(option.url);
    else
      button.setCustomId(option.customId || 'undefined');

    row.addComponents(button);
  });

  data.channel.send({
    content: data.content,
    components: [row],
    reply: {
      messageReference: data.replyTo,
      failIfNotExists: false
    }
  }).then(createdMessage => {
    callback(createdMessage);
  });
};