const { Client, Collection, IntentsBitField, ActivityType, REST, Routes } = require('discord.js');
const config = require('./config.json');
const fs = require('fs');
const path = require('path');

const client = new Client({ 
    intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent, IntentsBitField.Flags.DirectMessages], 
    partials: config.partials
});

client.commands = new Collection();
let commands = [];

function includeFromDirectory(directoryPath = "") {
    const files = fs.readdirSync(directoryPath).filter(file => file.endsWith('.js'));
    if (files.length === 0) return console.log(`COULD NOT FIND JS FILES IN ${directoryPath.toUpperCase()}`);

    files.forEach((file) => {
        const filePath = path.join(directoryPath, file);
        const props = require(filePath);
        console.log(`${file} Loaded Successfully`);

        client.commands.set(props.data.name, props);
        commands.push(props.data.toJSON());
    });
}

includeFromDirectory(path.join(__dirname, "commands", "misc"));

const rest = new REST({ version: '10' }).setToken(config.clientToken);

// One time listener to ready up the bot. Sets up presence and registers commands.
client.once('ready', async () => {
    console.log(`${client.user.username} is now online`);
    client.user.setPresence({ activities: [{ name: "Slash Commands", type: ActivityType.Listening }], status: 'dnd' });

    if (config.testServerId.length < 1) {
        console.log("testServerId is empty! Provide a guild id");
        process.exit(1);
    }

    if (commands.length === 0) return;

    try {
        console.log('Registering slash commands...');

        if (config.inTesting) {
            await rest.put(Routes.applicationGuildCommands(client.user.id, config.testServerId), { body: commands });
        } else {
            await rest.put(Routes.applicationCommands(client.user.id), { body: commands });
        }
        console.log('Registered commands successfully!');
    } catch (error) {
        console.error('Error registering slash commands: ', error);
    }
});


// Listener for interactionCreate
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.member.user.bot && config.ignoreBots) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'An unknown error occured. Please try again later.' });
    }
});

// Listener for messageCreate
client.on('messageCreate', async (message) => {
    if (message.author.bot && config.ignoreBots) return;

    // Your logic here if necessary.
});

// Validates if clientToken from config file is not empty before attempting to login
if (config.clientToken.length === 0) {
    console.log("clientToken is not provided!");
    process.exit(1);
} else {
    client.login(config.clientToken);
}
