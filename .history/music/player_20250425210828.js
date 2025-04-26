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
  console.log("this is search result - ", searchResult);
  if (!searchResult.length) {
    await interaction.followUp("🚫 No results found on YouTube.");
    return;
  }

  const videoUrl = searchResult[0].url;
  console.log("this is video url - ", videoUrl);

  const result = await player.search(videoUrl, {
    requestedBy: interaction.user
  });
  console.log(result);

  if (!result || !track.tracks.length) {
    await interaction.followUp("🚫 Could not play the provided YouTube URL.");
    return;
  }
  const entry = queue.tasksQueue.acquire();

  await entry.getTask();
  queue.addTrack(videoUrl);
  try {
    if (!queue.playing && !queue.node.isPlaying()) {
      console.log("Playing track:", track.tracks[0].title);
      await queue.node.play();
    }
  } finally {
    queue.tasksQueue.release();
  }

  await interaction.followUp(`🎵 Now playing: **${track.tracks[0].title}**`);
};
