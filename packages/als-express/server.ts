import express from "express";
import context from "./storage";

const port = 3100;

const app = express();

app.use(context.middleware);

app.get("/", (req, res) => {
  res.send(`Hello World with: ${context.get("temp") ?? "undefined"}`);
});

app.listen(port, () => {
  `Server is running on port ${port}`;
});
