const { joinVoiceChannel, createAudioResource, NoSubscriberBehavior, AudioPlayerStatus } = require('@discordjs/voice');
const { promisify } = require('util');
const sleep = promisify(setTimeout);

module.exports = {
  name: 'outro',
  description: 'Plays outro audio and kicks the mentioned user.',
  async execute(message) {
    // Check if the command is in a guild and if a user is mentioned
    if (!message.guild || !message.mentions.users.size) {
      return message.reply('Please mention a user to use this command.');
    }

    const targetUser = message.mentions.users.first();

    // Check if the mentioned user is in a voice channel
    const member = message.guild.members.cache.get(targetUser.id);
    if (!member.voice.channel) {
      return message.reply('adam sesli kanalda değil ki neden çıkartıyorsun :(');
    }

    // Join the user's voice channel
    const voiceChannel = member.voice.channel;
    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });

    // Create an audio resource and player
    const audioResource = createAudioResource('./outro.mp3', {
      inlineVolume: true,
      behaviors: { noSubscriber: NoSubscriberBehavior.Pause },
    });

    const audioPlayer = connection.subscribe(audioResource);

    // Play audio for 20 seconds
    await sleep(15000); // Wait 15 seconds
    member.voice.kick(); // Kick the user
    await sleep(5000); // Wait 5 seconds

    // Stop the audio and leave the voice channel
    audioPlayer.stop();
    connection.destroy();
  },
};
