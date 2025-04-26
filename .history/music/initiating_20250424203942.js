import { Player } from "discord-player";
import extractorPkg from "@discord-player/extractor";

// Log available extractors for debugging
console.log(extractorPkg);

const { YouTubeExtractor, DefaultExtractors } = extractorPkg;

let player;

export const initPlayer = async (client) => {
  player = new Player(client);

  // ✅ Use new method as per latest discord-player version
  await player.extractors.loadMulti([DefaultExtractors, YouTubeExtractor]);

  return player;
};

export const getPlayer = () => player;
