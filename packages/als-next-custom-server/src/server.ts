import { createServer } from "http";
import { parse } from "url";
import next from "next";
import context from "@/storage";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3102;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url!, true);
      // @ts-expect-error
      await context.middleware(req, res, async () => {
        console.log(context.get("temp") ?? "undefined"); // "stored temporary value!!!" is correct
        await handle(req, res, parsedUrl);
      });
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  })
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
