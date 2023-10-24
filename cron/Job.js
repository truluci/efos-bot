const cron = require('node-cron');
const fs = require('fs');
const path = require('path');

const getVideos = require('./functions/getVideos');
const hasNewVideo = require('./functions/hasNewVideo');
const writeVideosToFile = require('./functions/writeVideosToFile');
const sendTelegramMessage = require('./functions/sendTelegramMessage');

const schedule = fs.readFileSync(path.join(__dirname, './data/schedule.txt'), 'utf-8');

const Job = cron.schedule(schedule, () => {
  getVideos((err, videos) => {
    if (err) return console.log(err);

    hasNewVideo(videos, (err, newVideos) => {
      if (err) return console.log(err);

      writeVideosToFile(videos, err => {
        if (err) return console.log(err);
      });

      if (newVideos)
        sendTelegramMessage(newVideos, err => {
          if (err) return console.log(err);

          console.log('Message sent!');
        });
    });
  });
});

module.exports = Job;