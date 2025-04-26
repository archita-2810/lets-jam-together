import { Player } from "discord-player";

let player;

export const initPlayer = (client) => {
  player = new Player(client);
  return player;
};

export const getPlayer = () => player;
