const durationsOfEachMember = {};

module.exports = async (oldState, newState) => {
  const member = newState.member;
  if (!member) return;

  const channelId = newState.channelId;

  if (!oldState.channelId && channelId) {
    // User joined a voice channel
    durationsOfEachMember[member.id] = {
      joinTime: Date.now(),
      channel: newState.channel,
    };
  } else if (oldState.channelId && !channelId) {
    // User left a voice channel
    const joinTime = durationsOfEachMember[member.id]?.joinTime;
    if (joinTime) {
      const duration = Date.now() - joinTime;
      const seconds = Math.floor(duration / 1000);
      const formattedDuration = new Date(seconds * 1000).toISOString().substr(11, 8);

      const message = `${member} stayed in ${durationsOfEachMember[member.id]?.channel.name} for ${formattedDuration}.`;

      // Send the message to the same channel the user left from
      const channel = oldState.channel;
      if (channel && channel.isText()) {
        await channel.send(message);
      }

      delete durationsOfEachMember[member.id];
    }
  }
};