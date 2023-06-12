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
  
};
