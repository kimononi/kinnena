import {
  ComponentType
} from "discord_api_types/v10.ts";

export const data = {
  customd_id: "verification",
  type: ComponentType.Button
};

export async function execute({ branch, interaction }) {
  const minCreationTime = 24 * 60 * 60 * 1000;

  const systems = [
    { guildId: "1100208880132309022", verificationRoleId: "1119566549213266011", flaggedRoleId: "1121351938722758737" }
  ];

  const system = systems.find(ctx => ctx.guildId === interaction.guild_id);
  if (!system) return;
};
