const Discord = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

const interactionCreate = require('./events/interactionCreate');
const messageCreate = require('./events/messageCreate');
const ready = require('./events/ready');
const voiceStateUpdate = require('./events/voiceStateUpdate');

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

client.on('interactionCreate', interaction =>
  interactionCreate(interaction)
);

client.on('messageCreate', message =>
  messageCreate(message)
);

client.on('ready', _ =>
  ready(client)
);

client.on('voiceStateUpdate', (oldState, newState) =>
  voiceStateUpdate(oldState, newState)
);

client.login(process.env.TOKEN)

module.exports = client;