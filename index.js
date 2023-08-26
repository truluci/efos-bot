// index.js

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent] });

require('dotenv').config();

const { handleResponses } = require('./events/message'); // Adjust the path as needed

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  if (message.author.bot) return; // Ignore messages from bots
  handleResponses(message); // Call the function to handle responses
});

client.login(process.env.TOKEN);