APIKEY='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'
import openai 
from config import APIKEY

openai.api_key = APIKEY

response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
        {
            "role": "user",
            "content": "Write me a script for hosting a conference on technology"
        }
    ]
)

# Extract the content from the response
output = response['choices'][0]['message']['content']
print(output)
