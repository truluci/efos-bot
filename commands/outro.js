const DiscordVoice = require('@discordjs/voice');
const path = require('path');

const { outro } = require('../config');

module.exports = {
  name: outro.info.name,
  description: outro.info.description,
  detailedDescription: outro.info.detailedDescription,
  triggers: outro.info.triggers,
  execute(message) {
    const lang = message.content.toLowerCase().split(' ')[0] == this.triggers[0] ? 'en' : 'tr';

    if (DiscordVoice.getVoiceConnection(message.guild.id)) {
      message.reply(outro.responses.already_playing[lang]);
      return;
    };

    if (!message.mentions.users.size) {
      message.reply(outro.responses.ask_user[lang]);
      return;
    };

    const member = message.guild.members.cache.get(message.mentions.users.first()?.id);

    if (!member || !member.voice.channel) {
      message.reply(outro.responses.user_not_in_voice_channel[lang]);
      return;
    };

    if (member.id == message.client.user.id) {
      message.reply(outro.responses.cant_play_outro_for_self[lang]);
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
      if (connection.state.status != DiscordVoice.VoiceConnectionStatus.Destroyed)
        connection.destroy();
    }, 20000);
  }
};