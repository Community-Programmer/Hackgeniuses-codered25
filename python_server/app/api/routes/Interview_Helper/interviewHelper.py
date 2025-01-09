from fastapi import APIRouter, Cookie, Request
from .helper import generate_roadmap,generate_content,speak_test,generate_quiz
from fastapi.responses import JSONResponse


router = APIRouter()


'''
Note - These Endponts not exposed to client directly
       Server Side Auth Is required
'''

#For generating the Roadmap of the topic
@router.post("/roadmap")
async def roadmap(topic: str,token: str = Cookie(None)):
    roadmap = await generate_roadmap(topic)
    return roadmap

#For generating the Content of the roadmap topic
@router.post("/roadmap/generatecontent")
async def generate_roadmap_content(request: Request,token: str = Cookie(None)):
    topic= await request.json()
    print(topic)
    roadmap = await generate_content(topic)
    return roadmap

#For generating the Quiz for whole roadmap
@router.post("/generatequiz")
async def generate_roadmap_quiz(request: Request,token: str = Cookie(None)):
    content = await request.json()
    print(content)
    quiz = await generate_quiz(content)
    return quiz





@router.post("/speak")
async def generate_roadmap_content(request: Request,token: str = Cookie(None)):
    topic= await request.json()
    print(topic)
    roadmap = await speak_test(topic)
    return roadmap