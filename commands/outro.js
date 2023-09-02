const { createAudioPlayer, joinVoiceChannel, createAudioResource } = require('@discordjs/voice');
const path = require('path');
const sleep = require('util').promisify(setTimeout);

module.exports = async (message) => {
  if (!message.mentions.users.size) {
    message.reply('birisini etiketle amk düzgün kullan.');
    return;
  }

  const member = message.guild.members.cache.get(message.mentions.users.first()?.id);

  if (!member || !member.voice.channel) {
    message.reply('kanalda yok ki amk düzgün kullan.');
    return;
  }

  const voiceChannel = member.voice.channel;

  const connection = joinVoiceChannel({
    channelId: voiceChannel.id,
    guildId: voiceChannel.guild.id,
    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
  });

  const resource = createAudioResource(path.join(__dirname, '../assets/outro.mp3'));

  const player = createAudioPlayer();

  connection.subscribe(player);

  player.play(resource);

  await sleep(15000);
  member.voice.disconnect();
  await sleep(5000);

  player.stop();
  connection.destroy();
};