"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const commands_1 = __importDefault(require("../commands"));
const ready = {
    name: discord_js_1.Events.ClientReady,
    once: true,
    execute: async (client) => {
        console.info(`logged in as ${client.user?.tag}`);
        if (client.application) {
            await client.application.commands.set(commands_1.default);
            console.log("info: command registered");
        }
        // fetch login-verify message, then listen for check emoji which some user sent.
        const ruleChannel = (await client.channels.fetch("868663680886272040"));
        const agreeMessage = await ruleChannel.messages.fetch("1280090762033369170");
        const myguild = await client.guilds.fetch("841337761431814165");
        const filter = (reaction, _) => reaction.emoji.id == "1192016381974167553" ||
            reaction.emoji.id == "979329869391478814" ||
            reaction.emoji.id == "1255866789066313760";
        const emojiCollector = agreeMessage.createReactionCollector({
            filter,
            dispose: true,
        });
        emojiCollector.on("collect", async (_, user) => {
            const reactionMember = (await myguild.members.fetch(user.id));
            reactionMember.roles.add("920466119846944859");
        });
        emojiCollector.on("remove", async (_, user) => {
            const reactionMember = (await myguild.members.fetch(user.id));
            reactionMember.roles.remove("920466119846944859");
        });
    },
};
exports.default = ready;
