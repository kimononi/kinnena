import {
  getCookies,
  Status,
  serve 
} from "http/mod.ts";

import { createAuthorizeURL } from "./routes/authorize.js";

import * as routes from "./routes/mod.js";

async function handler(request) {
  const requestURL = new URL(request.url);
  const branch = requestURL.host.includes("--") || requestURL.host.includes(Deno.env.get("DENO_DEPLOYMENT_ID")) ? "CANARY" : "PROD";
  console.log(branch);

  const route = Object.values(routes) 
    .find(ctx => ctx.data.pathname == requestURL.pathname && ctx.data.method == request.method);

  if (!route) return new Response("Unknown endpoint.", { status: Status.NotFound });
  const executeData = { request, requestURL, branch };

  if (route.data.requireAuth) {
    const { isAllowed } = getCookies(request.headers);
    
    if (!isAllowed) return new Response(null, {
      headers: { location: createAuthorizeURL(requestURL) },
      status: Status.Found
    });
    
    if (isAllowed == "true") return await route.execute(executeData);
    if (isAllowed == "false") return new Response("Looks like ur account isn't whitelisted, you can't use this endpoint, sorry.", { status: Status.Unauthorized });
  } else return await route.execute(executeData);
};

serve(handler, { port: 80 });
