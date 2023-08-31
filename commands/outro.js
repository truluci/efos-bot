const { createAudioPlayer, joinVoiceChannel, createAudioResource, NoSubscriberBehavior } = require('@discordjs/voice');
const path = require('path');
const sleep = require('util').promisify(setTimeout);

module.exports = {
  name: 'outro',
  description: 'Plays outro audio and kicks the mentioned user',
  async execute(message) {
    if (!message.guild || !message.mentions.users.size) {
      return message.reply('Please mention a user to use this command.');
    }

    const targetUser = message.mentions.users.first();

    const member = message.guild.members.cache.get(targetUser.id);
    if (!member.voice.channel) {
      return message.reply('adam sesli kanalda değil ki neden çıkartıyorsun :(');
    };

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

    // await sleep(15000);
    // member.voice.disconnect();
    await sleep(5000);

    player.stop();
    connection.destroy();
  },
};