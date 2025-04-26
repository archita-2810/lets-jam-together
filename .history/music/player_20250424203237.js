import { Player } from "discord-player";
import { getPlayer } from "./initiating.js";

// const queue = new Map();
// let playerInstance;

export const voiceplayer = async (interaction, youtubeUrl) => {
    const player = getPlayer();
    const channel = interaction.member.voice.channel;
  
    if (!channel) {
      await interaction.followUp("❗ Please join a voice channel first.");
      return;
    }
  
    const queue = await player.createQueue(interaction.guild, {
      metadata: {
        channel: interaction.channel,
      },
    });
  
    try {
      if (!queue.connection) {
        await queue.connect(channel);
      }
    } catch (error) {
      console.error("❌ Error connecting to voice channel:", error);
      queue.destroy();
      await interaction.followUp("❌ Failed to join the voice channel.");
      return;
    }
  
    // No need to search — just use the URL
    const track = await player.search(youtubeUrl, {
      requestedBy: interaction.user,
    });
  
    if (!track || !track.tracks.length) {
      await interaction.followUp("🚫 Could not play the provided YouTube URL.");
      return;
    }
  
    queue.addTrack(track.tracks[0]);
    if (!queue.playing) await queue.play();
  
    await interaction.followUp(
      `🎵 Now playing: **${track.tracks[0].title}**`
    );
  };
  
