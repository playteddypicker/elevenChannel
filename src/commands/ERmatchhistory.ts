import { ApplicationCommandOptionType } from "discord.js";
import { SlashCommand, SlashCommandType } from "../types/slashCommand";
import "dotenv/config";
import ERClient from "../utils/bser/api/EternalReturnAPI";

export const ERmatchHistory: SlashCommand = {
  name: "전적검색",
  description: "음.. 이 친구는 최근 게임을 어떻게 했는지 봐볼까나..",
  options: [
    {
      required: true,
      name: "닉네임",
      description: "전적 검색할 닉네임을 입력해줘~",
      type: ApplicationCommandOptionType.String,
    },
  ],
  isdeferred: true,
  commandType: SlashCommandType.EternalReturn,
  execute: async (_, interaction, erclient: ERClient) => {
    const nickname = interaction.options.get("내용")?.value || "";
    return await interaction.editReply("아직 개발중이랄까나..");
  },
};
