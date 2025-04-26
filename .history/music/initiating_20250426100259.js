import { Player } from "discord-player";
import extractorPkg from "@discord-player/extractor";

const { DefaultExtractors, SoundCloudExtractor, YoutubeExtractor } = extractorPkg;

let player;

export const initPlayer = async (client) => {
  player = new Player(client);
  // await player.extractors.loadMulti([DefaultExtractors, SoundCloudExtractor, YoutubeExtractor]);

  return player;
};

export const getPlayer = () => player;
