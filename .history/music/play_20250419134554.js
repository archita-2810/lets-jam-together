import dotenv from "dotenv";
// import nowplaying from "./nowplaying.js";
dotenv.config();

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
let trackDetails = [];

const play = async (interaction, playlistUrl) => {
  //   console.log("🎧 Received playlist:", playlistUrl);
  const parts = playlistUrl.split("/");
  const urltobepassed = parts[parts.length - 1];
  const playlistId = urltobepassed.split("?")[0];
  //   console.log(urltobepassed);

  const token = await getAccessToken();

  const tracks = await getPlaylistTracks(playlistId, token);

  trackDetails = [];

  tracks.slice(0, trackDetails.length).forEach(async (item, index) => {
    const track = item.track;
    const trackName = track.name;
    const artistName = track.artists.map((a) => a.name).join(", ");

    trackDetails.push({ trackName, artistName });

    // console.log(`#${index}: ${trackName} by ${artistName}`);
  });
  await interaction.reply(`✅ Starting to play playlist: ${playlistUrl}`);
  return trackDetails;
};

const getAccessToken = async () => {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(`${client_id}:${client_secret}`).toString("base64"),
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
  });

  const data = await res.json();
  return data.access_token;
};

const getPlaylistTracks = async (playlistId, token) => {
  const res = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();
  return data.items;
};

export { trackDetails, play };
