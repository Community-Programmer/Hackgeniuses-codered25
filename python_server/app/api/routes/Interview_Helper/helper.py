from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.pydantic_v1 import BaseModel
from typing import List, Optional
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import PromptTemplate
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain

async def generate_roadmap(job_role):
    model = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.4)
    
    class RoadMapItem(BaseModel):
        lessonNumber: int
        lessonName: str
        objective: str
        topic: Optional[str] = []

    class RoadMap(BaseModel):
        Image: str
        RoadMapFor: str
        Outcome: str
        RoadMap: List[RoadMapItem]

    parser = JsonOutputParser(pydantic_object=RoadMap)

    prompt = PromptTemplate(
        template="""
        You are an expert in career coaching. Your task is to create a detailed roadmap for preparing for the job role: {text}. 
        The roadmap should be divided into multiple lessons, each with a clear name, objective, and a list of topics to cover. 
        Each lesson should be designed to build upon the previous ones, ensuring a comprehensive preparation for the interview.

        For each lesson, provide the following:
        {format_instructions}
        
        Image: [general image link related to the job role]\n
        RoadMapFor: [job role]\n
        Outcome: [skills and readiness achieved after completing the roadmap]\n
        1. **Lesson [Lesson Number] - [Lesson Name]**
        - **Objective:** A brief description of the goal for this lesson.
        - **Topics in the lesson:**
            - Topic 1
            - Topic 2
            - Topic 3
            - ...

        Ensure that the lessons cover all key skills, industry knowledge, and behavioral preparation for the role. 
        Adapt the roadmap to include both technical and soft skills required for success.
        Your response must begin with ```json.
        """,
        input_variables=["text"],
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )

    chain = prompt | model | parser
    response = chain.invoke({f"text": job_role})
    return response


async def generate_content(job_details):
    model = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.4)
    
    prompt = PromptTemplate(
        template="""
        You are an expert career mentor. Your task is to create a comprehensive lesson to prepare for a specific job role.
        The user will provide you with the lesson details in a JSON format, including the lesson number, name, objective, 
        and topics to cover. Your task is to generate a detailed explanation for each topic, complete with examples, 
        interview tips, questions for practice, and a personalized, engaging narrative. 

        The goal is to ensure the user feels fully prepared for both technical and behavioral interview questions for the job role {details}.
        """,
        input_variables=["details"],
    )

    chain = prompt | model 
    response = chain.invoke({f"details": job_details})
    return response


async def generate_quiz(lesson_content):
    model = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.4)

    class QuestionItem(BaseModel):
        questionNo: int
        question: str
        options: Optional[str] = []
        answer: str

    class Quiz(BaseModel):
        testName: str
        testDescription: str
        totalQuestions: int
        questions: List[QuestionItem]
        difficulty: str

    parser = JsonOutputParser(pydantic_object=Quiz)
    prompt = PromptTemplate(
        template="""
        You are an expert in creating interview preparation quizzes. Based on the lesson content provided in JSON format, 
        generate a quiz for the job role preparation. Include the following:
        1. testName: Name of the test tailored to the job role
        2. testDescription: A brief description of the test purpose
        3. 20 questions, including:
            - Multiple-choice questions
            - True/False questions
            - Scenario-based short-answer questions
        4. Provide 4 answer options for each question, and indicate the correct answer.
        5. Ensure the questions include both technical and behavioral aspects of the job role.
        6. difficulty: Difficulty level based on content.
        
        Please ensure your response begins with ```json and includes all required fields.

        Lesson Content:
        {lesson_content}
        """,
        input_variables=["lesson_content"],
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )

    chain = prompt | model | parser
    response = chain.invoke({"lesson_content": lesson_content})
    return response


memory = ConversationBufferMemory(human_prefix="Friend")

async def speak_test(job_question):
    llm = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.4)
    template = """
    The following is a conversation between a human and an AI. The AI is a friendly and expert career coach who specializes in 
    job interview preparation. The AI provides specific advice, mock interview questions, and tips for personal development 
    tailored to the job role. If the AI does not know the answer, it truthfully says so.

    Current conversation:
    {history}
    Friend: {input}
    AI:"""
    PROMPT = PromptTemplate(input_variables=["history", "input"], template=template)
    chain = ConversationChain(prompt=PROMPT, llm=llm, memory=memory)
    response = chain.invoke({'input': job_question["question"]})
    print(response)
    return response
