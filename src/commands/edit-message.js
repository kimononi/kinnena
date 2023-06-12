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
  name: "edit-message",
  description: "",
  type: ApplicationCommandType.Message,
  default_member_permissions: String(Number(PermissionFlagsBits.Administrator)),
};

export async function execute({ interaction }) {
  console.log(interaction.data);
  
  const clientId = Deno.env.get("DISCORD_ID");
  
  if (interaction.data.member.user.id !== clientId) {
    return new Response(JSON.stringify({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: { flags: MessageFlags.Ephemeral, content: "🍜 · Itu bukan message punya gwe~" }
    }));
  }
};
