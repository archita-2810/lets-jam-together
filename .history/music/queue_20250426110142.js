import { getPlayer } from "./initiating.js";

export const showQueue = async (interaction) => {
  const player = getPlayer();
  const queue = player.nodes.get(interaction.guild.id);

  if (!queue || !queue.tracks || queue.tracks.size === 0) {
    await interaction.followUp("📭 Queue is empty.");
    return;
  }

  const queueList = queue.tracks
    .toArray()
    .slice(0, tracks.l)
    .map(
      (track, index) => `${index + 1}. ${track.title} — \`${track.duration}\``
    )
    .join("\n");

  await interaction.followUp(`🎶 **Current Queue:**\n${queueList}`);
};
