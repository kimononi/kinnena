import {
  ButtonStyle,
  ComponentType,
  RouteBases,
  Routes
} from "discord_api_types/v10.ts";

export const data = {
  method: "GET",
  pathname: "/test",
  requireAuth: true
};

export async function execute({ branch }) {
  const clientToken = Deno.env.get(`${branch}_DISCORD_TOKEN`);
  
  const body = JSON.stringify({
    content: "## Verifikasii~ <:hutao_drink:1121352722332008480>\n* Sebelum verifikasi, pastiin kamu sudah baca semua <#969506184199540796> disini dan siap menerima peringatan atau tindakan dari admin apabila melanggar.",
    components: [{
      type: ComponentType.ActionRow,
      components: [{
        type: ComponentType.Button,
        custom_id: "verification",
        style: ButtonStyle.Secondary,
        label: "Utiwi~"
      }]
    }]
  });
  
  const testResult = await fetch(RouteBases.api + Routes.channelMessages("1115064050875891742"), {
    method: "POST",
    headers: {
      authorization: `Bot ${clientToken}`,
      "content-type": "application/json"
    },
    body
  })
    .then(res => res.json());
  
  return new Response(JSON.stringify(testResult, null, "  "))
};
