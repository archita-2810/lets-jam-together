import { getPlayer } from "./initiating.js";

export const skiptrack = async (interaction) => {
    const player = getPlayer();
    await interaction.deferReply();
    
    const queue = player.nodes.get(interaction.guildId);

    if(!queue.playing || !queue.node.isPlaying()){
        return await interaction.reply("🚫 Nothing is playing right now.");
    }

    await queue.node.skip();
    await interaction.reply("⏭️ Skipped to the next track.");
}