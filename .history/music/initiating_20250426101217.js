import { Player } from "discord-player";
import YouTubeiExtractor from "discord-player-youtubei";
import { SoundCloudExtractor } from "@discord-player/extractor";

let player;

export const initPlayer = async (client) => {
  player = new Player(client);

  await player.extractors.loadMulti([
    new YouTubeExtractor(),
    new SoundCloudExtractor(),
  ]);

  return player;
};

export const getPlayer = () => player;
