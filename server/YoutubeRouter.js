const express = require("express");
const { spawn } = require("child_process");

const YouTubeRouter = express.Router();
YouTubeRouter.get("/hello", (req, res) => {
  console.log("Hello");
});

YouTubeRouter.post("/", (req, res) => {
  const videoId = req.body.videoId || "hRKPJ0CBzsI";
  console.log(videoId);

  if (!videoId) {
    return res.status(400).send("Error: videoId query parameter is required.");
  }
  const pythonProcess = spawn("python3", ["./script.py", videoId]);
  let dataToSend = "";

  pythonProcess.stdout.on("data", (data) => {
    dataToSend += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error("Python script error:", data.toString());
  });

  pythonProcess.on("close", (code) => {
    if (code === 0) {
      res.send(dataToSend);
    } else {
      res.status(500).send("Python script exited with an error.");
    }
  });
});

module.exports = YouTubeRouter;
