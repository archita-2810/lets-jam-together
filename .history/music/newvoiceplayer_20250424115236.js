import { AudioPlayerStatus } from "@discordjs/voice";
import { getOrCreateConnection } from "./player.js";

export const voiceplayer = (interaction, yturl) => {
  const { player } = getOrCreateConnection(interaction);

  const stream = ytdl(yturl, {
    filter: "audioonly",
    quality: "highestaudio",
    highWaterMark: 1 << 25,
  });
  const resource = createAudioResource(stream);

  return new Promise((resolve, reject) => {
    player.play(resource);

    player.once(AudioPlayerStatus.Playing, () => {
      console.log("🎧 Audio is now playing!");
      interaction.followUp(`🎶 Now playing: ${yturl}`).catch(() => {});
    });

    player.once(AudioPlayerStatus.Idle, () => {
      console.log("🔁 Track ended.");
      resolve();
    });

    player.once("error", (error) => {
      console.error("❌ Error playing audio:", error.message);
      reject(error);
    });
  });
};
