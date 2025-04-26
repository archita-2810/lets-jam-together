import { Player } from "discord-player";
import { getPlayer } from "./music/ini.js";

// const queue = new Map();
let playerInstance;

export const voiceplayer = async (client, interaction, query) => {
  if (!playerInstance) {
    playerInstance = new Player(client);
  }

  const player = playerInstance;
  const channel = interaction.member.voice.channel;

  if (!channel) {
    await interaction.followUp("❗ Please join a voice channel first.");
    return;
  }

  const searchResult = await player.search(query, {
    requestedBy: interaction.user,
  });

  if (!searchResult || !searchResult.tracks.length) {
    await interaction.followUp("🚫 No results found for your query.");
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

  queue.addTrack(searchResult.tracks[0]);
  if (!queue.playing) await queue.play();

  await interaction.followUp(
    `🎵 Now playing: **${searchResult.tracks[0].title}**`
  );
};
