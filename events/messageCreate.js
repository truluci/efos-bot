const client = require("../client");

// Define your keyword-response mapping
const keywordResponses = {
  "ping": "pong",
  "bro": "who got you smiling like that",
  "selam": "selammmm",
  // Add more keywords and responses here
};

module.exports = async (message) => {
  if (!message.guild) return;
  if (message.author.bot) return;
  
  const content = message.content.toLowerCase(); // Convert to lowercase for case-insensitive matching
  
  // Check if the content matches any keywords
  for (const keyword in keywordResponses) {
    if (content.includes(keyword)) {
      message.reply(keywordResponses[keyword]);
      break; // Exit loop after the first match
    }
  }

  console.log(message.content);
};
