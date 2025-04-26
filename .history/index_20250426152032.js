import { Client, Events, GatewayIntentBits } from "discord.js";
// const commands = require("./command");
import { trackDetails, play } from "./music/play.js";
import nowplaying from "./music/nowplaying.js";
import { initPlayer, getPlayer } from "./music/initiating.js";
import { skiptrack } from "./music/skip.js";
import { pauseMusic } from "./music/pause.js";
import { resumeMusic } from "./music/resume.js";
import { showQueue } from "./music/queue.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once("ready", () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);
  initPlayer(client);
});


client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  message.reply({
    content: "Hie from Bot <3",
  });
});

client.login(process.env.DISCORD_BOT_TOKEN);

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const commandName = interaction.commandName;
  if (commandName === "ping") {
    await interaction.reply("🏓 Pong!");
  } else if (commandName === "play") {
    const playlistUrl = interaction.options.getString("playlist");
    // console.log(playlistUrl);
    const trackDetails = await play(interaction, playlistUrl);

    await nowplaying(interaction, trackDetails);
  } else if (commandName === "nowplaying") {
    await nowplaying(interaction, trackDetails);
  } else if (commandName === "skip") {
    await skiptrack(interaction);
  } else if (commandName === "pause") {
    await pauseMusic(interaction);
  } else if (commandName === "resume") {
    await resumeMusic(interaction);
  } else if (commandName === "queue") {
    await showQueue(interaction);
  }
});
