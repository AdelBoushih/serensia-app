import { GetSuggestions } from "./Test1/suggestions";
import { GetEmailsInPageAndChildPages, getHtml } from "./Test2/emails";
import express from "express";
import path from "path";
var bodyParser = require("body-parser");

const cors = require("cors");

const app = express();
const port = 8100; // default port to listen

app.use(cors());
app.options("*", cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
// define a route handler for the default home page
app.get("/", async (_req, res) => {
  res.send("/test1 pour Le premier Test & /test2 pour Le deuxième Test");
});

app.post("/test1", async (req, res) => {
  const suggestions = GetSuggestions(
    req.body?.term,
    req.body?.choices,
    req.body?.number_suggestions
  );
  res.send(suggestions);
});

app.post("/test2", async (req, res) => {
  const browser = { getHtml };
  const emails = await GetEmailsInPageAndChildPages(
    browser,
    path.normalize(req.body?.url),
    req.body?.maxDepth
  );
  res.send(emails);
});

// start the Express server
app.listen(port, () => {
  console.log(`Application started at http://localhost:${port}`);
  console.log(`To run unit tests, npm run test`);
});
