from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import logging
import json
import re
from werkzeug.utils import secure_filename
from io import BytesIO
from .resumeHelper import extract_text, allowed_file, extract_json_from_response
from groq import Groq
import os

router = APIRouter()

# Initialize Groq client
# GROQ_API_KEY = os.getenv("GROQ_API_KEY")
client = Groq(api_key='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')

# Logging configuration
logging.basicConfig(level=logging.INFO)

# Endpoint to test server
@router.get("/test")
async def test():
    return JSONResponse(content={"message": "Server is running"}, status_code=200)

@router.post("/evaluate-resume")
async def evaluate_resume(file: UploadFile = File(...)):
    logging.info(f"ATS Response: {ats_response.choices[0].message.content}")

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
