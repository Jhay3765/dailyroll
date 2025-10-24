const db = require("../../database/init.js");
const { SlashCommandBuilder } = require("discord.js");

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roll")
    .setDescription("Rolls a dice and returns the result."),

  async execute(interaction) {
    const userId = interaction.user.id;
    const username = interaction.user.username;

    // ✅ Moved inside execute(), now userId exists
    let user = db.prepare("SELECT * FROM users WHERE id = ?").get(userId);

    if (!user) {
      db.prepare("INSERT INTO users (id, username) VALUES (?, ?)").run(
        userId,
        username
      );
    }

    const roll = rollDice();
    const rollDate = new Date().toISOString();
    db.prepare(
      "INSERT INTO rolls (userId, rollValue, rollDate) VALUES (?, ?, ?)"
    ).run(userId, roll, rollDate);
    console.table(db.prepare("SELECT * FROM rolls").all());

    await interaction.reply(`🎲 You rolled a **${roll}**.`);
  },
};
