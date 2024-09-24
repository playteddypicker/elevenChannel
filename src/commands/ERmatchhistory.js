"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERmatchHistory = void 0;
const discord_js_1 = require("discord.js");
const slashCommand_1 = require("../types/slashCommand");
require("dotenv/config");
exports.ERmatchHistory = {
    name: "전적검색",
    description: "음.. 이 친구는 최근 게임을 어떻게 했는지 봐볼까나..",
    options: [
        {
            required: true,
            name: "닉네임",
            description: "전적 검색할 닉네임을 입력해줘~",
            type: discord_js_1.ApplicationCommandOptionType.String,
        },
    ],
    isdeferred: true,
    commandType: slashCommand_1.SlashCommandType.EternalReturn,
    execute: async (_, interaction, erclient) => {
        const nickname = interaction.options.get("내용")?.value || "";
        return await interaction.editReply("아직 개발중이랄까나..");
    },
};
