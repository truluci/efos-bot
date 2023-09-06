const DiscordVoice = require('@discordjs/voice');
const path = require('path');

RESPONSES = {
  already_playing: {
    en: 'I\'m already playing outro for someone else.',
    tr: 'İŞİM VAR BAŞKASINI ATIYOM DUR BİRAZ'
  },
  ask_user: {
    en: 'You need to tag someone to play outro for them.',
    tr: 'birisini etiketle amk düzgün kullan.'
  },
  user_not_in_voice_channel: {
    en: 'User is not in a voice channel.',
    tr: 'kanalda yok ki amk düzgün kullan.'
  },
  cant_play_outro_for_self: {
    en: 'You can\'t play outro for me.',
    tr: 'beni mi çıkarıyorsun amk?'
  }
};

module.exports = {
  name: {
    en: 'Outro',
    tr: 'Çıkış'
  },
  description: {
    en: 'Plays outro for a specified user.\n`outro <@user>`',
    tr: 'Belirtilen kullanıcı için outro çalar.\n`çıkış <@kullanıcı>`'
  },
  detailedDescription: {
    en: 'Plays outro for a specified user.\n\n`outro <@user>`\n\nUser must be in a voice channel for this command to work properly.',
    tr: 'Belirtilen kullanıcı için outro çalar.\n\n`çıkış <@kullanıcı>`\n\nBu komutun düzgün çalışması için kullanıcı bir ses kanalında olmalıdır.'
  },
  triggers: ['outro', 'çıkış'],
  execute(message) {
    const lang = message.content.toLowerCase().split(' ')[0] == this.triggers[0] ? 'en' : 'tr';

    if (DiscordVoice.getVoiceConnection(message.guild.id)) {
      message.reply(RESPONSES.already_playing[lang]);
      return;
    };

    if (!message.mentions.users.size) {
      message.reply(RESPONSES.ask_user[lang]);
      return;
    };

    const member = message.guild.members.cache.get(message.mentions.users.first()?.id);

    if (!member || !member.voice.channel) {
      message.reply(RESPONSES.user_not_in_voice_channel[lang]);
      return;
    };

    if (member.id == message.client.user.id) {
      message.reply(RESPONSES.cant_play_outro_for_self[lang]);
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