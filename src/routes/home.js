import * as routes from "./mod.js";

export const data = {
  method: "GET",
  pathname: "/"
};

export async function execute({ request, requestURL, branch }) {
  const filteredRoutes = Object.entries(routes)
    .filter(([key, ctx]) => ctx.data.method == "GET" && !ctx.data.private);
  
  const mappedRoutes = Object.fromEntries(filteredRoutes.map(([key, ctx]) => [key, requestURL.origin + ctx.data.pathname]))
  return new Response(JSON.stringify(mappedRoutes, null, "  "))
};
