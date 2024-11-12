const apiKey = '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';

async function generateQuestion() {
    const topic = document.getElementById('topic').value;
    const response = await fetch('/generate-question', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ topic })
    });
    const data = await response.json();
    const question = data.question;
    document.getElementById('questionPlaceholder').innerText = question;
}

async function checkAnswer() {
    const question = document.getElementById('questionPlaceholder').innerText;
    const userAnswer = document.getElementById('userAnswer').value;
    const response = await fetch('/check-answer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question, userAnswer })
    });
    const data = await response.json();
    const feedback = data.feedback;
    document.getElementById('feedbackPlaceholder').innerText = feedback;
}
