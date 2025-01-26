const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const askClaudeController = require("./questionGenerator");
const cors = require("cors");
const YouTubeRouter = require("./YoutubeRouter");

app.use(cors({ origin: true }));

app.post("/askClaude", askClaudeController);
app.get("/");
app.use("/youtube", YouTubeRouter);

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
