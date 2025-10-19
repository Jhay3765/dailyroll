// Require the necessary discord.js classes
const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");

// ✅ Create a new client instance
const client = new Client({
  intents: [GatewayIntentBits.Guilds], // add more later if needed
});

// ✅ When the client is ready
client.once(Events.ClientReady, (readyClient) => {
  console.log(`✅ Ready! Logged in as ${readyClient.user.tag}`);
});

// ✅ Login to Discord
client.login(token);

// ✅ Load commands
client.commands = new Collection();
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
      console.log(`✅ Loaded command: ${command.data.name}`);
    } else {
      console.log(
        `[⚠️ WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

// ✅ Handle slash commands
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  console.log(`🟡 Received command: ${interaction.commandName}`);

  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) {
    console.error(
      `❌ No command matching ${interaction.commandName} was found.`
    );
    return;
  }

  try {
    console.log(`⚙️ Executing command: ${interaction.commandName}`);
    await command.execute(interaction);
    console.log(`✅ Successfully executed: ${interaction.commandName}`);
  } catch (error) {
    console.error(`❌ Error executing ${interaction.commandName}:`, error);
    try {
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    } catch (err2) {
      console.error("⚠️ Failed to send error message:", err2);
    }
  }
});
