const { Client, GatewayIntentBits, Partials } = require("discord.js");
const dotenv = require("dotenv");

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction]
});

client.on('ready', () => {
  // client.user.setPresence({ activities: [{ name: '31' }] });
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
  if (!message.guild) return;
  if (message.author.bot) return;
  
  if (message.content === "ping") {
    message.reply("pong");
  };
});

client.login(process.env.TOKEN)