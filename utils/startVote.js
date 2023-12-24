const { EmbedBuilder } = require('discord.js');

const DEFAULT_TIME = 5000;
const DEFAULT_MIN_VOTES = 1;

module.exports = (data, callback) => {
  if (!data.triggerMessage)
    return callback(null, 'No trigger message provided for vote.');

  if (!data.description)
    return callback(null, 'No description provided for vote.');

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

      callback({
        passed: result,
        message: voteMessage,
      });
    });
  });
};