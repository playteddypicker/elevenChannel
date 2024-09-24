import {
  CommandInteraction,
  ChatInputApplicationCommandData,
  Client,
} from "discord.js";
import ERClient from "../utils/bser/api/EternalReturnAPI";

export type SlashCommand = ChatInputApplicationCommandData & {
  isdeferred: boolean;
  commandType: SlashCommandType;
  execute: (
    client: Client,
    interaction: CommandInteraction,
    utilArg?: ERClient | any,
  ) => void;
};

export enum SlashCommandType {
  GuildUtil,
  Music,
  EternalReturn,
  Etc,
}
