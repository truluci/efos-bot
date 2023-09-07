module.exports = (reaction, user) => {
    // Your event handling code here
    console.log(reaction);


    if (reaction.emoji.name === '👍') {
        console.log('👍');
    }
};