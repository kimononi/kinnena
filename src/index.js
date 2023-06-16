import {
  getCookies,
  Status,
  serve 
} from "http/mod.ts";

import { 
  OAuth2Routes,
  OAuth2Scopes,
} from "discord_api_types/v10.ts";

import * as routes from "./routes/mod.js";

async function handler(request) {
  const requestURL = new URL(request.url);
  const branch = (requestURL.host.includes("--") || requestURL.host.includes(Deno.env.get("DENO_DEPLOYMENT_ID"))) ? "CANARY" : "PROD";

  const route = Object.values(routes) 
    .find(ctx => ctx.data.pathname == requestURL.pathname || ctx.data.pathname.startsWith(requestURL.pathname) && ctx.data.method == request.method);

  if (!route) return new Response("Unknown endpoint.", { status: Status.NotFound });

  if (route.requireAuth) {
    // base string url 
    // https://discord.com/api/oauth2/authorize?client_id=1114537750557892640&redirect_uri=https%3A%2F%2Fkinnena.deno.dev%2Fauth&response_type=code&scope=identify 
    
    const authorizeURL = new URL(OAuth2Routes.authorizeURL);
    const scopes = [OAuth2Scopes.Identify];
    // authorizeURL.searchParams.set();
    authorizeURL.searchParams.set("client_id", Deno.env.get("PROD_DISCORD_ID"));
    authorizeURL.searchParams.set("redirect_uri", requestURL.origin + "/auth");
    authorizeURL.searchParams.set("response_type", "code");
    authorizeURL.searchParams.set("scope", scopes.join(" "));

  } else return await route.execute({ request, requestURL, branch });
};

serve(handler, { port: 80 });
