import {
  OAuth2Routes,
  OAuth2Scopes
} from "discord_api_types/v10.ts";

import {
  setCookie,
  Status 
} from "http/mod.ts";

export const data = {
  method: "GET",
  pathname: "/authorize",
};

export function createAuthorizeURL(requestURL) {
  const scopes = [OAuth2Scopes.Identify];
  const authorizeURL = new URL(OAuth2Routes.authorizationURL);

  authorizeURL.searchParams.set("client_id", Deno.env.get("PROD_DISCORD_ID"));
  authorizeURL.searchParams.set("redirect_uri", requestURL.origin + data.pathname);
  authorizeURL.searchParams.set("response_type", "code");
  authorizeURL.searchParams.set("scope", scopes.join(" "));

  return authorizeURL;
};

export async function execute({ requestURL }) {
  const body = new URLSearchParams();

  body.set("client_id", Deno.env.get("PROD_DISCORD_ID"));
  body.set("client_secret", Deno.env.get("PROD_DISCORD_SECRET"));
  body.set("code", requestURL.searchParams.get("code"));
  body.set("grant_type", "authorization_code");
  body.set("redirect_uri", createAuthorizeURL(requestURL));

  const result = await fetch(OAuth2Routes.tokenURL, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body
  })
    .then(res => res.json());

  if ("error" in result) return new Response(JSON.stringify(result), { status: Status.Unauthorized });

  const user = await fetch(RouteBases.api + Routes.user("@me"), {
    headers: { authorization: `Bearer ${result.access_token}` }
  })
    .then(res => res.json());

  const whiteListed = [];
  const headers = new Headers();

  headers.set("location", requestURL.origin);
  setCookie(headers, { name: "isAllowed", value: String(whiteListed.includes(user.id)) });

  return new Response(null, { headers, status: Status.Found });
};
