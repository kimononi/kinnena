import { 
  InteractionType
} from "discord_api_types/v10.ts";

import * as commands from "../commands/mod.js";

export const data = {
  type: InteractionType.ApplicationCommand
};

export async function execute({ branch, request, interaction }) {
  const command = Object.values(commands)
    .find(cmd => cmd.data.name == interaction.data.name && cmd.data.type == interaction.data.type);
  console.log(command);
  
  if (command) return await command.execute({ branch, request, interaction });
};
