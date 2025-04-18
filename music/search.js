import yts from "yt-search";
import { google } from "googleapis";

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY,
});

async function searchYouTube(trackName, artistName) {
  try {
    const res = await youtube.search.list({
      part: "snippet",
      q: `${trackName} ${artistName}`,
      type: "video",
      maxResults: 1,
    });
    return res.data.items[0].id.videoId;
  } catch (error) {
    console.error("Error searching YouTube:", error);
    return null;
  }
}

export { searchYouTube };
