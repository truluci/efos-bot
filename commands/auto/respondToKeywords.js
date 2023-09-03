const KEYWORD_RESPONSES = {
  'ping': 'pong',
  'zort': 'zarrrrt',
  'selam': 'selamın aleyküm diceksin',
  'sa': 'as',
};

module.exports = (message, content) => {
  if (content in KEYWORD_RESPONSES)
    message.reply(KEYWORD_RESPONSES[content]);
};