const { SlashCommandBuilder } = require("discord.js");
const db = require("../../database/init.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("Provides DailyRoll stats about the user."),
  async execute(interaction) {
    // interaction.user is the object representing the User who ran the command
    // interaction.member is the GuildMember object, which represents the user in the specific guild

    let rolls = 0;
    let score = 0;
    let user = db.prepare("SELECT * FROM users WHERE id = ?").get(userId);
    if (!user) {
      await interaction.reply("No stats found for user. ");
      return;
    }
    await interaction.reply(
      `${interaction.user.username} stats \nRolls ${rolls} \nScore ${score}`
    );
  },
};
//  Stats that show How many times user has rolled , score
// Rolls 25  -
// Score 67
