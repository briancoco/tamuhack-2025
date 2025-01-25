const express = require('express');
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
      max_tokens: 200,
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

const app = express()
require('dotenv').config()
const connectDB = require('./db/connect')

app.get('/', (req, res) => {
  res.json("Hello World")
})

app.get('/ask-claude', async (req, res) => {
  try {
    const response = await invokeClaudeSonnet("Hello Claude!");
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const start = async () => {
  const port = process.env.PORT
  try {
    // await connectDB()
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`)
    })
  } catch (error) {
    console.log(error.message)
  }
}

start()
