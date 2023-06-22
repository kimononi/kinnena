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
    content: "## Kenshō~\n* Sebelum verifikasi, pastiin kamu sudah baca semua <#969506184199540796> disini dan siap menerima peringatan atau tindakan dari admin apabila melanggar.",
    components: [{
      type: ComponentType.ActionRow,
      components: [{
        type: ComponentType.Button,
        custom_id: "verification",
        style: ButtonStyle.Secondary,
        label: "Utiwi~",
        emoji: { animated: false, name: "hutao_drink", id: "1121352722332008480" }
      }]
    }]
  });
  
  const testResult = await fetch(RouteBases.api + Routes.channelMessages("1115194663872253992"), {
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
