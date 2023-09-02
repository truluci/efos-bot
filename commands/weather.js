// const fetch = require('node-fetch');

// // Define friends and their locations
// const friends = {
//   faruk: { city: 'Glasgow', country: 'Scotland' },
//   necip: { city: 'Istanbul', country: 'Turkey' },
//   mevlut: { city: 'Ankara', country: 'Turkey' },
// };

// const apiKey = '59529ca47a2159c46f74600b0dbb9521';
// const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

// module.exports = {
//   name: 'hava',
//   description: 'Get weather information for a friend.',
//   async execute(message, args) {
//     if (!args.length) {
//       return message.reply('kimin için hava durumu istiyorsun düzgün kullan');
//     }

//     const friendName = args[0].toLowerCase();
//     const friend = friends[friendName];

//     if (!friend) {
//       return message.reply('kimin için hava durumu istiyorsun düzgün kullan');
//     }

//     const { city, country } = friend;
//     const params = new URLSearchParams({
//       q: `${city},${country}`,
//       appid: apiKey,
//       units: 'metric', // Use 'imperial' for Fahrenheit
//     });

//     try {
//       const response = await fetch(`${apiUrl}?${params.toString()}`);
//       if (!response.ok) {
//         throw new Error(`Weather API request failed: ${response.statusText}`);
//       }

//       const weatherData = await response.json();
//       const temperature = weatherData.main.temp;
//       const weatherDescription = weatherData.weather[0].description;

//       message.reply(`The weather in ${city}, ${country} is ${temperature}°C with ${weatherDescription}.`);
//     } catch (error) {
//       console.error(error);
//       message.reply('data çekerken hata çıktı amk.');
//     }
//   },
// };
