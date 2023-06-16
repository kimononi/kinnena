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
  const pathnames = requestURL.pathname.slice(1).split("/");

  return new Response("currently in development.");
};

serve(handler, { port: 80 });
