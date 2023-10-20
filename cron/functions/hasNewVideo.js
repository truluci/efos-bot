const fs = require('fs');
const path = require('path');

module.exports = (videos, callback) => {
  fs.readFile(path.join(__dirname, `../data/playlist.txt`), 'utf8', (err, data) => {
    if (err) return callback(err);

    callback(null, (data != videos) && data.length < videos.length);
  });
};