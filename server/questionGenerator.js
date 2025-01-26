const {
  BedrockRuntimeClient,
  InvokeModelCommand,
} = require("@aws-sdk/client-bedrock-runtime");
const dotenv = require("dotenv");
dotenv.config();

const bedrockClient = new BedrockRuntimeClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function invokeClaudeSonnet(prompt) {
  const params = {
    modelId: "us.anthropic.claude-3-5-sonnet-20241022-v2:0",
    contentType: "application/json",
    accept: "application/json",
    body: JSON.stringify({
      anthropic_version: "bedrock-2023-05-31",
      max_tokens: 10000,
      top_k: 250,
      stop_sequences: [],
      temperature: 1,
      top_p: 0.999,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt,
            },
          ],
        },
      ],
    }),
  };

  try {
    const response = await bedrockClient.send(new InvokeModelCommand(params));
    return JSON.parse(Buffer.from(response.body).toString("utf-8"));
  } catch (error) {
    console.error("Bedrock API Error:", error);
    throw error;
  }
}

async function askClaudeController(req, res) {
  const {
    videoLanguage,
    numberOfQuestions,
    questionType,
    proficiency,
    questionLanguage,
    transcript,
  } = req.body;

  const prompt = `ONLY GIVE ME A JSON RESPONSE. I am going to give you a video transcript in ${videoLanguage} and I want you to create ${numberOfQuestions} ${questionType} questions about this video in ${questionLanguage}. There are three proficiency levels (beginner, intermediate, advanced). I want these questions to be ${proficiency} leve. For each question include the question number, start timestamp, duration time, question, and answer. The JSON should be formatted like this 
  {
    "questions": [
        {
            "number": 1,
            "startTime": "85.439",
            "duration": "4.72",
            "question": "¿Qué porcentaje de la población mundial habría ganado el punto?",
            "options": [
                "a) 95%",
                "b) 99%",
                "c) 90%",
                "d) 97%"
            ],
            "correctAnswer": "b) 99%"
        },
        {
            "number": 2,
            "startTime": "99.0",
            "duration": "3.52",
            "question": "¿Qué tenía el jugador en la pierna?",
            "options": [
                "a) Una venda",
                "b) Una lesión",
                "c) Un vendaje",
                "d) Una marca"
            ],
            "correctAnswer": "a) Una venda"
        }
    ]
  }
  Here is the transcript: \n\n${transcript}`;

  try {
    const response = await invokeClaudeSonnet(prompt);
    questionsDict = JSON.parse(response.content[0].text);
    console.log(questionsDict);
    res.json(questionsDict);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = askClaudeController;
