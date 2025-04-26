import { getPlayer } from "./initiating.js";

export const pauseMusic = async (interaction) => {
  const player = getPlayer();
  await interaction.deferReply();

  const queue = player.nodes.get(interaction.guild.id);

  if (!queue || !queue.node.isPlaying()) {
    await interaction.followUp("no music is currently playing.");
    return;
  }

  queue.node.pause();
  await interaction.followUp("music paused.");
};
