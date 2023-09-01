const Discord = require("discord.js");
const dotenv = require("dotenv");

const messageCreate = require("./events/messageCreate");
const ready = require("./events/ready");
const voiceStateUpdate = require("./events/voiceStateUpdate");

dotenv.config();

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

client.on("messageCreate", async (message) =>
  messageCreate(message)
);

client.on("voiceStateUpdate", async (oldState, newState) =>
  voiceStateUpdate(oldState, newState)
);

client.on('ready', () =>
  ready(client)
);

client.login(process.env.TOKEN)

module.exports = client;
