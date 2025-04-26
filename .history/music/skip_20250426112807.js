import { getPlayer } from "./initiating.js";

export const skiptrack = async (interaction) => {
  const player = getPlayer();
  const channel = interaction.member.voice.channel;

  if (!channel) {
    if (!interaction.replied) {
      await interaction.reply("please join a voice channel.");
    }
    return;
  }

  const queue = await player.nodes.get(interaction.guild.id);

  if (!queue) {
    if (!interaction.replied) {
      await interaction.reply("no music is currently playing.");
    }
    return;
  }

  try {
    const currentTrack = queue.currentTrack;
    queue.node.skip();
    if (!interaction.replied) {
      await interaction.reply(`⏭️ Skipping: **${currentTrack.title}**`);
    }
  } catch (error) {
    console.error("error skipping track:", error);

    if (!interaction.replied) {
      await interaction.reply("an error occurred while skipping the track.");
    }
  }
};
