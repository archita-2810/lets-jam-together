import { Player } from "discord-player";
import { YouTubeExtractor } from "@discord-player/extractor";

let player;

export const initPlayer = async (client) => {
  player = new Player(client);
  await player.extractors.register(YouTubeExtractor);
  return player;
};

export const getPlayer = () => player;
