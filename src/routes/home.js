import * as routes from "./mod.js";

export const data = {
  method: "GET",
  pathname: "/"
};

export async function execute(request) {
  const filteredRoutes = Object.entries(routes)
    .filter(([key, ctx]) => ctx.data.method == "GET");
  
  const mappedRoutes = Object.fromEntries(filteredRoutes.map(([key, ctx]) => [key, `${request.url + (ctx.data.pathname || "")}`]))
  return new Response(JSON.stringify(mappedRoutes, null, "  "))
};
