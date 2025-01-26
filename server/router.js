const express = require("express");
const app = express();
app.use(express.json());
const askClaudeController = require("./questionGenerator");
const cors = require("cors");
const YouTubeRouter = require("./YoutubeRouter");

app.use(cors({ origin: true }));

app.get("/askClaude", askClaudeController);
app.get("/");
app.use("/youtube", YouTubeRouter);

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
