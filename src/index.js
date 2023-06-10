import {
  Status,
  serve
} from "http/mod.ts";

await serve(async (request) => {
  const pathnames = request.url.pathname.split("/");
  return new Response("Hello World!");
});
