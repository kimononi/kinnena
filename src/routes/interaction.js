import { Status } from "http/http_status.ts";
import { sign } from "https://cdn.skypack.dev/tweetnacl@1.0.3";

import * as events from "../events/mod.js";

export const data = {
  method: "POST",
  pathname: "/interaction"
};

export async function execute({ branch, request }) {
  const publicKey = Deno.env.get(`${branch}_DISCORD_PUBLIC_KEY`);
  console.log(publicKey);
  const body = await request.text();
  const signature = request.headers.get("x-signature-ed25519");
  const timestamp = request.headers.get("x-signature-timestamp");
  
  const valid = await sign.detached.verify(
    new TextEncoder().encode(timestamp + body),
    hexEncode(signature),
    hexEncode(publicKey)
  );
  
  if (!valid) {
    const status = Status.Unauthorized;
    return new Response("Invalid Request.", { status })
  } else {
    const interaction = JSON.parse(body);
    const event = Object.values(events)
      .find(ctx => ctx.data.type == interaction.type);
    
    if (event) return await event.execute({ branch, request, interaction });
  }
};

function hexEncode(hex) {
  return new Uint8Array(
    hex.match(/.{1,2}/g).map(ctx => parseInt(ctx, 16))
  );
};
