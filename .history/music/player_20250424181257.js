import {
  AudioPlayerStatus,
  createAudioResource,
  joinVoiceChannel,
  createAudioPlayer,
} from "@discordjs/voice";
import lavacord from "lavacord";
const {Client} = lavacord
// import { getOrCreateConnection } from "./player.js";

const queue = new Map();

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
    // console.log(queue);
    entry = { connection, player };
  }

  return entry;
};

export const voiceplayer = async (interaction, youtubeUrl) => {
  const { player } = getOrCreateConnection(interaction);
  // console.log(player);

  const stream = await ytdl(youtubeUrl, {
    filter: "audioonly",
    quality: "highestaudio",
    highWaterMark: 1 << 25,
  });
  // console.log("we get the yturl", youtubeUrl);

  const resource = createAudioResource(stream);
  return new Promise((resolve, reject) => {
    player.play(resource);

    player.once(AudioPlayerStatus.Playing, () => {
      console.log("🎧 Audio is now playing!");
      interaction.followUp(`🎶 Now playing: ${yturl}`).catch(() => {});
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
