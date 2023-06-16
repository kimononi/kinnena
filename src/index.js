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
  const pathnames = requestURL.pathname.slice(1).split("/");

  return new Response("currently in development.");
};

serve(handler, { port: 80 });
