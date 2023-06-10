import {
  Status,
  serve
} from "http/mod.ts";

await serve(async (request) => {
  const pathnames = request.url.origin.pathname.split("/");
  return new Response("Hello World!");
});
