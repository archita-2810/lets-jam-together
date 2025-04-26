// making this using queueMap
import {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    AudioPlayerStatus,
    VoiceConnectionStatus,
    entersState,
  } from "@discordjs/voice";
  
const queue = new QueueMap();

const 