import { searchYouTube } from "./search.js";
import { voiceplayer } from "./newvoiceplplayer.js";

const nowplaying = async (interaction, trackDetails) => {
  for (const track of trackDetails) {
    const videoId = await searchYouTube(track.trackName, track.artistName);
    if (videoId) {
      const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
      try {
        await voiceplayer(interaction, youtubeUrl);
      } catch (error) {
        await interaction.followUp("❌ Error playing track.");
      }
    }
  }
};

export default nowplaying;
