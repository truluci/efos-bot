/*
  Create a button message with the provided options.

  Request:
  data: {
    triggerMessage: Message, // Message that triggered the action
    reply?: Boolean // Reply to the trigger message
    content?: String, // Message content
    options: [
      {
        label?: String, // Button label
        style?: ButtonStyle, // Button style
        url?: String, // Button url
        customId?: String // Button custom id
      }
    ],
  }

  Response:
  callback: (error, response) => {
    error?: String, // Error message
    response?: Message, // Created message
  }
*/

const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = (data, callback) => {
  if (!data.triggerMessage)
    return callback('No channel provided for message.');

  if (!data.options)
    return callback('No options provided for message.');

  const row = new ActionRowBuilder();

  data.options.forEach(option => {
    const button = new ButtonBuilder()

    button.setStyle(option.style || (option.url ? ButtonStyle.Link : ButtonStyle.Success));
    button.setLabel(option.label || 'Button');

    if (!option.url && !option.customId)
      return callback('No URL or custom ID provided for button.');

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
    callback(null, createdMessage);
  });
};