const { PermissionFlagsBits } = require('discord.js');

module.exports = member => {
  return member && member.permissions.has(PermissionFlagsBits.Administrator);
};