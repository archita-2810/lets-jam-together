import {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
  VoiceConnectionStatus,
  entersState,
} from "@discordjs/voice";
import { getOrCreateConnection, destroyConnection } from "./playermanager";

export const voiceplayer = (interaction, yturl) => {
    const { player } = 
}