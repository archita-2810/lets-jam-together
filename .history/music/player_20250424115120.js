// making this using queueMap
import { joinVoiceChannel, createAudioPlayer } from "@discordjs/voice";

const queue = new Map();

export const getOrCreateConnection = (interaction) => {
  const gid = interaction.guild.id;
  let entry = queue.get(gid);

  const channel = interaction.member.voice.channel;

  if (!entry) {
    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });

    const player = createAudioPlayer();

    connection.subscribe(player);

    connection.on("error", (err) => console.error("Voice Error:", err));
    player.on("error", (err) => console.error("Player Error:", err));

    connections.set(guildId, { connection, player });
    entry = { connection, player };
  }

  return entry;
};

export const destroyConnection = (gid) => {
  const entry = queue.get(gid);
  if (entry) {
    entry.connection.destroy();
    queue.delete(gid);
  }
};
