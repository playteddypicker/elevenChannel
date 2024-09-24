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
exports.echo = void 0;
const discord_js_1 = require("discord.js");
const slashCommand_1 = require("../types/slashCommand");
exports.echo = {
    name: "대신말해줘",
    description: "직접 말하기 곤란한건 내가 대신 말해줄까나~",
    options: [
        {
            required: true,
            name: "내용",
            description: "대신 말해줄 내용을 적어줘",
            type: discord_js_1.ApplicationCommandOptionType.String
        }
    ],
    isdeferred: false,
    commandType: slashCommand_1.SlashCommandType.GuildUtil,
    execute: (_, interaction) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const echoMessage = (((_a = interaction.options.get("내용")) === null || _a === void 0 ? void 0 : _a.value) || '');
        yield interaction.reply({
            content: `${echoMessage}`
        });
    })
};
