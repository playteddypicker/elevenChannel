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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
require("dotenv/config");
const commands_1 = __importDefault(require("./commands"));
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
const slashCommand_1 = require("./types/slashCommand");
const EternalReturnAPI_1 = __importDefault(require("./utils/bser/api/EternalReturnAPI"));
const BOT_TOKEN = process.env.BOT_TOKEN;
const ER_KEY = process.env.ER_DEV_APIKEY || "";
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.GuildMessageReactions,
        discord_js_1.GatewayIntentBits.GuildMessagePolls,
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.Guilds,
    ],
});
const erClient = new EternalReturnAPI_1.default(ER_KEY);
(() => __awaiter(void 0, void 0, void 0, function* () {
    //slashcommand handle section
    client.on("interactionCreate", (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        if (interaction.isCommand()) {
            const currentCommand = commands_1.default.find(({ name }) => name === interaction.commandName);
            if (currentCommand) {
                if (currentCommand.isdeferred)
                    yield interaction.deferReply();
                if (currentCommand.commandType === slashCommand_1.SlashCommandType.EternalReturn)
                    currentCommand.execute(client, interaction, erClient);
                else
                    currentCommand.execute(client, interaction);
                //console.log(`info: command ${currentCommand.name} handled correctly`)
            }
        }
    }));
    //event handling section.
    const eventsPath = node_path_1.default.join(__dirname, "events");
    const eventFiles = node_fs_1.default
        .readdirSync(eventsPath)
        .filter((file) => file.endsWith(".ts"));
    for (const file of eventFiles) {
        const filePath = node_path_1.default.join(eventsPath, file);
        const event = require(filePath).default;
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        }
        else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
    yield client.login(BOT_TOKEN);
}))();
