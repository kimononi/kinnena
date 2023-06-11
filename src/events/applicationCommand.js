import { 
  InteractionType
} from "discord_api_types/v10.ts";

import * as commands from "../commands/mod.js";

export const data = {
  type: InteractionType.ApplicationCommand
};

export async function execute({ request, interaction }) {
  console.log("application command used.");
  
  const command = Object.values(commands)
    .find(cmd => cmd.data.name == interaction.data.name && cmd.data.type == interaction.data.type);
  console.log(command);
  
  if (command) {
    const response = await command.execute({ request, interaction });
    console.log(response);
    
    return response;
  }
};
