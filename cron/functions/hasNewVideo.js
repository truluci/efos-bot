const fs = require('fs');
const path = require('path');

module.exports = (videos, callback) => {
  fs.readFile(path.join(__dirname, `../data/playlist.txt`), 'utf8', (err, data) => {
    if (err) return callback(err);

    let newVideos = null;
    if (data.length < videos.length) {
      newVideos = videos.split(',').filter(video => !data.includes(video));
    };

    callback(null, newVideos);
  });
};