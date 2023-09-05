const KEYWORD_RESPONSES = {
  'ping': 'pong',
  'zort': 'zarrrrt',
  'selam': 'selamın aleyküm diceksin',
  'sa': 'as',
};

module.exports = message => {
  const content = message.content.toLowerCase();

  if (content in KEYWORD_RESPONSES)
    message.reply(KEYWORD_RESPONSES[content]);
};