const { vote } = require("../config");
const createButtonMessage = require("../utils/createButtonMessage");
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

    const affirmation = message.content.slice(this.triggers[0].length + 1).trim().toLocaleUpperCase('tr'); // TODO: Dynamic language support

    startVote(message, {
      description: affirmation,
      reactions: {
        positive: '✅',
        negative: '❌'
      },
      minVotes: 2,
      time: ONE_HOUR_IN_MS,
      tag: vote.tag,
      onVotePassed(voteMessage) {
        const embed = voteMessage.embeds[0];
        embed.data.footer = { text: vote.responses.vote_passed[lang] };

        voteMessage.edit({ embeds: [embed] });

        createButtonMessage({
          channel: message.channel,
          content: affirmation,
          options: [
            {
              label: 'Publish',
              url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(affirmation)}`,
            },
            {
              label: 'Unpin',
              customId: 'unpin-affirmation',
            }
          ]
        }, (createdMessage, err) => {
          if (err) return console.error(err);

          createdMessage.pin();
        });
      },
      onVoteFailed(voteMessage) {
        const embed = voteMessage.embeds[0];
        embed.data.footer = {
          text: vote.responses.vote_failed[lang]
        };

        voteMessage.edit({ embeds: [embed] });
      }
    });
  },
  handleInteraction(interaction) {
    interaction.message.unpin();
    interaction.message.edit({
      content: `${interaction.message.content} **(unpinned)**`,
      components: [],
    });
    interaction.deferUpdate();
  },
};