module.exports = client => {
  console.log(`Logged in as ${client.user.tag} at ${new Date().toTimeString()}`);
  client.user.setActivity('help', { type: 'LISTENING' });
};