import { getPlayer } from "./initiating.js";

export const resumeMusic = async (interaction) => {
  const player = getPlayer();
  await interaction.deferReply();
  
  const queue = player.nodes.get(interaction.guild.id);

  if (!queue || queue.node.isPlaying()) {
    await interaction.followUp("▶️ Music is already playing.");
    return;
  }

  queue.node.resume();
  await interaction.followUp("▶️ Music resumed.");
};
