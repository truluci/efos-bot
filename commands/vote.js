const { EmbedBuilder } = require("discord.js");

const { vote } = require("../config");
const createButtonMessage = require("../utils/createButtonMessage");
const createVoteMessage = require("../utils/createVoteMessage");

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

    createVoteMessage({
      triggerMessage: message,
      description: affirmation,
      // minVotes: 2,
      // time: ONE_HOUR_IN_MS,
      // tag: vote.tag,
    }, (err, res) => {
      if (err) return console.error(err);

      const embed = new EmbedBuilder(res.message.embeds[0]);
      embed.setFooter({
        text: res.passed ? vote.responses.vote_passed[lang] : vote.responses.vote_failed[lang]
      });

      res.message.edit({ embeds: [embed] });

      if (res.passed) {
        createButtonMessage({
          triggerMessage: message,
          content: affirmation,
          options: [
            {
              label: 'Publish',
              url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(affirmation)}`,
            },
            {
              label: 'Unpin',
              customId: 'unpin-affirmation',
            },
          ]
        }, (err, createdMessage) => {
          if (err) return console.error(err);

          createdMessage.pin();
        });
      };
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