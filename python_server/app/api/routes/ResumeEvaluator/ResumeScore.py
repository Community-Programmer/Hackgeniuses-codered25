from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
import os
import logging
import json
from werkzeug.utils import secure_filename
import PyPDF2
from groq import Groq
from dotenv import load_dotenv
import docx
import pypandoc
from io import BytesIO
from fastapi import APIRouter, Cookie, Request

from fastapi.responses import JSONResponse


router = APIRouter()

load_dotenv()


# Configuration for file uploads
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf', 'docx', 'txt', 'odt', 'tex', 'html', 'rtf'}
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Initialize Groq client
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
client = Groq(api_key=GROQ_API_KEY)

# Logging configuration
logging.basicConfig(level=logging.INFO)


# Utility to check allowed file types
def allowed_file(filename: str) -> bool:
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# Utility to extract text from file based on extension
def extract_text(file: BytesIO, file_extension: str) -> str:
    if file_extension == 'pdf':
        return extract_text_from_pdf(file)
    elif file_extension == 'docx':
        return extract_text_from_docx(file)
    elif file_extension == 'odt':
        return extract_text_from_odt(file)
    elif file_extension == 'tex':
        return extract_text_from_tex(file)
    elif file_extension == 'html':
        return extract_text_from_html(file)
    elif file_extension == 'rtf':
        return extract_text_from_rtf(file)
    else:
        file.seek(0)
        return file.read().decode('utf-8')


# Function to extract text from PDF
def extract_text_from_pdf(file: BytesIO) -> str:
    text = ""
    try:
        reader = PyPDF2.PdfReader(file)
        for page in reader.pages:
            text += page.extract_text() or ""
    except Exception as e:
        logging.error(f"Error extracting PDF text: {e}")
        raise HTTPException(status_code=500, detail="Error extracting text from PDF")
    return text


# Function to extract text from DOCX
def extract_text_from_docx(file: BytesIO) -> str:
    doc = docx.Document(file)
    return '\n'.join([paragraph.text for paragraph in doc.paragraphs])


# Function to extract text from ODT
def extract_text_from_odt(file: BytesIO) -> str:
    return pypandoc.convert_file(file, 'plain', format='odt')


# Function to extract text from TEX
def extract_text_from_tex(file: BytesIO) -> str:
    return pypandoc.convert_file(file, 'plain', format='tex')


# Function to extract text from HTML
def extract_text_from_html(file: BytesIO) -> str:
    return pypandoc.convert_file(file, 'plain', format='html')


# Function to extract text from RTF
def extract_text_from_rtf(file: BytesIO) -> str:
    return pypandoc.convert_file(file, 'plain', format='rtf')


# Endpoint to test server
@router.get("/test")
async def test():
    return JSONResponse(content={"message": "Server is running"}, status_code=200)


import re

@router.post("/evaluate-resume")
async def evaluate_resume(file: UploadFile = File(...)):
    logging.info('Received request to evaluate resume')

    filename = secure_filename(file.filename)
    file_extension = filename.rsplit('.', 1)[1].lower()

    if not allowed_file(filename):
        raise HTTPException(status_code=400, detail="Invalid file type")

    try:
        file_content = await file.read()
        resume_text = extract_text(BytesIO(file_content), file_extension)
    except Exception as e:
        logging.error(f"Error processing file: {e}")
        raise HTTPException(status_code=500, detail="Error processing uploaded file")

    role = os.getenv("ROLE", "Web Developer")

    ats_prompt = f"""
    Analyze this resume based on ATS compliance and return a detailed analysis in JSON format:
    {{
        "overall_score": "string",
        "sections": {{
            "contact_info": {{
                "status": "string",
                "issues": ["string"],
                "recommendations": ["string"]
            }},
            "summary": {{
                "status": "string",
                "issues": ["string"],
                "recommendations": ["string"]
            }},
            "skills": {{
                "status": "string",
                "issues": ["string"],
                "recommendations": ["string"]
            }},
            "experience": {{
                "status": "string",
                "issues": ["string"],
                "recommendations": ["string"]
            }},
            "education": {{
                "status": "string",
                "issues": ["string"],
                "recommendations": ["string"]
            }},
            "certifications": {{
                "status": "string",
                "issues": ["string"],
                "recommendations": ["string"]
            }}
        }},
        "keyword_analysis": {{
            "matched_keywords": ["string"],
            "missing_keywords": ["string"],
            "recommendations": ["string"]
        }},
        "formatting_analysis": {{
            "readability_score": "string",
            "font_consistency": "string",
            "bullet_point_usage": "string",
            "section_spacing": "string",
            "recommendations": ["string"]
        }},
        "final_recommendations": ["string"]
    }}

    {resume_text}
    """

    normal_prompt = f"""
    You are an expert resume evaluator. Evaluate the resume for the role of {role} and return the following JSON format:
    {{
        "normal_evaluation": {{
            "overall_feedback": {{
                "tone": "string",
                "grammar_and_spelling": "string",
                "flow_and_readability": "string"
            }},
            "strengths": ["string"],
            "weaknesses": ["string"],
            "detailed_feedback": {{
                "summary_section": {{
                    "feedback": "string",
                    "suggestions": ["string"]
                }},
                "experience_section": {{
                    "feedback": "string",
                    "suggestions": ["string"]
                }},
                "skills_section": {{
                    "feedback": "string",
                    "suggestions": ["string"]
                }},
                "education_section": {{
                    "feedback": "string",
                    "suggestions": ["string"]
                }},
                "certifications_section": {{
                    "feedback": "string",
                    "suggestions": ["string"]
                }}
            }},
            "recommendations": ["string"]
        }}
    }}

    {resume_text}
    """

    def extract_json_from_response(response_content: str) -> dict:
        try:
            # Extract JSON using regex
            json_str_match = re.search(r'\{.*\}', response_content, re.DOTALL)
            if json_str_match:
                return json.loads(json_str_match.group())
            raise ValueError("No JSON object found in response")
        except json.JSONDecodeError as e:
            logging.error(f"JSON decoding error: {e}")
            raise HTTPException(status_code=500, detail="Invalid JSON in AI response")
        except Exception as e:
            logging.error(f"Error extracting JSON: {e}")
            raise HTTPException(status_code=500, detail=str(e))

    try:
        ats_response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You are an ATS compliance expert."},
                {"role": "user", "content": ats_prompt}
            ]
        )
        ats_evaluation = extract_json_from_response(ats_response.choices[0].message.content)

        normal_response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You are an expert resume evaluator."},
                {"role": "user", "content": normal_prompt}
            ]
        )
        normal_evaluation = extract_json_from_response(normal_response.choices[0].message.content)

        return JSONResponse(content={
            "ats_evaluation": ats_evaluation,
            "normal_evaluation": normal_evaluation
        }, status_code=200)

    except Exception as e:
        logging.error(f"Error during evaluation: {e}")
        raise HTTPException(status_code=500, detail=str(e))