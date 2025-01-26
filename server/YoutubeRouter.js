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
    if (code !== 0) {
      res.status(500).send("Python script exited with an error.");
    } else {
      newRequestBody = {
        videoLanguage: "English",
        numberOfQuestions: 5,
        questionType: "Multiple Choice",
        proficiency: "Beginner",
        questionLanguage: "Spanish",
        transcript: dataToSend,
      };
      fetch("http://localhost:8080/askClaude", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRequestBody),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.text();
        })
        .then((text) => {
          try {
            const data = JSON.parse(text);
            console.log("Data from /askClaude:", data);
            res.send(data);
          } catch (e) {
            console.error("Failed to parse JSON:", text);
          }
        })
        .catch((error) => {
          console.error("Error fetching /askClaude:", error);
        });
    }
  });
});

module.exports = YouTubeRouter;
