const Discord = require("discord.js");
const { activity } = require("../config");

module.exports = client => {
  console.log(`Logged in as ${client.user.tag} at ${new Date().toTimeString()}`);

  client.user.setActivity({
    name: activity.name,
    type: Discord.ActivityType.Custom,
  });
};