# Discord Bot Template
A powerful and easy-to-use template to get started with **Discord.js** bots. This template simplifies the process of creating, customizing, and running your Discord bots with JavaScript. Perfect for developers looking to automate actions within Discord servers, create custom interactions, and manage users seamlessly.

## 📦 Features
- **Slash Command Support**: Easily add slash commands for your bot.
- **Modular**: Extend the bot with new commands and features.
- **Ready to Use**: Pre-configured for quick deployment.

## 🚀 Getting Started

Follow these simple steps to set up and deploy your bot:

### 1. **Download & Extract the Template**
- **Download** the template as a ZIP file from GitHub.
- **Extract** the contents to a directory on your machine.

### 2. **Open the Folder in a Code Editor**
- Open the extracted folder in your **preferred code editor** (e.g., [VSCode](https://code.visualstudio.com/), Sublime Text, etc.).

### 3. **Setup `config.json`**
- Open the `config.json` file and **replace the placeholders** with your bot's details.

    Example `config.json`:
    ```json
    {
        "clientToken": "YOUR_BOT_TOKEN_HERE",
        "inTesting": true,
        "testServerId": "YOUR_GUILD_ID_HERE",
        "partials": ["MESSAGE", "CHANNEL", "REACTION"],
        "ignoreBots": true
    }
    ```

    - **`clientToken`**: Paste your bot's **token** (found in the [Discord Developer Portal](https://discord.com/developers/applications)).
    - **`inTesting`**: If `true`, commands will only be registered in your test server.
    - **`testServerId`**: Your **Discord server's ID** where you want to test the bot.
    - **`partials`**: Optional. Choose which parts of the Discord API you want the bot to cache.
    - **`ignoreBots`**: Set to `true` to prevent bots from triggering events in the bot.

### 4. **Install Dependencies**
- Open a terminal in the project folder and run:

    ```bash
    npm install
    ```

    This will install **Discord.js** and any other necessary dependencies for the bot.

### 5. **Run the Bot**
- Once the dependencies are installed, start the bot by running:

    ```bash
    node .
    ```
    or
    ```bash
    npm start
    ```
    Your bot should now be online and visible in your **Discord server**.

---

## 📝 Example Command

Here’s a basic example of a **slash command** that your bot will respond to. This command has already been created for you and can be found in the `commands > misc` directory.

```javascript
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!')
        .addBooleanOption(option => option.setName('include_response_time').setDescription('Include response time in milliseconds')),
    
    async execute(interaction) {
        await interaction.deferReply();
        const includeResponse = interaction.options.getBoolean('include_response_time');
        interaction.editReply({ content: `Pong! ${includeResponse ? `${Date.now() - interaction.createdTimestamp}ms` : ''}` });
    }
};
```
## ⚡ Usage

To use the **/ping** command, type the following in your Discord server:

```bash
/ping [True|False]
```

### 6. **Tools Used**
   - **[Discord.js](https://discord.js.org/)**: The library used for bot interaction with the Discord API.
   - **[Node.js](https://nodejs.org/)**: JavaScript runtime used for running the bot.

### 7. **License**
   - This project is open-source and licensed under the **[MIT License](https://opensource.org/licenses/MIT)**.
