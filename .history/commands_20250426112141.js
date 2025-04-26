import { REST, Routes, SlashCommandBuilder } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const commands = [
  new SlashCommandBuilder()
    .setName("skip")
    .setDescription("⏭️ Skips the current song."),
  new SlashCommandBuilder()
    .setName("pause")
    .setDescription("⏸️ Pauses the music."),
  new SlashCommandBuilder()
    .setName("resume")
    .setDescription("▶️ Resumes the paused music."),
  new SlashCommandBuilder()
    .setName("queue")
    .setDescription("📜 Shows the current queue."),
    new SlashCommandBuilder()
    .setName("play")
    .setDescription("🎶 Plays a Spotify playlist.")
    .addStringOption(option => 
      option.setName("playlist")
        .setDescription("Provide the Spotify playlist URL.")
        .setRequired(true)),
].map((command) => command.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_BOT_TOKEN);

(async () => {
  try {
    console.log("🔃 Registering slash commands...");
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });
    console.log("✅ Successfully registered application commands.");
  } catch (error) {
    console.error("❌ Error registering commands:", error);
  }
})();
