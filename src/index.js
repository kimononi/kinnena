import {
  Status,
  serve 
} from "http/mod.ts";

import { 
  OAuth2Routes
} from "discord_api_types/v10.ts";

import * as routes from "./routes/mod.js";

async function handler(request) {
  const requestURL = new URL(request.url);
  const branch = (requestURL.host.includes("--") || requestURL.host.includes(Deno.env.get("DENO_DEPLOYMENT_ID"))) ? "CANARY" : "PROD";

  const route = Object.values(routes) 
    .find(ctx => ctx.data.pathname == requestURL.pathname || ctx.data.pathname.startsWith(requestURL.pathname) && ctx.data.method == request.method);

  if (!route) return new Response("Unknown endpoint.", { status: Status.NotFound });
};

serve(handler, { port: 80 });
