const DiscordVoice = require('@discordjs/voice');
const path = require('path');

module.exports = {
  name: 'Outro',
  description: 'Plays outro for a specified user.\n`outro <@user>`',
  detailedDescription: 'Plays outro for a specified user.\n\n`outro <@user>`\n\nUser must be in a voice channel for this command to work properly.',
  triggers: ['outro', 'çıkış'],
  execute(message) {
    if (message.client.voice.connections.size) {
      message.reply('İŞİM VAR BAŞKASINI ATIYOM DUR BİRAZ');
      return;
    };

    if (!message.mentions.users.size) {
      message.reply('birisini etiketle amk düzgün kullan.');
      return;
    };

    const member = message.guild.members.cache.get(message.mentions.users.first()?.id);

    if (!member || !member.voice.channel) {
      message.reply('kanalda yok ki amk düzgün kullan.');
      return;
    };

    if (member.id == message.client.user.id) {
      message.reply('beni mi çıkarıyorsun amk?');
      return;
    };

    const voiceChannel = member.voice.channel;

    const connection = DiscordVoice.joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });

    const resource = DiscordVoice.createAudioResource(path.join(__dirname, '../assets/outro.mp3'));

    const player = DiscordVoice.createAudioPlayer();

    connection.subscribe(player);

    player.play(resource);

    setTimeout(() => {
      if (member.voice.channel && member.voice.channel.members.has(message.client.user.id))
        member.voice.disconnect();
    }, 15000);

    setTimeout(() => {
      player.stop();
      connection.destroy();
    }, 20000);
  }
};