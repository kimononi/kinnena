import { Status, serve } from "http/mod.ts";
import * as routes from "./routes/mod.js";

async function handler(request) {
  const requestURL = new URL(request.url);
  const pathnames = requestURL.pathname.split("/");
      
  const deployment = Deno.env.get("DENO_DEPLOYMENT_ID");
  console.log(deployment, pathnames);
      
  if (!requestURL.host.includes(deployment)) {
    const status = Status.Unauthorized;
    return new Response(
      JSON.stringify({
        message: `This deployment is private, you need a deployment id to access the server (${status})`
      }, null, "  "),
      { status }
    );
  } else {
    const route = Object.values(routes)
      .find(ctx => ctx.data.pathname == pathnames[1] && ctx.data.method == request.method);
      console.log(route);
      if (route) return await route.execute(request);
    }
};

serve(handler, { port: 80 });
