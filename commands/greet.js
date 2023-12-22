const { greet } = require('../config');

module.exports = {
  execute(member) {
    const channel = member.guild.channels.cache.get(member.guild.systemChannelId);

    if (channel)
      channel.send(greet.message.replace('{user}', member));
  }
};