import {
  ComponentType,
  InteractionResponseType,
  MessageFlags
} from "discord_api_types/v10.ts";

export const data = {
  custom_id: "verification",
  type: ComponentType.Button
};

export async function execute({ branch, interaction }) {
  const minCreationTime = 24 * 60 * 60 * 1000;
  const creationTime = Number(BigInt(interaction.member.user.id) >> 22n) + 0;

  const systems = [
    { guildId: "1100208880132309022", verificationRole: "1119566549213266011", flaggedRole: "1121351938722758737" }
  ];

  const system = systems.find(ctx => ctx.guildId === interaction.guild_id);
  if (!system || interaction.member.roles.includes(system.verificationRole)) return;

  if () return new Response(JSON.stringify({
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      flags: MessageFlags.Ephemeral,
      content: "belum disetup"
    }
  }), {
    headers: { "content-type": "application/json" }
  });
};
