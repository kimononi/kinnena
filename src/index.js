import {
  getCookies,
  Status,
  serve 
} from "http/mod.ts";

import { authorizeURL } from "./routes/authorize.js";

import * as routes from "./routes/mod.js";

async function handler(request) {
  const requestURL = new URL(request.url);
  const branch = requestURL.host.includes("--") || requestURL.host.includes(Deno.env.get("DENO_DEPLOYMENT_ID")) ? "CANARY" : "PROD";

  const route = Object.values(routes) 
    .find(ctx => ctx.data.pathname == requestURL.pathname || ctx.data.pathname.startsWith(requestURL.pathname) && ctx.data.method == request.method);

  if (!route) return new Response("Unknown endpoint.", { status: Status.NotFound });
  const executeData = { request, requestURL, branch };
  
  if (route.data.requireAuth) {
    const { isAllowed } = getCookies(request.headers);
    if (isAllowed) return await route.execute(executeData);
    
    return new Response(null, {
      headers: { location: authorizeURL },
      status: Status.Found
    });

  } else return await route.execute(executeData);
};

serve(handler, { port: 80 });
