const { BedrockRuntimeClient, InvokeModelCommand } = require("@aws-sdk/client-bedrock-runtime");
const dotenv = require('dotenv');
dotenv.config();

const bedrockClient = new BedrockRuntimeClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

async function invokeClaudeSonnet(prompt) {
  const params = {
    modelId: 'us.anthropic.claude-3-5-sonnet-20241022-v2:0', 
    contentType: 'application/json',
    accept: 'application/json',
    body: JSON.stringify({
      anthropic_version: 'bedrock-2023-05-31',
      max_tokens: 10000,
      top_k: 250,
      stop_sequences: [],
      temperature: 1,
      top_p: 0.999,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: prompt
            }
          ]
        }
      ]
    })
  };

  try {
    const response = await bedrockClient.send(new InvokeModelCommand(params));
    return JSON.parse(Buffer.from(response.body).toString('utf-8'));
  } catch (error) {
    console.error('Bedrock API Error:', error);
    throw error;
  }
}

async function askClaudeController (req, res) {
  const { videoLanguage, numberOfQuestions, questionType, questionLanguage, transcript } = req.body;
  const transcriptText = transcript
    .map(entry => `[${entry.start}s - ${entry.duration}s] ${entry.text}`)
    .join("\n");

  const prompt = `ONLY GIVE ME A JSON RESPONSE. I am going to give you a video transcript in ${videoLanguage} and I want you to create ${numberOfQuestions} ${questionType} questions about this video in ${questionLanguage}. For each question include the question number, start timestamp, duration time, question, and answer. Here is the transcript: \n\n${transcriptText}`;

<<<<<<< HEAD
async function askClaudeController(req, res) {
    try {
        const prompt = "ONLY GIVE ME A JSON RESPONSE. I am going to give you a video transcript in English and I want you to create 10 multiple-choice questions about this video in Chinese. For each question include the question number, start timestamp, duration time, question, and answer. Here is the transcripte: ";
        const response = await invokeClaudeSonnet(prompt + 'hello');
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
=======
  try {
      const response = await invokeClaudeSonnet(prompt);
      res.json(response);
      
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
>>>>>>> acac11ee49970dffc9997de256cb3ec1ed5abe01
}

module.exports = askClaudeController