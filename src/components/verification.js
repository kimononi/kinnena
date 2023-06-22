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
    { guildId: "", verificationRoleId: "", flaggedRoleId: "" }
  ];
};
