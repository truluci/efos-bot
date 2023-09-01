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
      const seconds = Math.floor((Date.now() - joinTime) / 1000);

      await channel.send({
        content: `${durationsOfEachMember[member.id]?.channel.name} kanalında ${seconds} saniye kalan ${member.nickname} arkadaşımızı tebrik ediyoruz.`,
        flags: [4096] // Silent message
      });

      delete durationsOfEachMember[member.id];
    };
  };
};