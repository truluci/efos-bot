const { MessageFlags } = require('discord.js');

const { duration } = require('../config');

const DURATIONS = {};

module.exports = {
  execute(oldState, newState) {
    const member = newState.member;

    if (!member) return;

    if (!oldState.channelId && newState.channelId) {
      DURATIONS[member.id] = {
        joinTime: Date.now(),
        channel: newState.channel,
      };
    } else if (oldState.channelId && !newState.channelId) {
      const joinTime = DURATIONS[member.id]?.joinTime;

      if (joinTime) {
        const channel = oldState.channel;
        const durationTime = new Date(Date.now() - joinTime);

        channel.send({
          content: duration.message
            .replace('{channel}', DURATIONS[member.id]?.channel.name)
            .replace('{hours}', durationTime.getUTCHours())
            .replace('{mins}', durationTime.getUTCMinutes())
            .replace('{secs}', durationTime.getUTCSeconds())
            .replace('{name}', member.nickname || member.user.username),
          flags: [MessageFlags.SuppressNotifications],
        })
          .then(() => {
            delete DURATIONS[member.id];
          });
      };
    };
  }
};