const { Client, GatewayIntentBits, Partials } = require("discord.js");
const dotenv = require("dotenv");

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
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

const messageCreate = require("./events/messageCreate");

client.on("messageCreate", async (message) => {
  messageCreate(message);
});

const voiceTracker = require("./events/voiceTracker");

client.on("voiceStateUpdate", async (oldState, newState) => {
  voiceTracker(oldState, newState);
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.TOKEN)

module.exports = client;
