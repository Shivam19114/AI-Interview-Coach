import os
import google.generativeai as genai

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TopicRequest(BaseModel):
    topic: str

class EvaluationRequest(BaseModel):
    question: str
    answer: str

@app.get("/")
def home():
    return {"message": "AI Interview Coach Backend Running"}


@app.post("/generate-question")
def generate_question(request: TopicRequest):

    prompt = f"""
    You are an expert technical interviewer.

    Topic: {request.topic}

    Ask exactly ONE interview question.

    Rules:
    - Return only the question.
    - Do not give explanations.
    - Keep it suitable for job interviews.
    """

    response = model.generate_content(prompt)

    return {
        "question": response.text.strip()
    }

@app.post("/evaluate-answer")
def evaluate_answer(request: EvaluationRequest):

    prompt = f"""
    You are an expert technical interviewer.
    
    Interview Question:
    {request.question}
    
    Candidate's Answer:
    {request.answer}
    
    Evaluate the candidate's answer.
    
    Rules:
    - Score should be out of 10.
    - Feedback should be maximum 2 short sentences.
    - Ideal Answer should be maximum 3 short sentences.
    - Improvement Tip should be only 1 sentence.
    - Keep the response concise and interview-focused.
    
    Format the response EXACTLY like this:
    
    Score: X/10
    
    Feedback: ...
    
    Ideal Answer: ...
    
    Improvement Tip: ...
    """

    response = model.generate_content(prompt)

    return {
        "evaluation": response.text.strip()
    }