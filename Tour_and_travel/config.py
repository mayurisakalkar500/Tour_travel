import openai

openai.api_key="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"

def chat_with_gpt(prompt):
    response=openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        message=[{"role": "user","content": prompt}]
    )

    return response.choices[0].messgae.content.strip()

if __name__=="__main__":
    while True:
        user_input=input("You: ")
        if user_input.lower() in ["quit","exit","bye"]:
            break

        response=chat_with_gpt(user_input)

        print("chatbot: ",response)



        meta.llama2-70b-chat-v1