const Discord = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

const guildMemberAdd = require('./events/guildMemberAdd');
const interactionCreate = require('./events/interactionCreate');
const messageCreate = require('./events/messageCreate');
const ready = require('./events/ready');
const voiceStateUpdate = require('./events/voiceStateUpdate');
const messageReactionAdd = require('./events/messageReactionAdd');
const messageReactionRemove = require('./events/messageReactionRemove');

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildPresences,
    Discord.GatewayIntentBits.GuildMessageReactions,
    Discord.GatewayIntentBits.GuildVoiceStates,
    Discord.GatewayIntentBits.DirectMessages,
    Discord.GatewayIntentBits.MessageContent
  ],
  partials: [
    Discord.Partials.Channel,
    Discord.Partials.Message,
    Discord.Partials.User,
    Discord.Partials.GuildMember,
    Discord.Partials.Reaction
  ]
});

// client.on('dmChannelCreate', dmChannelCreate);

client.on('guildMemberAdd', guildMemberAdd);

client.on('interactionCreate', interactionCreate);

client.on('messageCreate', messageCreate);

client.on('messageReactionAdd', messageReactionAdd);

client.on('messageReactionRemove', messageReactionRemove);

client.on('ready', ready);

client.on('voiceStateUpdate', voiceStateUpdate);

client.login(process.env.TOKEN)

module.exports = client;