import { Client, Interaction, GatewayIntentBits } from "discord.js";
import "dotenv/config";
import commands from "./commands";
import path from "node:path";
import fs from "node:fs";
import { SlashCommandType } from "./types/slashCommand";
import ERClient from "./utils/bser/api/EternalReturnAPI";

const BOT_TOKEN = process.env.BOT_TOKEN;
const ER_KEY = process.env.ER_DEV_APIKEY || "";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessagePolls,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.Guilds,
  ],
});

const erClient = new ERClient(ER_KEY);

(async () => {
  //slashcommand handle section
  client.on("interactionCreate", async (interaction: Interaction) => {
    if (interaction.isCommand()) {
      const currentCommand = commands.find(
        ({ name }) => name === interaction.commandName,
      );

      if (currentCommand) {
        if (currentCommand.isdeferred) await interaction.deferReply();


        if (currentCommand.commandType === SlashCommandType.EternalReturn)
          currentCommand.execute(client, interaction, erClient);
        else currentCommand.execute(client, interaction);
        //console.log(`info: command ${currentCommand.name} handled correctly`)
      }
    }
  });

  //event handling section.
  const eventsPath = path.join(__dirname, "events");
  const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".ts"));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath).default;
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }

  await client.login(BOT_TOKEN);
})();
