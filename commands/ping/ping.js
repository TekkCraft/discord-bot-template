const ChatMessage = require('./../../chat/chat-message');
const ChatColor = require('./../../chat/chat-color');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        let message = new ChatMessage(`${ChatColor.Red}Pong!${ChatColor.Reset}`);
        message = message.append(`${ChatColor.Cyan} Success!${ChatColor.Reset}`);

        await interaction.reply(message.getMessage());
    },
};
