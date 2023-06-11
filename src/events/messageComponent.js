import { 
  InteractionType,
  InteractionResponseType
} from "discord_api_types/v10.ts";

import * as components from "../components/mod.js";

export const data = {
  type: InteractionType.MessageComponent
};

export async function execute({ request, interaction }) {
  const component = Object.values(components)
    .find(ctx => ctx.data.custom_id == interaction.data.custom_id && ctx.data.type == interaction.data.component_type);
  console.log(component);
  if (component) return await component.execute({ request, interaction });
};
