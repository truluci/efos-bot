const DEFAULT_TIME = 10000;
const DEFAULT_MIN_VOTES = 3;

module.exports = (message, data) => {
  const embed = {
    author: {
      name: message.member.nickname || message.author.username,
      icon_url: message.author.displayAvatarURL({ dynamic: true }),
    },
    description: data.description,
    footer: {
      text: data.footer,
    },
    embeds: [],
  };

  if (data.tag)
    message.channel.send(`<@&${data.tag}>`);
  
  message.channel.send({ embeds: [embed] })
    .then((voteMessage) => {
      const positiveReaction = data.reactions?.positive || '👍';
      const negativeReaction = data.reactions?.negative || '👎';

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

        if (positiveVotesCount - negativeVotesCount >= minVotes) {
          data.onVotePassed(voteMessage);
        } else {
          data.onVoteFailed(voteMessage);
        }
      });
    });
};