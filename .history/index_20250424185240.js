import { Client, Events, GatewayIntentBits } from "discord.js";
// const commands = require("./command");
import { trackDetails, play } from "./music/play.js";
import nowplaying from "./music/nowplaying.js";
import lavacord from "lavacord";
const { Client: LavacordClient } = lavacord;

let lavalinkClient;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

const nodes = [
  {
    id: "main",
    host: "localhost",
    port: 2333,
    password: "youshallnotpass",
  },
];

lavalinkClient = new LavacordClient(client, nodes);



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
  }
});
