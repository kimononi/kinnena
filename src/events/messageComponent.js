import { 
  InteractionType
} from "discord_api_types/v10.ts";

import * as components from "../components/mod.js";

export const data = {
  type: InteractionType.MessageComponent
};

export async function execute({ branch, request, interaction }) {
  const component = Object.values(components)
    .find(cmp => cmp.data.custom_id == interaction.data.custom_id && cmp.data.type == interaction.data.component_type);
  
  if (component) return await component.execute({ branch, request, interaction });
};
