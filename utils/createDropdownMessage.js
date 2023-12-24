/*
  Create a dropdown message with the given data.

  Request:
  data: {
    triggerMessage: Message, // Message that triggered the action
    reply?: Boolean // Reply to the trigger message
    customId: String, // Dropdown custom id
    content?: String, // Message content
    options: [
      {
        label: String, // Option label
        description?: String, // Option description
        value: String, // Option value
        emoji?: String, // Option emoji
        default?: Boolean // Option default
      }
    ]
  }

  Response:
  callback: (error, response) => {
    error?: String, // Error message
    response?: Message, // Created message
  }
*/

const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = (data, callback) => {
  if (!data.triggerMessage)
    return callback('No channel provided for message.');

  if (!data.options)
    return callback('No options provided for message.');

  if (!data.customId)
    return callback('No custom ID provided for message.');

  const row = new ActionRowBuilder()
    .addComponents(
      new StringSelectMenuBuilder()
        .setCustomId(data.customId)
        .addOptions(data.options)
  );
  
  data.triggerMessage.channel.send({
    content: data.content,
    components: [row],
    reply: {
      messageReference: data.reply ? data.triggerMessage : undefined,
      failIfNotExists: false,
    }
  }).then(createdMessage => {
    callback(null, createdMessage);
  });
};