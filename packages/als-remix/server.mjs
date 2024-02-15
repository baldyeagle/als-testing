import { createRequestHandler } from "@remix-run/express";
import { broadcastDevReady } from "@remix-run/node";
import express from "express";
import context from "./storage.mjs";

// notice that the result of `remix build` is "just a module"
import * as build from "./build/index.js";

const getLoadContext = (req, res) => {
  return { context: context.get("temp") };
};

const port = 3000;

const app = express();
app.use(express.static("public"));
app.use(context.middleware);

app.get("/temp", (req, res) => {
  res.send(context.get("temp"));
});

// and your app is "just a request handler"
app.all("*", createRequestHandler({ build, getLoadContext }));

app.listen(3000, () => {
  if (process.env.NODE_ENV === "development") {
    broadcastDevReady(build);
  }
  console.log("App listening on http://localhost:3000");
});
