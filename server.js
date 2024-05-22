const express = require('express');
const bodyParser = require('body-parser');
const { OpenAI } = require("@langchain/openai");
const { PromptTemplate } = require("@langchain/core/prompts");
require('dotenv').config();

const app = express();
const port = 3000;

//Middleware to parse the JSON requests
app.use(bodyParser.json());

const model = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
    model: 'gpt-3.5-turbo',
});

const promptFunc = async (input) => {
    try {
        // Format the prompt with the user input
        const promptInput = await prompt.format({ 
          question: input 
        });
        const res = await model.invoke(promptInput);
        return res;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
};

// Instantiation of a new object called "prompt" using the PromptTemplate class
const prompt = new PromptTemplate({
  template:"You are a programming expert and will answer the user’s coding questions as thoroughly as possible using JavaScript. If the question is unrelated to coding, do not answer.\n{question}",
  inputVariables: ["question"]
});

// Endpoint to handle request
app.post('/ask', async (req, res) => {
    try {
      const userQuestion = req.body.question;
  
      if (!userQuestion) {
        return res.status(400).json({ error: 'Please provide a question in the request body.' });
      }
  
      const result = await promptFunc(userQuestion);
      res.json({ result });
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }

});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log('the server works!')
  });

