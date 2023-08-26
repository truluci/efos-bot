const responses = {
    "hello": ["Hi there!", "Hello!", "Hey!"],
    "goodbye": ["Goodbye!", "See you later!", "Farewell!"],
    // Add more triggering words and their responses here
  };
  
  module.exports = {
    handleResponses: function(message) {
      for (const trigger in responses) {
        if (message.content.toLowerCase().includes(trigger)) {
          const responseOptions = responses[trigger];
          const selectedResponse = responseOptions[Math.floor(Math.random() * responseOptions.length)];
          message.channel.send(selectedResponse);
          console.log(`Triggered response: ${trigger}`);
          break; // Exit the loop after sending a response
        }
      }
    }
  };
  