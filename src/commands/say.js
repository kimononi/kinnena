import {
  ApplicationCommandType,
  ApplicationCommandOptionType,
  InteractionResponseType,
  PermissionFlagsBits,
  RouteBases,
  Routes
} from "discord_api_types/v10.ts";

export const data = {
  name: "say",
  description: "🍜 · Chit chat bareng member sebagai bot",
  type: ApplicationCommandType.ChatInput,
  default_member_permissions: String(Number(PermissionFlagsBits.Administrator)),
  options: [
    { name: "content", description: "🍜 · Ketik pesan~", type: ApplicationCommandOptionType.String, required: true },
    { name: "attachment", description: "🍜 · Barangkali mau nitip file~ hehe", type: ApplicationCommandOptionType.Attachment, required: false },
    { name: "reference", description: "🍜 · ID pesan yang mau kamu balas~", type: ApplicationCommandOptionType.String, required: false }
  ]
};

export async function execute({ interaction }) {
  return new Response(JSON.stringify({
    type: InteractionResponseType.ChannelMessageWithSource,
    data: { content: "Hello World!" }
  }), {
    headers: { "content-type": "application/json" }
  })
};
