const validUrl = require('valid-url');

module.exports = (message, interaction) => {  
  const content = message.content.split(' ');

  if (content.length != 2) {
    message.reply('avatar değiştirmek için bir tane link girmen lazım düzgün kullan');
    interaction?.message.delete();
    return;
  };

  if (!validUrl.isUri(content[1])) {
    message.reply('doğru link gir düzgün kullan');
    interaction.message.delete();
    return;
  };

  message.client.user.setAvatar(content[1]).then(() => {
    message.reply('yaptım reis, gifse olmamıştır ama').then(() => {
      message.delete();
    });

    interaction.message.delete();
  }).catch(err => {
    console.error(err);
    message.reply('bi sıkıntı çıktı kanzi: ' + err);

    interaction.message.delete();
  });
};