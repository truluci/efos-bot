const DiscordVoice = require('@discordjs/voice');
const path = require('path');

module.exports = async (message) => {
  if (!message.mentions.users.size) {
    message.reply('birisini etiketle amk düzgün kullan.');
    return;
  };

  const member = message.guild.members.cache.get(message.mentions.users.first()?.id);

  if (!member || !member.voice.channel) {
    message.reply('kanalda yok ki amk düzgün kullan.');
    return;
  };

  const voiceChannel = member.voice.channel;

  const connection = DiscordVoice.joinVoiceChannel({
    channelId: voiceChannel.id,
    guildId: voiceChannel.guild.id,
    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
  });

  const resource = DiscordVoice.createAudioResource(path.join(__dirname, '../../assets/outro.mp3'));

  const player = DiscordVoice.createAudioPlayer();

  connection.subscribe(player);

  player.play(resource);

  setTimeout(() => {
    member.voice.disconnect();
  }, 15000);

  setTimeout(() => {
    player.stop();
    connection.destroy();
  }, 20000);
};