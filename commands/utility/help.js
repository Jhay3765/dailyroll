const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Get a list of available commands and their descriptions!"),

  async execute(interaction) {
    await interaction.reply(
      "Type /ping to check the bot's responsiveness.\nType /server to get information about the server.\nType /roll to roll a dice."
    );
  },
};
