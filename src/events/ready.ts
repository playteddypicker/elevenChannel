import { ClientEvent } from "../types/clientEvent";
import {
  Events,
  TextChannel,
  User,
  MessageReaction,
  GuildMember,
} from "discord.js";
import commands from "../commands";

const ready: ClientEvent = {
  name: Events.ClientReady,
  once: true,
  execute: async (client) => {
    console.info(`logged in as ${client.user?.tag}`);

    if (client.application) {
      await client.application.commands.set(commands);
      console.log("info: command registered");
    }

    // fetch login-verify message, then listen for check emoji which some user sent.
    const ruleChannel = (await client.channels.fetch(
      "868663680886272040",
    )) as TextChannel;
    const agreeMessage = await ruleChannel.messages.fetch(
      "1280090762033369170",
    );

    const myguild = await client.guilds.fetch("841337761431814165");
    const filter = (reaction: MessageReaction, _: User) =>
      reaction.emoji.id == "1192016381974167553" ||
      reaction.emoji.id == "979329869391478814" ||
      reaction.emoji.id == "1255866789066313760";

    const emojiCollector = agreeMessage.createReactionCollector({
      filter,
      dispose: true,
    });

    emojiCollector.on("collect", async (_: MessageReaction, user: User) => {
      const reactionMember = (await myguild.members.fetch(
        user.id,
      )) as GuildMember;

      reactionMember.roles.add("920466119846944859");
    });

    emojiCollector.on("remove", async (_: MessageReaction, user: User) => {
      const reactionMember = (await myguild.members.fetch(
        user.id,
      )) as GuildMember;
      reactionMember.roles.remove("920466119846944859");
    });
  },
};

export default ready;
