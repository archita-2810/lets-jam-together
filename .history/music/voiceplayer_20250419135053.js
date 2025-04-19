import {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
  VoiceConnectionStatus,
  entersState,
} from "@discordjs/voice";
import ytdl from "@distube/ytdl-core";

export const playInVoice = async (interaction, youtubeUrl) => {
  const channel = interaction.member.voice.channel;
  // console.log(channel);

  if (!channel) {
    await interaction.followUp("❌ You need to be in a voice channel!");
    return;
  }

  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
  });

  const stream = ytdl(youtubeUrl, {
    filter: "audioonly",
    quality: "highestaudio",
    highWaterMark: 1 << 25,
  });

  const resource = createAudioResource(stream);
  const player = createAudioPlayer();

  return new Promise(async (resolve, reject) => {
    try {
      await entersState(connection, VoiceConnectionStatus.Ready, 30_000);

      player.on(AudioPlayerStatus.Playing, () => {
        console.log("🎧 Audio is now playing!");
      });

      player.on(AudioPlayerStatus.Idle, () => {
        console.log("🔁 Track ended.");
        connection.destroy();
        resolve();
      });

      player.on("error", (error) => {
        console.error("❌ Error playing audio:", error.message);
        connection.destroy();
        reject(error);
      });

      connection.subscribe(player);
      player.play(resource);

      await interaction.followUp(`🎶 Now playing: ${youtubeUrl}`);
    } catch (error) {
      connection.destroy();
      reject(error);
    }
  });
};
