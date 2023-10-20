const fs = require('fs');
const path = require('path');

module.exports = (data, callback) => {
  fs.writeFile(path.join(__dirname, `../data/playlist.txt`), data, err => {
    if (err) return callback(err);

    callback(null);
  });
};
