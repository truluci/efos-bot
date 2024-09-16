# EFOS Bot

EFOS Bot is a versatile Discord bot designed to enhance the user experience on Discord servers. It is built using Node.js and leverages the discord.js library to interact with the Discord API. The bot is equipped with a variety of commands and utilities that can be used for moderation, entertainment, and information purposes.

## Features

- **Avatar Command**: Allows users to change the bot's avatar with a provided link. Admin approval is required for non-admin users.
- **Duration Utility**: Tracks and reports the duration a user has spent in a voice channel.
- **Greeting Utility**: Welcomes users when they join the server.
- **Help Command**: Provides detailed information about other commands.
- **Keyword Responses**: The bot can respond to specific keywords with predefined messages.
- **Outro Command**: Plays an outro for a specified user when they leave a voice channel.
- **Translation Utility**: Translates messages in specified channels.
- **Voting System**: Facilitates voting within the server with admin-defined affirmations.
- **Weather Command**: Provides weather information for specified cities.
- **Math Command**: allows users to challenge each other to a timed math battle with random arithmetic questions.
- **Leaderboard Command**: displays the top users ranked by points earned from various challenges.

## Dependencies

EFOS Bot relies on several npm packages to function properly:

- `@discordjs/opus`: For voice connections.
- `@discordjs/voice`: For handling voice states and streams.
- `discord.js`: The core framework for interacting with Discord.
- `dotenv`: To manage environment variables.
- `ffmpeg-static`: To handle media streams.
- `google-translate-api-x`: For translation features.
- `libsodium-wrappers`: For encryption and decryption.
- `node-fetch`: To make HTTP requests.
- `valid-url`: To validate URLs provided to the bot.

## Configuration

The bot's behavior can be customized through the `config.dev.js` file, which includes language-specific responses and command triggers.

## Localization

EFOS Bot supports multiple languages, making it accessible to a wider audience. The responses and command descriptions are available in English and Turkish.

## Contribution

Contributions are welcome! If you have a feature request, bug report, or a pull request, please feel free to contribute to the development of EFOS Bot.

---

For more detailed information on commands and their usage, please refer to the bot's command documentation or use the `help` command within your Discord server.
