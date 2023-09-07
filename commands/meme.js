const { GiphyFetch } = require('@giphy/js-fetch-api');
const gf = new GiphyFetch('oUXO4u9bi3XWxi10MplkEsuZssvlwZFM');

async function getRandomGif() {
    const { data } = await gf.random({ tag: 'meme' });
    return data.images.original.url;
}

module.exports ={
    name: {
        en: 'Meme',
        tr: 'Mem'
    },
    description: {
        en: 'Starts a game which allow users to make their own memes with gifs and lets users compete for making the funniest meme each round.',
        tr: 'Kullanıcıların kendi memelerini giflerle yapmalarına izin veren ve kullanıcıların her turda en komik memeyi yapmak için yarışmalarına izin veren bir oyun başlatır.'
    },
    detailedDescription: {
        en: 'Starts a game which allow users to make their own memes with gifs and lets users compete for making the funniest meme each round.',
        tr: 'Kullanıcıların kendi memelerini giflerle yapmalarına izin veren ve kullanıcıların her turda en komik memeyi yapmak için yarışmalarına izin veren bir oyun başlatır.'
    },
    triggers: ['meme', 'mem'],
    async execute(message) {
        const lang = message.content.toLowerCase().split(' ')[0] == this.triggers[0] ? 'en' : 'tr';

        const gameMessage = await message.channel.send('React with ✅, if you want to play meme game!');
        await gameMessage.react('✅');

        const filter = (reaction, user) => {
            return reaction.emoji.name === '✅';
        };

        const collector = gameMessage.createReactionCollector({ filter, time: 15000 });

        let players = [];
        collector.on('collect', (reaction, user) => {
            players.push(user.id);
        });

        collector.on('end', collected => {
            if (players.length < 2) {
                message.channel.send('Not enough players to start the game!')
                return;
            }
            playGame(message.channel, players);
        });
        
        async function playGame(channel, players) {
            let captions = [];
            for (let i = 0; i < players.length; i++) {
                const gifUrl = await getRandomGif();
                const user = await message.client.users.fetch(players[i]);
                const dmChannel = await user.createDM();

                await dmChannel.send({
                    files: [gifUrl]
                });

                const filter = m => m.author.id === user.id;
                const collector = dmChannel.createMessageCollector(filter, { time: 45000 });

                collector.on('collect', m => {
                    captions.push({user: user, caption: m.content, gifUrl: gifUrl});
                });

                collector.on('end', collected => {
                    if (i === players.length - 1) {
                        postCaptions(channel, captions);
                    }
                });
            }
        }

        async function postCaptions(channel, captions) {
            for (let i = 0; i < captions.length; i++) {
                const message = await channel.send({
                    content: captions[i].caption,
                    files: [captions[i].gifUrl]
                });
        
                await message.react('👍');
        
                const filter = (reaction, user) => reaction.emoji.name === '👍';
                const collector = message.createReactionCollector(filter, { time: 60000 }); // 60 seconds to vote
        
                collector.on('collect', (reaction, user) => {
                    captions[i].votes = (captions[i].votes || 0) + 1;
                });
        
                collector.on('end', collected => {
                    if (i === captions.length - 1) { // If this is the last caption
                        // Announce the winner
                        announceWinner(channel, captions);
                    }
                });
            }
        }

        function announceWinner(channel, captions) {
            captions.sort((a, b) => b.votes - a.votes);
            const winner = captions[0];
            channel.send(`The winner is <@${winner.user.id}> with the caption: "${winner.caption}"!`);
        }
    }
}