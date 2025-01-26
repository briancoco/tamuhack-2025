const express = require('express');
const app = express()
const askClaudeController = require('./questionGenerator')
const cors = require('cors')

app.use(cors({ origin: false }));

app.get('/askClaude', askClaudeController);

app.listen(8080, () => {
  console.log('Server listening on port 8080');
});