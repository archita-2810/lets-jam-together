import { getPlayer } from "./initiating.js";

export const skiptrack = async (interaction) => {
  const player = getPlayer();
  const channel = interaction.member.voice.channel;

  if (!channel) {
    if (!interaction.replied) {
      await interaction.reply("❗ Please join a voice channel first.");
    }
    return;
  }

  const queue = await player.nodes.get(interaction.guild.id);

  if (!queue) {
    if (!interaction.replied) {
      await interaction.reply("🚫 No music is currently playing.");
    }
    return;
  }

  try {
    const currentTrack = queue.currentTrack;
    queue.node.skip();

    // Only reply once
    if (!interaction.replied) {
      await interaction.reply(`⏭️ Skipping: **${currentTrack.title}**`);
    }
  } catch (error) {
    console.error("❌ Error skipping track:", error);

    if (!interaction.replied) {
      await interaction.reply("❌ An error occurred while skipping the track.");
    }
  }
};
