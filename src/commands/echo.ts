import { ApplicationCommandOptionType } from "discord.js";
import { SlashCommand, SlashCommandType } from "../types/slashCommand";

export const echo: SlashCommand = {
  name: "대신말해줘",
  description: "직접 말하기 곤란한건 내가 대신 말해줄까나~",
  options: [
    {
      required: true,
      name: "내용",
      description: "대신 말해줄 내용을 적어줘",
      type: ApplicationCommandOptionType.String
    }
  ],
  isdeferred: false,
  commandType: SlashCommandType.GuildUtil,
  execute: async (_, interaction) => {
    const echoMessage = (interaction.options.get("내용")?.value || '');
    await interaction.reply({
      content: `${echoMessage}`
    });
  }
};
