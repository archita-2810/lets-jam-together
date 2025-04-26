// making this using queueMap
import {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
  VoiceConnectionStatus,
  entersState,
} from "@discordjs/voice";

const queue = new Map();

export const getOrCreateConnection = (interaction) => {
  const gid = interaction.guild.id;
  let entry = queue.get(gid);

  if(!entry) {
    const channel = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.
    })
  }
}