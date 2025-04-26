import { Player } from "discord-player";
import extractorPkg from "@discord-player/extractor";

const {  SoundCloudExtractor } = extractorPkg;

let player;

export const initPlayer = async (client) => {
  player = new Player(client);
  // await player.extractors.loadMulti([DefaultExtractors, SoundCloudExtractor, YoutubeExtractor]);
  // await player.extractors.loadDefault();
  await player.extractors.loadMulti([
    new YouTubeExtractor(),
    new SoundCloudExtractor(),
  ]);

  return player;
};

export const getPlayer = () => player;
