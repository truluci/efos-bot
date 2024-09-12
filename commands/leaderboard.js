const { leaderboard } = require('../config.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: leaderboard.info.name,
    description: leaderboard.info.description,
    detailedDescription: leaderboard.info.detailedDescription,
    triggers: leaderboard.info.triggers,

    execute(message) {
        const lang = message.content.toLowerCase().split(' ')[0] == this.triggers[0] ? 'en' : 'tr';

        const users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../leaderboard.json'), 'utf8'));

        const sortedUsers = Object.keys(users).sort((a, b) => users[b] - users[a]);

        let leaderboardList = '';
        for (let i = 0; i < sortedUsers.length; i++) {
            if (!sortedUsers[i]) break;
            leaderboardList += `${i + 1}. ${sortedUsers[i]} | ${users[sortedUsers[i]]} points\n`;
        }

        message.channel.send(leaderboardList);
    }
}