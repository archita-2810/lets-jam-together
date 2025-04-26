import { Player } from "discord-player";
import extractorPkg from "@discord-player/extractor";

// Destructure properly
const { YouTubeExtractor, DefaultExtractors } = extractorPkg;

let player;

export const initPlayer = async (client) => {
  player = new Player(client);

  // ✅ Use new method as per latest discord-player version
  await player.extractors.loadMulti(DefaultExtractors);

  // Optional: manually register YouTube if you want to override behavior
  await player.extractors.register(YouTubeExtractor);

  return player;
};

export const getPlayer = () => player;
