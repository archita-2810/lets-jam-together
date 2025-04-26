import { getPlayer } from "./initiating.js";
import playdl from "play-dl";

export const voiceplayerI = async (interaction, query) => {
  const player = getPlayer();
  // console.log("i am player - ", player);
  const channel = interaction.member.voice.channel;
  // console.log("here channel - ", channel);

  if (!channel) {
    await interaction.followUp("❗ Please join a voice channel first.");
    return;
  }

  const queue = await player.nodes.create(interaction.guild);
  queue.metadata = {
    channel: interaction.channel,
  };

  // console.log("this is queue - ", queue);
  try {
    if (!queue.connection) {
      console.log("🔗 Connecting to voice channel...");
      await queue.connect(channel);
    }
  } catch (error) {
    console.error("❌ Error connecting to voice channel:", error);
    queue.destroy();
    await interaction.followUp("❌ Failed to join the voice channel.");
    return;
  }

  const searchResult = await playdl.search(query, { limit: 1 });
  // console.log("this is search result - ", searchResult);
  if (!searchResult.length) {
    await interaction.followUp("🚫 No results found on YouTube.");
    return;
  }

  const videoUrl = searchResult[0].url;
  // console.log("this is video url - ", videoUrl);

  const result = await player.search(videoUrl, {
    requestedBy: interaction.user,
  });
  // console.log("this is result - ", result.tracks);

  if (!result || !result.tracks.length) {
    await interaction.followUp("🚫 Could not play the provided YouTube URL.");
    return;
  }
  const track = result.tracks[0];
  // console.log("this is track - ", track);
  queue.addTrack(track);
  try {
    if (!queue.playing && !queue.node.isPlaying()) {
      await queue.node.play();
      // console.log("Playing track:", track.title);
      // await interaction.followUp(`🎵 Now playing: **${track.title}**`);
    }
  } finally {
    queue.tasksQueue.release();
  }
};
