"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERuserInfo = void 0;
const discord_js_1 = require("discord.js");
const slashCommand_1 = require("../types/slashCommand");
require("dotenv/config");
exports.ERuserInfo = {
    name: "유저정보",
    description: "이 친구는 인게임 정보가 어떻게 되는지 봐볼까나..",
    options: [
        {
            required: true,
            name: "닉네임",
            description: "닉네임을 입력해줘~",
            type: discord_js_1.ApplicationCommandOptionType.String,
        },
        {
            required: false,
            name: "시즌",
            description: "보고싶은 시즌 통계를 알려줘~ 예시) : 시즌2, 프리시즌3, 일반 등등.. 비우면 현재 시즌 기준으로 알려줄거야~",
            type: discord_js_1.ApplicationCommandOptionType.String,
        },
    ],
    isdeferred: true,
    commandType: slashCommand_1.SlashCommandType.EternalReturn,
    execute: (_, interaction, erclient) => __awaiter(void 0, void 0, void 0, function* () {
        return yield interaction.editReply("아직 개발중이랄까나..");
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
    }),
};
