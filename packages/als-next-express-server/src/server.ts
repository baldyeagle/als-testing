import { parse } from "url";
import next from "next";
import context from "@/storage";
import express from "express";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3103;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const server = express();

app.prepare().then(() => {
  server.use(context.middleware);

  // This works
  // server.get("/", (req, res) => {
  //   res.send(`Hello World with: ${context.get("temp") ?? "undefined"}`);
  // });

  // This doesn't show the value of `context.get("temp")` in ./page.tsx
  server.get("/*", async (req, res) => {
    console.log(context.get("temp") ?? "undefined"); // "stored temporary value!!!" is correct
    const parsedUrl = parse(req.url, true);
    return await handle(req, res, parsedUrl);
  });

  server.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
