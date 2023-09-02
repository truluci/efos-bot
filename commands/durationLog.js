const durationsOfEachMember = {};

module.exports = async (oldState, newState) => {
  const member = newState.member;

  if (!oldState.channelId && newState.channelId) {
    durationsOfEachMember[member.id] = {
      joinTime: Date.now(),
      channel: newState.channel,
    };
  } else if (oldState.channelId && !newState.channelId) {
    const joinTime = durationsOfEachMember[member.id]?.joinTime;

    if (joinTime) {
      const channel = oldState.channel;
      const duration = new Date(Date.now() - joinTime);

      await channel.send({
        content: `${durationsOfEachMember[member.id]?.channel.name} kanalında ${duration.getUTCHours()} saat ${duration.getUTCMinutes()} dakika ${duration.getUTCSeconds()} saniye kadar kalan ${member.nickname} arkadaşımızı tebrik ediyoruz.`,
        flags: [4096] // Silent message
      });

      delete durationsOfEachMember[member.id];
    };
  };
};