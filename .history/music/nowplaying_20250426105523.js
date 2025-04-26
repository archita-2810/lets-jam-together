import { voiceplayerI } from "./player.js";

const nowplaying = async (interaction, trackDetails) => {
  for (const track of trackDetails) {
    const query = `${track.trackName} by ${track.artistName}`;
    if (query) {
      try {
        await voiceplayerI(interaction, query);
      } catch (error) {
        await interaction.followUp("❌ Error playing track.");
      }
    }
  }
};

export default nowplaying;
