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
