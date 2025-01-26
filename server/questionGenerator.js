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
        },
        {
            "number": 3,
            "startTime": "150.319",
            "duration": "4.081",
            "question": "¿Qué miraba directamente el jugador?",
            "options": [
                "a) La pelota",
                "b) El sol",
                "c) La red",
                "d) El oponente"
            ],
            "correctAnswer": "b) El sol"
        },
        {
            "number": 4,
            "startTime": "154.4",
            "duration": "6.8",
            "question": "¿Qué demostró Sasha en esa jugada?",
            "options": [
                "a) Velocidad y fuerza",
                "b) Confianza y tiempo",
                "c) Habilidad y poder",
                "d) Técnica y control"
            ],
            "correctAnswer": "b) Confianza y tiempo"
        },
        {
            "number": 5,
            "startTime": "314.32",
            "duration": "3.319",
            "question": "¿Cómo fue el tiro drop de Zov?",
            "options": [
                "a) Excelente",
                "b) Regular",
                "c) Malo",
                "d) Perfecto"
            ],
            "correctAnswer": "c) Malo"
        },
        {
            "number": 6,
            "startTime": "320.84",
            "duration": "4.359",
            "question": "¿Qué estaba sintiendo el jugador?",
            "options": [
                "a) Tensión",
                "b) Alegría",
                "c) Cansancio",
                "d) Enojo"
            ],
            "correctAnswer": "a) Tensión"
        },
        {
            "number": 7,
            "startTime": "349.56",
            "duration": "4.96",
            "question": "¿Cómo fue el tiro de frente?",
            "options": [
                "a) Muy bueno",
                "b) Con suerte",
                "c) Malo",
                "d) Perfecto"
            ],
            "correctAnswer": "b) Con suerte"
        },
        {
            "number": 8,
            "startTime": "405.72",
            "duration": "7.4",
            "question": "¿Cómo fue el lob en ese momento del set?",
            "options": [
                "a) Fácil",
                "b) Regular",
                "c) Difícil",
                "d) Simple"
            ],
            "correctAnswer": "c) Difícil"
        },
        {
            "number": 9,
            "startTime": "465.36",
            "duration": "5.88",
            "question": "¿A qué final llegó el jugador?",
            "options": [
                "a) US Open",
                "b) Wimbledon",
                "c) Australian Open",
                "d) Roland Garros"
            ],
            "correctAnswer": "c) Australian Open"
        },
        {
            "number": 10,
            "startTime": "471.24",
            "duration": "8.639",
            "question": "¿Por qué terminó el partido?",
            "options": [
                "a) Por lluvia",
                "b) Por lesión",
                "c) Por tiempo",
                "d) Por abandono"
            ],
            "correctAnswer": "b) Por lesión"
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
