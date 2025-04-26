import { Client, Events, GatewayIntentBits } from "discord.js";
import { trackDetails, play } from "./music/play.js";
import nowplaying from "./music/nowplaying.js";
import lavacord from "lavacord";
const { Manager } = lavacord;

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

// Login first so client.user is available
client.login(process.env.DISCORD_BOT_TOKEN);

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);

  lavalinkClient = new Manager(client, nodes, {
    user: client.user.id,
    shards: client.shard?.count ?? 1, // Use 1 if not sharded
  });

  lavalinkClient.connect();

  // These listeners must be added after lavalinkClient is initialized
  client.ws.on("VOICE_STATE_UPDATE", (data) => {
    lavalinkClient.voiceStateUpdate(data);
  });

  client.ws.on("VOICE_SERVER_UPDATE", (data) => {
    lavalinkClient.voiceServerUpdate(data);
  });
});

export { lavalinkClient };

// Bot response on message
client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  message.reply({
    content: "Hie from Bot <3",
  });
});

// Handle slash command interactions
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const commandName = interaction.commandName;
  if (commandName === "ping") {
    await interaction.reply("🏓 Pong!");
  } else if (commandName === "play") {
    const playlistUrl = interaction.options.getString("playlist");
    const trackDetails = await play(interaction, playlistUrl);
    await nowplaying(interaction, trackDetails);
  } else if (commandName === "nowplaying") {
    await nowplaying(interaction, trackDetails);
  }
});
