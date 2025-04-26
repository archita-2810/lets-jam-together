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
    .setName("nowplaying")
    .setDescription("🎶 Shows the song currently playing."),
].map((command) => command.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

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
