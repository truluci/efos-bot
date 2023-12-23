const { vote } = require("../config");
const startVote = require("../utils/startVote");

const ONE_HOUR_IN_MS = 1000 * 60 * 60;

module.exports = {
  triggers: vote.info.triggers,
  execute(message) {
    if (!vote.channels.includes(message.channel.id)) return;

    const content = message.content.toLowerCase().split(' ');
    const lang = message.content.toLowerCase().split(' ')[0] == this.triggers[0] ? 'en' : 'tr'; 

    if (!content[1]) {
      message.reply(vote.responses.ask_affirmation[lang]);
      return;
    };

    const affirmation = message.content.slice(this.triggers[0].length + 1).trim().toLocaleUpperCase('tr');

    startVote(message, {
      description: affirmation,
      reactions: {
        positive: '✅',
        negative: '❌'
      },
      minVotes: 2,
      time: ONE_HOUR_IN_MS,
      tag: vote.tag,
      onVotePassed(sentMessage) {
        const embed = sentMessage.embeds[0];
        embed.data.footer = { text: vote.responses.vote_passed[lang] };

        sentMessage.edit({ embeds: [embed] });

        message.channel
          .send(`[${affirmation}](https://twitter.com/intent/tweet?text=${encodeURIComponent(affirmation)})`)
          .then(twitterUrlMessage => twitterUrlMessage.pin());
      },
      onVoteFailed(sentMessage) {
        const embed = sentMessage.embeds[0];
        embed.data.footer = { text: vote.responses.vote_failed[lang] };

        sentMessage.edit({ embeds: [embed] });
      }
    });
  },
};