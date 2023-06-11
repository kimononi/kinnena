import * as routes from "./mod.js";

export const data = {
  method: "GET"
};

export async function execute(request) {
  const filteredRoutes = Object.entries(routes)
    .filter(([key, ctx]) => ctx.data.method == "GET");
  //  && ctx.data.pathname !== "" < additional filter
  const mappedRoutes = Object.fromEntries(filteredRoutes.map(([key, ctx]) => [key, `${requestEvent.request.url + (ctx.data.pathname ? `/${ctx.data.pathname}` : "")}`]))
  return new Response(JSON.stringify(mappedRoutes, null, "  "))
};
