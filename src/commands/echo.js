"use strict";
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
    execute: async (_, interaction) => {
        const echoMessage = (interaction.options.get("내용")?.value || '');
        await interaction.reply({
            content: `${echoMessage}`
        });
    }
};
