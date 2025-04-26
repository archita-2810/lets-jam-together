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
    // Skip the current track
    const currentTrack = queue.currentTrack;
    queue.skip();

    // Only reply once
    if (!interaction.replied) {
      await interaction.reply(`⏭️ Skipping: **${currentTrack.title}**`);
    }
  } catch (error) {
    console.error("❌ Error skipping track:", error);

    // Check if interaction has already been replied to
    if (!interaction.replied) {
      await interaction.reply("❌ An error occurred while skipping the track.");
    }
  }
};
