import { Player } from "discord-player";
import extractor from "@discord-player/extractor";

const { YouTubeExtractor } = extractor;

let player;

export const initPlayer = async (client) => {
  player = new Player(client);
  await player.extractors.register(YouTubeExtractor);
  return player;
};

export const getPlayer = () => player;
