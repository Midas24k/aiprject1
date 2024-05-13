const { OpenAI } = require("@langchain/openai");
require('dotenv').config();

const model = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
    model: 'gpt-3.5-turbo',
});

const promptFunc = async (input) => {
    try {
        const res = await model.invoke(input);
        return res;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
};

//Test
console.log(promptFunc("How do you capitalize all characters of a string in JavaScript?"));