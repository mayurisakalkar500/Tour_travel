from app import Flask, request, jsonify, render_template
import boto3
import json

app = Flask(__name__)

# Initialize Boto3 client for Amazon Bedrock
bedrock_client = boto3.client('bedrock')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate_question', methods=['POST'])
def generate_question():
    topic = request.json['topic']
    prompt = f"Generate a question about {topic}"

    response = bedrock_client.invoke_model(
        ModelId='your-model-id',
        ContentType='application/json',
        Accept='application/json',
        Body=json.dumps({"input": prompt})
    )

    result = json.loads(response['Body'].read())
    question = result['outputs'][0]['text']
    
    return jsonify({"question": question})

@app.route('/check_answer', methods=['POST'])
def check_answer():
    question = request.json['question']
    user_answer = request.json['answer']
    prompt = f"Question: {question}\nAnswer: {user_answer}\nEvaluate the correctness and relevance of the answer."

    response = bedrock_client.invoke_model(
        ModelId='your-model-id',
        ContentType='application/json',
        Accept='application/json',
        Body=json.dumps({"input": prompt})
    )

    result = json.loads(response['Body'].read())
    feedback = result['outputs'][0]['text']
    
    return jsonify({"feedback": feedback})

if __name__ == '__main__':
    app.run(debug=True)
