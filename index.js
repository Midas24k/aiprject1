const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// POST route to handle questions
app.post('/ask', (req, res) => {
    const question = req.body.question;
    // Here, you can implement your logic to respond to the question
    // For simplicity, let's just echo back the question
    res.json({ answer: `You asked: ${question}` });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});