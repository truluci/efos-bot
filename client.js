const { Client, GatewayIntentBits, Partials } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

const guildMemberAdd = require('./events/guildMemberAdd');
const interactionCreate = require('./events/interactionCreate');
const messageCreate = require('./events/messageCreate');
const ready = require('./events/ready');
const voiceStateUpdate = require('./events/voiceStateUpdate');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.User,
    Partials.GuildMember,
    Partials.Reaction
  ]
});

client.on('guildMemberAdd', guildMemberAdd);

client.on('interactionCreate', interactionCreate);

client.on('messageCreate', messageCreate);

client.on('ready', ready);

client.on('voiceStateUpdate', voiceStateUpdate);

client.login(process.env.TOKEN)

module.exports = client;