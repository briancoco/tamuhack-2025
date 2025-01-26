const express = require('express');
const app = express()
app.use(express.json());
const askClaudeController = require('./questionGenerator')

app.get('/askClaude', askClaudeController);

app.listen(8080, () => {
  console.log('Server listening on port 8080');
});