import { Client } from "discord.js"

interface ClientEventInputData {
  name: string,
  once: boolean,
}

export type ClientEvent = ClientEventInputData & {
  execute: (client: Client, ...args: any[]) => void;
}
