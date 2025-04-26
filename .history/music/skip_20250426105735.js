import { getPlayer } from "./initiating";

export const skiptrack = async (interaction) => {
    const player = getPlayer();
    const queue = player.nodes.get(interaction.guildId);

    if(!queue.playing || !queue.node.isPlaying()){
        return await interaction.reply("🚫 Nothing is playing right now.");
    }

    
}