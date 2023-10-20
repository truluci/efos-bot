const fetch = require('node-fetch');
const { google } = require('googleapis');

module.exports = (newVideos, callback) => {
  const youtube = google.youtube({
    version: 'v3',
    auth: process.env.GOOGLE_API
  });

  youtube.videos.list({
    part: 'snippet',
    id: newVideos.join(',')
  }).then(res => {
    if (!res.data.items) return callback('No videos found.');

    newVideos = res.data.items.map(item => {
      return {
        title: item.snippet.title,
        url: `https://www.youtube.com/watch?v=${item.id}`,
        thumbnail: item.snippet.thumbnails.high.url
      };
    });

    for (let i = 0; i < newVideos.length; i++) {
      fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendPhoto?chat_id=${process.env.TELEGRAM_CHAT_ID}&photo=${newVideos[i].thumbnail}&caption=${newVideos[i].title}%0A${newVideos[i].url}&parse_mode=HTML`)
        .then(res => res.json())
        .then(res => {
          if (!res.ok) return callback(res);

          callback(null, res);
        })
        .catch(err => {
          callback(err);
        });
    };
  }).catch(err => {
    callback(err);
  });
};
