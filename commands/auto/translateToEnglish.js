const translate = require('google-translate-api-x');

module.exports = (message) => {
  translate(message.content, { to: 'en' }).then(res => {
    message.channel.send({
      content: `**${message.member.nickname || message.author.username}**: ${res.text}`,
      flags: [4096] // Silent message
    });
  }).catch(err => {
    message.channel.send({
      content: `bi sıkıntı çıktı kanzi: ${err}`,
      flags: [4096] // Silent message
    });
    console.error(err);
  });
};