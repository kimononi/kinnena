import {
  RouteBases,
  Routes
} from "discord_api_types/v10.ts";

import * as commands from "../commands/mod.js";

export const data = {
  method: "GET",
  pathname: "/deploy",
  requireAuth: true
};

export async function execute({ branch }) {
  const clientId = Deno.env.get(`${branch}_DISCORD_ID`);
  const clientToken = Deno.env.get(`${branch}_DISCORD_TOKEN`);
  
  const body = JSON.stringify(Object.values(commands)
    .map(command => command.data));
  
  const deploy = await fetch(RouteBases.api + Routes.applicationCommands(clientId), {
    method: "PUT",
    headers: {
      authorization: `Bot ${clientToken}`,
      "content-type": "application/json"
    },
    body
  })
    .then(res => res.json());
  
  return new Response(JSON.stringify(deploy, null, "  "))
};
