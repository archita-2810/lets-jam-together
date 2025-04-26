import { Player } from "discord-player";
import extractorPkg from "@discord-player/extractor";

// Manually access YouTubeExtractor from the default export
const YouTubeExtractor = extractorPkg.YouTubeExtractor;

let player;

export const initPlayer = async (client) => {
  player = new Player(client);
  await player.extractors.loadMulti(); 
  await player.extractors.register(YouTubeExtractor);
  return player;
};

export const getPlayer = () => player;
