const { math } = require('../config');
const fs = require('fs');
const path = require('path');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: math.info.name,
    description: math.info.description,
    detailedDescription: math.info.detailedDescription,
    triggers: math.info.triggers,

    execute(message) {
        const lang = message.content.toLowerCase().split(' ')[0] === this.triggers[0] ? 'en' : 'tr';
        const users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../leaderboard.json'), 'utf8'));

        if (!message.mentions.users.size) {
            message.reply(math.responses.mention_user[lang]);
            return;
        }

        const challenger = message.author;
        const opponent = message.mentions.users.first();

        if (opponent.id === message.client.user.id) {
            message.reply(math.responses.cannot_participate[lang]);
            return;
        }

        if (opponent.id === challenger.id) {
            message.reply(math.responses.cannot_challenge_self[lang]);
            return;
        }

        // Create accept and decline buttons using ActionRowBuilder and ButtonBuilder
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('accept')
                    .setLabel('Accept')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId('decline')
                    .setLabel('Decline')
                    .setStyle(ButtonStyle.Danger)
            );

        // Send the challenge message with buttons
        message.channel.send({
            content: `${opponent.username}, you have been challenged to a math battle by ${challenger.username}. Do you accept?`,
            components: [row]
        }).then(sentMessage => {
            // Filter for button interaction from the tagged user only
            const filter = interaction => {
                return interaction.user.id === opponent.id && ['accept', 'decline'].includes(interaction.customId);
            };

            const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });

            collector.on('collect', async interaction => {
                if (interaction.customId === 'accept') {
                    await interaction.reply(`${opponent.username} has accepted the challenge! The math battle will start now.`);
                    startMathBattle(message, challenger, opponent, lang); // Start the math battle
                } else {
                    await interaction.reply(`${opponent.username} has declined the challenge.`);
                }
                collector.stop();
            });

            collector.on('end', collected => {
                if (collected.size === 0) {
                    sentMessage.edit({
                        content: `${opponent.username} did not respond in time. Challenge canceled.`,
                        components: [] // Remove buttons
                    });
                }
            });
        });

        function startMathBattle(message, challenger, opponent, lang) {
            let challengerPoints = 0;
            let opponentPoints = 0;

            const battle = setInterval(() => {
                const num1 = Math.floor(Math.random() * 199) - 99;
                const num2 = Math.floor(Math.random() * 199) - 99;
                const operations = ['+', '-', '*', '/', '%'];
                const operation = operations[Math.floor(Math.random() * operations.length)];

                const question = `${num1} ${operation} ${num2}`;
                let correctAnswer;

                switch (operation) {
                    case '+':
                        correctAnswer = num1 + num2;
                        break;
                    case '-':
                        correctAnswer = num1 - num2;
                        break;
                    case '*':
                        correctAnswer = num1 * num2;
                        break;
                    case '/':
                        correctAnswer = num2 !== 0 ? (num1 / num2).toFixed(2) : 'undefined';
                        break;
                    case '%':
                        correctAnswer = num2 !== 0 ? num1 % num2 : 'undefined';
                        break;
                }

                message.channel.send(`Math battle: ${challenger.username} vs ${opponent.username}!\nSolve: **${question}**`);

                const answerFilter = response => {
                    return (
                        [challenger.id, opponent.id].includes(response.author.id) &&
                        response.content.trim() === correctAnswer.toString()
                    );
                };

                message.channel.awaitMessages({ filter: answerFilter, max: 1, time: 15000, errors: ['time'] })
                    .then(collected => {
                        const winner = collected.first().author;

                        if (winner.id === challenger.id) {
                            challengerPoints += 1;
                            message.channel.send(`${challenger.username} scores a point!`);
                        } else {
                            opponentPoints += 1;
                            message.channel.send(`${opponent.username} scores a point!`);
                        }
                    })
                    .catch(() => {
                        message.channel.send('Time is up! No one answered correctly.');
                    });
            }, 10000);

            setTimeout(() => {
                clearInterval(battle);
                message.channel.send(`Battle over! Final score: ${challenger.username} - ${challengerPoints}, ${opponent.username} - ${opponentPoints}`);

                const leaderboardPath = path.join(__dirname, '../leaderboard.json');
                let leaderboard = {};

                if (fs.existsSync(leaderboardPath)) {
                    try {
                        const data = fs.readFileSync(leaderboardPath, 'utf8');
                        if (data) {
                            leaderboard = JSON.parse(data);
                        }
                    } catch (error) {
                        console.error('Error parsing JSON:', error);
                    }
                } else {
                    fs.writeFileSync(leaderboardPath, '{}');
                }

                if (challengerPoints === opponentPoints) {
                    message.channel.send('It\'s a tie!');

                    if (!leaderboard[challenger.username]) {
                        leaderboard[challenger.username] = 1;
                        message.channel.send(`${challenger.username} added to leaderboard with 1 point!`);
                    } else {
                        leaderboard[challenger.username] += 1;
                        message.channel.send(`${challenger.username} now has ${leaderboard[challenger.username]} points!`);
                    }

                    if (!leaderboard[opponent.username]) {
                        leaderboard[opponent.username] = 1;
                        message.channel.send(`${opponent.username} added to leaderboard with 1 point!`);
                    } else {
                        leaderboard[opponent.username] += 1;
                        message.channel.send(`${opponent.username} now has ${leaderboard[opponent.username]} points!`);
                    }

                } else if (challengerPoints > opponentPoints) {
                    message.channel.send(`${challenger.username} wins!`);

                    if (!leaderboard[challenger.username]) {
                        leaderboard[challenger.username] = 2;
                        message.channel.send(`${challenger.username} added to leaderboard with 2 points!`);
                    } else {
                        leaderboard[challenger.username] += 2;
                        message.channel.send(`${challenger.username} now has ${leaderboard[challenger.username]} points!`);
                    }

                } else {
                    message.channel.send(`${opponent.username} wins!`);

                    if (!leaderboard[opponent.username]) {
                        leaderboard[opponent.username] = 2;
                        message.channel.send(`${opponent.username} added to leaderboard with 2 points!`);
                    } else {
                        leaderboard[opponent.username] += 2;
                        message.channel.send(`${opponent.username} now has ${leaderboard[opponent.username]} points!`);
                    }
                }

                fs.writeFileSync(leaderboardPath, JSON.stringify(leaderboard, null, 2));
                message.channel.send(math.responses.check_leaderboard[lang]);

            }, 60000); // Battle lasts 60 seconds (6 rounds)
        }
    }
}
