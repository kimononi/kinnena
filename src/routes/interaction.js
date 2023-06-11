import { Status } from "http/status.ts";
import { sign } from "https://cdn.skypack.dev/tweetnacl@1.0.3";

import * as events from "../events/mod.js";

export const data = {
  method: "POST",
  pathname: "interaction"
};

export async function execute(request) {
  
  const publicKey = Deno.env.get("DISCORD_PUBLIC_KEY");
  const body = await requestEvent.request.text();
  const signature = requestEvent.request.headers.get("x-signature-ed25519");
  const timestamp = requestEvent.request.headers.get("x-signature-timestamp");
  
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
    
    if (event) return await event.execute({ request, interaction });
  }
};

function hexEncode(hex) {
  return new Uint8Array(
    hex.match(/.{1,2}/g).map(ctx => parseInt(ctx, 16))
  );
};
