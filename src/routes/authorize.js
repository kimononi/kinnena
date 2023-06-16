export const data = {
  method: "GET",
  pathname: "/authorize",
};

const scopes = [OAuth2Scopes.Identify];
const authorizeURL = new URL(OAuth2Routes.authorizationURL);

authorizeURL.searchParams.set("client_id", Deno.env.get("PROD_DISCORD_ID"));
authorizeURL.searchParams.set("redirect_uri", requestURL.origin + data.pathname);
authorizeURL.searchParams.set("response_type", "code");
authorizeURL.searchParams.set("scope", scopes.join(" "));

export const authorizeURL = authorizeURL;

export async function execute({ requestURL }) {
  const body = new URLSearchParams();

  body.set("client_id", Deno.env.get("PROD_DISCORD_ID"));
  body.set("client_secret", Deno.env.get("PROD_DISCORD_SECRET"));
  body.set("code", requestURL.searchParams.get("code"));
  body.set("grant_type", "authorization_code");
};
