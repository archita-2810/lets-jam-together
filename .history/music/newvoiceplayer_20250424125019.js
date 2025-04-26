import {
  AudioPlayerStatus,
  createAudioResource,
  joinVoiceChannel,
  createAudioPlayer,
} from "@discordjs/voice";
import { Client } from "lavacord"; // Lavalink client
// import { getOrCreateConnection } from "./player.js";

const queue = new Map();
let lavalinkClient = null;

const initializeLavalink = () => {
  lavalinkClient = new Client({
    // Lavalink server configuration
    host: "localhost", // Lavalink host (adjust as per your setup)
    port: 2333, // Lavalink port (default 2333)
    password: "youshallnotpass", // Lavalink password (default 'youshallnotpass')
  });

  lavalinkClient.connect();
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
  const { player } = getOrCreateConnection(interaction);

  // Ensure Lavalink is initialized
  if (!lavalinkClient) initializeLavalink();

  // Fetch the track from Lavalink instead of ytdl-core-discord
  const track = await lavalinkClient.load(youtubeUrl); // Use Lavalink to fetch the track

  if (track.loadType === "LOAD_FAILED") {
    throw new Error("Failed to load the track");
  }

  const resource = createAudioResource(track.tracks[0].url, {
    inputType: AudioPlayerStatus.Playing, // Lavalink stream URL
  });

  return new Promise((resolve, reject) => {
    player.play(resource);

    player.once(AudioPlayerStatus.Playing, () => {
      console.log("🎧 Audio is now playing!");
      interaction
        .followUp(`🎶 Now playing: ${track.tracks[0].title}`)
        .catch(() => {});
    });

    player.once(AudioPlayerStatus.Idle, () => {
      console.log("🔁 Track ended.");
      resolve();
    });

    player.once("error", (error) => {
      console.error("❌ Error playing audio:", error.message);
      reject(error);
    });
  });
};
