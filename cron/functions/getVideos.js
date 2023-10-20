const { google } = require('googleapis');

const playlistId = 'PLu8dqlGDh4GHw2RKPjbPgapZgqJBB3xex';

module.exports = callback => {
  const youtube = google.youtube({
    version: 'v3',
    auth: process.env.GOOGLE_API
  });

  youtube.playlistItems.list({
    part: 'contentDetails',
    playlistId,
    maxResults: 50
  }).then(res => {
    if (!res.data.items) return callback('No videos found.');

    const videos = res.data.items
      .map(item => item.contentDetails.videoId)
      .sort((a, b) => a - b)
      .join(',');
    
    callback(null, videos);
  }).catch(err => {
    callback(err);
  });
};