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
    execute: (_, interaction, erclient) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const nickname = ((_a = interaction.options.get("내용")) === null || _a === void 0 ? void 0 : _a.value) || "";
        return yield interaction.editReply("아직 개발중이랄까나..");
    }),
};
