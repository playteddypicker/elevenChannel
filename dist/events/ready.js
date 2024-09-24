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
const commands_1 = __importDefault(require("../commands"));
const ready = {
    name: discord_js_1.Events.ClientReady,
    once: true,
    execute: (client) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        console.info(`logged in as ${(_a = client.user) === null || _a === void 0 ? void 0 : _a.tag}`);
        if (client.application) {
            yield client.application.commands.set(commands_1.default);
            console.log("info: command registered");
        }
        // fetch login-verify message, then listen for check emoji which some user sent.
        const ruleChannel = (yield client.channels.fetch("868663680886272040"));
        const agreeMessage = yield ruleChannel.messages.fetch("1280090762033369170");
        const myguild = yield client.guilds.fetch("841337761431814165");
        const filter = (reaction, _) => reaction.emoji.id == "1192016381974167553" ||
            reaction.emoji.id == "979329869391478814" ||
            reaction.emoji.id == "1255866789066313760";
        const emojiCollector = agreeMessage.createReactionCollector({
            filter,
            dispose: true,
        });
        emojiCollector.on("collect", (_, user) => __awaiter(void 0, void 0, void 0, function* () {
            const reactionMember = (yield myguild.members.fetch(user.id));
            reactionMember.roles.add("920466119846944859");
        }));
        emojiCollector.on("remove", (_, user) => __awaiter(void 0, void 0, void 0, function* () {
            const reactionMember = (yield myguild.members.fetch(user.id));
            reactionMember.roles.remove("920466119846944859");
        }));
    }),
};
exports.default = ready;
