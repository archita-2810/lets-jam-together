import { Player } from "discord-player";
import extractorPkg from "@discord-player/extractor";

const YouTubeExtractor = extractorPkg.YouTubeExtractor;

let player;

export const initPlayer = async (client) => {
  player = new Player(client);
  await player.extractors.loadDefault(); // ✅ Fix here
  await player.extractors.register(YouTubeExtractor);
  return player;
};

export const getPlayer = () => player;
