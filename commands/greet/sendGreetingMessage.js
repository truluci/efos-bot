module.exports = member => {
  const channel = member.guild.channels.cache.get(member.guild.systemChannelId);

  if (channel)
    channel.send(process.env.GREETING_MESSAGE.replace('{user}', member));
};