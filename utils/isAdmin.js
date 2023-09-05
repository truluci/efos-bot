const Discord = require('discord.js');

module.exports = member => {
  return member && member.permissions.has(Discord.PermissionFlagsBits.Administrator);
};