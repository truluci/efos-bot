const startVote = require("../utils/startVote");

const ONE_HOUR_IN_MS = 1000 * 60 * 60;

const RESPONSES = {
  ask_affirmation: {
    en: 'Please provide an affirmation.',
    tr: 'Lütfen bir olumlama girin.'
  },
  vote_passed: {
    en: 'Vote passed!',
    tr: 'Oylama başarılı!'
  },
  vote_failed: {
    en: 'Vote failed!',
    tr: 'Oylama başarısız!'
  }
};

module.exports = {
  name: {
    en: 'Vote',
    tr: 'Oylama'
  },
  description: {
    en: 'Start a vote for an affirmation.',
    tr: 'Olumlama için oylama başlatır.'
  },
  detailedDescription: {
    en: 'Start a vote for an affirmation . Use `vote <affirmation>` to initiate the vote.',
    tr: 'Olumlama için oylama başlatır. Oylama başlatmak için `oylama <olumlama>` komutunu kullanın.'
  },
  triggers: ['vote', 'oyla'],
  execute(message) {
    const content = message.content.toLowerCase().split(' ');
    const lang = message.content.toLowerCase().split(' ')[0] == this.triggers[0] ? 'en' : 'tr'; 

    if (!content[1]) {
      message.reply(RESPONSES.ask_affirmation[lang]);
      return;
    };

    startVote(message, {
      description: message.content.slice(this.triggers[0].length + 1).trim().toUpperCase(),
      reactions: {
        positive: '✅',
        negative: '❌'
      },
      minVotes: 2,
      time: ONE_HOUR_IN_MS,
      onVotePassed(sentMessage) {
        const embed = sentMessage.embeds[0];
        embed.data.footer = { text: RESPONSES.vote_passed[lang] };

        sentMessage.edit({ embeds: [embed] });
      },
      onVoteFailed(sentMessage) {
        const embed = sentMessage.embeds[0];
        embed.data.footer = { text: RESPONSES.vote_failed[lang] };

        sentMessage.edit({ embeds: [embed] });
      }
    });
  },
};