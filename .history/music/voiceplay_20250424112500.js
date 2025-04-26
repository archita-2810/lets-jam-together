// making this using queueMap
import {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
  VoiceConnectionStatus,
  entersState,
} from "@discordjs/voice";
import ytdl from "@distube/ytdl-core";

const queue = new QueueMap();
