const cron = require('node-cron');

const getVideos = require('./functions/getVideos');
const hasNewVideo = require('./functions/hasNewVideo');
const writeVideosToFile = require('./functions/writeVideosToFile');
const sendTelegramMessage = require('./functions/sendTelegramMessage');

const Job = cron.schedule('* * * * *', () => {
  getVideos((err, videos) => {
    if (err) return console.log(err);

    hasNewVideo(videos, (err, res) => {
      if (err) return console.log(err);

      writeVideosToFile(videos, err => {
        if (err) return console.log(err);
      });

      if (res)
        sendTelegramMessage(err => {
          if (err) return console.log(err);
        });
    });
  });
});

module.exports = Job;