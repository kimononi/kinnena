import {
  Status,
  serve
} from "http/mod.ts";

await serve(async (request) => {
  const pathnames = eequest.url.origin.pathname.split("/");
  return new Response("Hello World!");
});
