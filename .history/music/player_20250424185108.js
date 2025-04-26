import {
  AudioPlayerStatus,
  createAudioResource,
  joinVoiceChannel,
  createAudioPlayer,
} from "@discordjs/voice";
import lavacord from "lavacord";
const { Client } = lavacord;
import { lavalinkClient } from "../index.js";

const queue = new Map();
// let lavalinkClient = null;

const initializeLavalink = () => {
  if (!lavalinkClient) {
    lavalinkClient = new Client({
      host: "localhost",
      port: 2333,
      password: "youshallnotpass",
    });

    lavalinkClient.connect();
  }
};

export const getOrCreateConnection = (interaction) => {
  const guildId = interaction.guild.id;
  let entry = queue.get(guildId);

  if (!entry) {
    const channel = interaction.member.voice.channel;

    if (!channel) throw new Error("User not in a voice channel");
    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });

    const player = createAudioPlayer();

    connection.subscribe(player);

    connection.on("error", (err) => console.error("Voice Error:", err));
    player.on("error", (err) => console.error("Player Error:", err));

    queue.set(guildId, { connection, player });
    entry = { connection, player };
  }

  return entry;
};

export const voiceplayer = async (interaction, youtubeUrl) => {
  if (!lavalinkClient) initializeLavalink();

  const guildId = interaction.guild.id;
  const node = lavalinkClient.nodes.first();

  if (!node || !node.connected) {
    throw new Error("No Lavalink node connected.");
  }

  const { connection } = getOrCreateConnection(interaction);
  const trackData = await node.load(youtubeUrl);

  if (trackData.loadType === "LOAD_FAILED" || !trackData.tracks.length) {
    throw new Error("Failed to load the track");
  }

  const track = trackData.tracks[0];

  const player =
    (await lavalinkClient.players.get(guildId)) ||
    (await lavalinkClient.join({
      guild: interaction.guild.id,
      channel: interaction.member.voice.channel.id,
      node: node.id,
    }));

  player.play(track.track);

  player.once("start", () => {
    console.log("🎧 Audio is now playing!");
    interaction.followUp(`🎶 Now playing: ${track.info.title}`).catch(() => {});
  });

  player.once("end", () => {
    console.log("🔁 Track ended.");
  });

  player.once("error", (error) => {
    console.error("❌ Lavalink error:", error);
  });
};
