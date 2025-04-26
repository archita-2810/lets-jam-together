import { Player } from "discord-player";
import extractorPkg from "@discord-player/extractor";
console.log(extractorPkg);

const { DefaultExtractors, SoundCloudExtractor } = extractorPkg;

let player;

export const initPlayer = async (client) => {
  player = new Player(client);
  await player.extractors.loadMulti([DefaultExtractors, SoundCloudExtractor]);

  return player;
};

export const getPlayer = () => player;
