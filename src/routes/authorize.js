export const data = {
  method: "GET",
  pathname: "/authorize",
};

export async function execute({ requestURL }) {
  const body = new URLSearchParams();

  body.set("client_id", Deno.env.get("PROD_DISCORD_ID"));
  body.set("client_secret", Deno.env.get("PROD_DISCORD_SECRET"));
  body.set("code", requestURL.searchParams.get("code"));
};
