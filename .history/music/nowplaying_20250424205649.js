import { searchYouTube } from "./search.js";
import { voiceplayerI } from "./player.js";

const nowplaying = async (interaction, trackDetails) => {
  for (const track of trackDetails) {
    // const videoId = await searchYouTube(track.trackName, track.artistName);
    const query = `${track.trackName} ${track.artistName}`;
    if (query) {
      // const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
      // console.log(youtubeUrl);
      try {
        await voiceplayerI(interaction, query);
      } catch (error) {
        await interaction.followUp("❌ Error playing track.");
      }
    }
  }
};

export default nowplaying;
