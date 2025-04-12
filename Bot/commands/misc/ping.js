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
