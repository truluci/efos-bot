/*
  Create a vote message with the given data.

  Request:
  data = {
    triggerMessage: Message, // Message that triggered the action
    reply?: Boolean // Reply to the trigger message
    description: String, // Vote description
    reactions?: {
      positive?: String, // Positive reaction
      negative?: String // Negative reaction
    },
    tag?: String, // Tag to mention
    time?: Number, // Vote time
    minVotes?: Number // Minimum votes to pass
  }

  Response:
  callback: (error, response) => {
    error?: String, // Error message
    response?: {
      passed: Boolean, // Vote passed
      message: Message // Created message
    },
  }
*/

const { EmbedBuilder } = require('discord.js');

const DEFAULT_TIME = 5000;
const DEFAULT_MIN_VOTES = 1;

module.exports = (data, callback) => {
  if (!data.triggerMessage)
    return callback('No channel provided for message.');

  if (!data.description)
    return callback('No description provided for vote.');

  const embed = new EmbedBuilder();
  embed.setAuthor({
    name: data.triggerMessage.member.nickname || data.triggerMessage.author.username,
    iconURL: data.triggerMessage.author.displayAvatarURL({ dynamic: true }),
  });
  embed.setDescription(data.description);

  if (data.tag)
    data.triggerMessage.channel.send(`<@&${data.tag}>`);
  
  data.triggerMessage.channel.send({
    embeds: [embed],
    reply: {
      messageReference: data.reply ? data.triggerMessage : undefined,
      failIfNotExists: false
    }
  }).then((voteMessage) => {
    const positiveReaction = data.reactions?.positive || '✅';
    const negativeReaction = data.reactions?.negative || '❌';

    voteMessage.react(positiveReaction);
    voteMessage.react(negativeReaction);

    const collector = voteMessage.createReactionCollector({
      filter: reaction => [positiveReaction, negativeReaction].includes(reaction.emoji.name),
      time: data.time || DEFAULT_TIME
    });

    collector.on('end', collected => {
      const positiveVotesCount = collected.get(positiveReaction).count;
      const negativeVotesCount = collected.get(negativeReaction).count;

      const minVotes = data.minVotes || DEFAULT_MIN_VOTES;

      const result = positiveVotesCount - negativeVotesCount >= minVotes;

      callback(null, {
        passed: result,
        message: voteMessage,
      });
    });
  });
};