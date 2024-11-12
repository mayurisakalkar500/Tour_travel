const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const apiKey = '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';
const configuration = new Configuration({ apiKey });
const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.json());
app.use(express.static('.'));

app.post('/generate-question', async (req, res) => {
    const topic = req.body.topic;
    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: `Generate a question about ${topic}.`
                }
            ],
            max_tokens: 50
        });

        const question = response.data.choices[0].message.content.trim();
        res.json({ question });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to generate question' });
    }
});

app.post('/check-answer', async (req, res) => {
    const { question, userAnswer } = req.body;
    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: `Question: ${question}\nAnswer: ${userAnswer}\nEvaluate the correctness and relevance of the answer.`
                }
            ],
            max_tokens: 50
        });

        const feedback = response.data.choices[0].message.content.trim();
        res.json({ feedback });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to check answer' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
