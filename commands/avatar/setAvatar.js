const validUrl = require('valid-url');

module.exports = (event, messageId) => {
  if (event.customId)
    event = event.message;

  event.channel.messages.fetch(messageId).then(message => {
    const content = message.content.split(' ');

    if (content.length != 2) {
      event.reply('avatar değiştirmek için bir tane link girmen lazım düzgün kullan');
      return;
    };

    if (!validUrl.isUri(content[1])) {
      event.reply('doğru link gir düzgün kullan');
      return;
    };

    message.client.user.setAvatar(content[1]).then(() => {
      message.reply('yaptım reis, gifse olmamıştır ama').then(() => {
        event.delete();
      });
    }).catch(err => {
      console.error(err);
      message.reply('bi sıkıntı çıktı kanzi: ' + err);
    });
  });
};