import {
  ApplicationCommandType,
  ApplicationCommandOptionType,
  InteractionResponseType,
  MessageFlags,
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
    { name: "content", description: "🍜 · Ketik pesan~", type: ApplicationCommandOptionType.String, required: false },
    { name: "attachment", description: "🍜 · Barangkali mau nitip file~ hehe", type: ApplicationCommandOptionType.Attachment, required: false },
    { name: "reference", description: "🍜 · ID pesan yang mau kamu balas~", type: ApplicationCommandOptionType.String, required: false }
  ]
};

export async function execute({ interaction }) {
  const attachment = Object.values(interaction.data.resolved?.attachments ?? {})[0];
  const content = interaction.data.options?.find(ctx => ctx.name == "content");
  
  if (!attachment && !content) return new Response(JSON.stringify({
    type: InteractionResponseType.ChannelMessageWithSource,
    data: { flags: MessageFlags.Ephemeral, content: "🦥 · Minimal pesannya ada isi lah~" }
  }), {
    headers: { "content-type": "application/json" }
  });
  
  const payload = { content: content.value };
  const reference = interaction.data.options.find(opt => opt.name == "reference");
  
  if (reference) payload.message_reference = {
    guild_id: interaction.guild_id,
    message_id: reference.value
  };
  
  let body;
  const headers = new Headers();
  headers.set("authorization", `Bot ${Deno.env.get("DISCORD_TOKEN")}`);
  
  if (attachment) {
    const blob = await fetch(attachment.url)
      .then(res => res.blob());
    const formData = new FormData();
    
    formData.set("payload_json", JSON.stringify(payload));
    formData.set("files[0]", blob, attachment.filename);
    
    body = formData;
  } else {
    headers.set("content-type", "application/json");
    body = JSON.stringify(payload);
  }
  
  const replyResult = await fetch(RouteBases.api + Routes.channelMessages(interaction.channel_id), {
    method: "POST",
    headers,
    body
  })
    .then(res => res.json());
  
  return new Response(JSON.stringify({
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      flags: MessageFlags.Ephemeral,
      content: ("code" in replyResult) ? `🍜 · Agak error dikit nih..\n\nJSON.stringify(replyResult, null, "  ")` : `🍜 · Done ya(⁠\\*⁠´⁠ω⁠｀\\⁠*⁠)! [ [Hora~](<https://discord.com/channels/${interaction.guild_id}/${interaction.channel_id}/${replyResult.id}>) ]`
    }
  }), {
    headers: { "content-type": "application/json" }
  });
};
