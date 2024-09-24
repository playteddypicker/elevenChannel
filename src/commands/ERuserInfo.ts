import { ApplicationCommandOptionType } from "discord.js";
import { SlashCommand, SlashCommandType } from "../types/slashCommand";
import ERClient from "../utils/bser/api/EternalReturnAPI";
import { SeasonID } from "../utils/bser/models/meta";
import "dotenv/config";

export const ERuserInfo: SlashCommand = {
  name: "유저정보",
  description: "이 친구는 인게임 정보가 어떻게 되는지 봐볼까나..",
  options: [
    {
      required: true,
      name: "닉네임",
      description: "닉네임을 입력해줘~",
      type: ApplicationCommandOptionType.String,
    },
    {
      required: false,
      name: "시즌",
      description:
        "보고싶은 시즌 통계를 알려줘~ 예시) : 시즌2, 프리시즌3, 일반 등등.. 비우면 현재 시즌 기준으로 알려줄거야~",
      type: ApplicationCommandOptionType.String,
    },
  ],
  isdeferred: true,
  commandType: SlashCommandType.EternalReturn,
  execute: async (_, interaction, erclient: ERClient) => {
    return await interaction.editReply("아직 개발중이랄까나..");
    /*const nickname = interaction.options.get("닉네임")?.value || "";
    const seasonInput =
      (interaction.options.get("시즌")?.value as string) ||
      process.env.ER_CURREN/_SEASON;

    const seasonid = SeasonID[seasonInput as keyof typeof SeasonID];

    const userstat = await erclient.getUserStatsByNickname(
      nickname.toString(),
      seasonid,
    );

    if (!userstat)
      return await interaction.editReply("그런 유저는 찾을수 없달까나..");

    //do something with userstat. maybe we can use canvasjs to design user info embed.
    console.log(userstat);*/
  },
};
