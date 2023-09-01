const keywordResponses = {
  'ping': 'pong',
  'zort': 'zarrrrt',
  'selam': 'selamın aleyküm diceksin',
  'sa': 'as',
};

module.exports = async (message, content) => {
  if (content in keywordResponses)
    message.reply(keywordResponses[content]);
};