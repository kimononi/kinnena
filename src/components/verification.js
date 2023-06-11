import { 
  ButtonStyle,
  ComponentType,
  InteractionResponseType,
  MessageFlags
} from "discord_api_types/v10.ts";

export const data = {
  custom_id: "verification",
  type: ComponentType.Button
};

export async function execute({ requestEvent, interaction }) {
  const path = Deno.cwd() + "/src/assets/quizzes";
  const id = Array.from(Deno.readDir(path)).length / 2;
  
  const payload = await Deno.readTextFile(path + `/payload${id}.json`)
    .then(ctx => JSON.parse(ctx));
  const asset = await fetch(`file://${path}/${payload.asset}`)
    .then(res => res.blob());
  
  const components = payload.answers.map((ctx, index) => toButton(ctx, index));
  console.log(components);
  
  const payloadJSON = {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      content: `### ${payload.question}\n${payload.answers.map(({ text }) => `* ${text}`).join("\n")}`,
      flags: MessageFlags.Ephemeral,
      components: [{
        type: ComponentType.ActionRow,
        components
      }]
    }
  };
  
  const formData = new FormData();
  
  formData.set("payload_json", JSON.stringify(payloadJSON));
  formData.set("files[0]", asset, payload.asset);
  
  return new Response(formData);
};

function toButton(ctx, index) {
  console.log(index, ctx);
  const buttonIcon = ["🍥", "🍡", "🫔", "🍜"];
  const keys = ["a", "b", "c", "d"];
  
  return {
    type: ComponentType.Button,
    style: ButtonStyle.Secondary,
    custom_id: `${keys[index]}_${ctx.valid}_first`,
    emoji: { name: buttonIcon[index], id: null }
  }
};
