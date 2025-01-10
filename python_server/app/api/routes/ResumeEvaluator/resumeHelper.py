# import json
# import re
# from werkzeug.utils import secure_filename
# from io import BytesIO
# import PyPDF2
# import docx
# import pypandoc


# # Utility to check allowed file types
# def allowed_file(filename: str) -> bool:
#     ALLOWED_EXTENSIONS = {'pdf', 'docx', 'txt', 'odt', 'tex', 'html', 'rtf'}
#     return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# # Utility to extract text from file based on extension
# def extract_text(file: BytesIO, file_extension: str) -> str:
#     if file_extension == 'pdf':
#         return extract_text_from_pdf(file)
#     elif file_extension == 'docx':
#         return extract_text_from_docx(file)
#     elif file_extension == 'odt':
#         return extract_text_from_odt(file)
#     elif file_extension == 'tex':
#         return extract_text_from_tex(file)
#     elif file_extension == 'html':
#         return extract_text_from_html(file)
#     elif file_extension == 'rtf':
#         return extract_text_from_rtf(file)
#     else:
#         file.seek(0)
#         return file.read().decode('utf-8')


# # Function to extract text from PDF
# def extract_text_from_pdf(file: BytesIO) -> str:
#     text = ""
#     try:
#         reader = PyPDF2.PdfReader(file)
#         for page in reader.pages:
#             text += page.extract_text() or ""
#     except Exception as e:
#         raise Exception(f"Error extracting PDF text: {e}")
#     return text


# # Function to extract text from DOCX
# def extract_text_from_docx(file: BytesIO) -> str:
#     doc = docx.Document(file)
#     return '\n'.join([paragraph.text for paragraph in doc.paragraphs])


# # Function to extract text from ODT
# def extract_text_from_odt(file: BytesIO) -> str:
#     return pypandoc.convert_file(file, 'plain', format='odt')


# # Function to extract text from TEX
# def extract_text_from_tex(file: BytesIO) -> str:
#     return pypandoc.convert_file(file, 'plain', format='tex')


# # Function to extract text from HTML
# def extract_text_from_html(file: BytesIO) -> str:
#     return pypandoc.convert_file(file, 'plain', format='html')


# # Function to extract text from RTF
# def extract_text_from_rtf(file: BytesIO) -> str:
#     return pypandoc.convert_file(file, 'plain', format='rtf')


# # Extract JSON from response content
# def extract_json_from_response(response_content: str) -> dict:
#     try:
#         json_str_match = re.search(r'\{.*\}', response_content, re.DOTALL)
#         if json_str_match:
#             return json.loads(json_str_match.group())
#         raise ValueError("No JSON object found in response")
#     except json.JSONDecodeError as e:
#         raise ValueError(f"JSON decoding error: {e}")
#     except Exception as e:
#         raise Exception(f"Error extracting JSON: {e}")


import json
import re
from werkzeug.utils import secure_filename
from io import BytesIO
import PyPDF2
# import docx2txt
import subprocess


# Utility to check allowed file types
def allowed_file(filename: str) -> bool:
    ALLOWED_EXTENSIONS = {'pdf', 'docx', 'txt', 'odt', 'tex', 'html', 'rtf'}
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
        raise Exception(f"Error extracting PDF text: {e}")
    return text


# Function to extract text from DOCX using docx2txt
def extract_text_from_docx(file: BytesIO) -> str:
    try:
        # Save the file temporarily for docx2txt processing
        with open("temp.docx", "wb") as temp_file:
            temp_file.write(file.read())
        # Extract text using docx2txt
        # text = docx2txt.process("temp.docx")
        # return text
    except Exception as e:
        raise Exception(f"Error extracting DOCX text: {e}")


# Function to extract text from ODT using pandoc (alternative to pypandoc)
def extract_text_from_odt(file: BytesIO) -> str:
    try:
        # Save the file temporarily for pandoc processing
        with open("temp.odt", "wb") as temp_file:
            temp_file.write(file.read())
        # Extract text using pandoc (requires pandoc installed)
        result = subprocess.run(
            ['pandoc', 'temp.odt', '-t', 'plain'], 
            stdout=subprocess.PIPE, stderr=subprocess.PIPE
        )
        if result.returncode != 0:
            raise Exception(f"Error extracting text from ODT: {result.stderr.decode()}")
        return result.stdout.decode('utf-8')
    except Exception as e:
        raise Exception(f"Error extracting ODT text: {e}")


# Function to extract text from TEX using pandoc
def extract_text_from_tex(file: BytesIO) -> str:
    try:
        # Save the file temporarily for pandoc processing
        with open("temp.tex", "wb") as temp_file:
            temp_file.write(file.read())
        # Extract text using pandoc (requires pandoc installed)
        result = subprocess.run(
            ['pandoc', 'temp.tex', '-t', 'plain'], 
            stdout=subprocess.PIPE, stderr=subprocess.PIPE
        )
        if result.returncode != 0:
            raise Exception(f"Error extracting text from TEX: {result.stderr.decode()}")
        return result.stdout.decode('utf-8')
    except Exception as e:
        raise Exception(f"Error extracting TEX text: {e}")


# Function to extract text from HTML using pandoc
def extract_text_from_html(file: BytesIO) -> str:
    try:
        # Save the file temporarily for pandoc processing
        with open("temp.html", "wb") as temp_file:
            temp_file.write(file.read())
        # Extract text using pandoc (requires pandoc installed)
        result = subprocess.run(
            ['pandoc', 'temp.html', '-t', 'plain'], 
            stdout=subprocess.PIPE, stderr=subprocess.PIPE
        )
        if result.returncode != 0:
            raise Exception(f"Error extracting text from HTML: {result.stderr.decode()}")
        return result.stdout.decode('utf-8')
    except Exception as e:
        raise Exception(f"Error extracting HTML text: {e}")


# Function to extract text from RTF using pandoc
def extract_text_from_rtf(file: BytesIO) -> str:
    try:
        # Save the file temporarily for pandoc processing
        with open("temp.rtf", "wb") as temp_file:
            temp_file.write(file.read())
        # Extract text using pandoc (requires pandoc installed)
        result = subprocess.run(
            ['pandoc', 'temp.rtf', '-t', 'plain'], 
            stdout=subprocess.PIPE, stderr=subprocess.PIPE
        )
        if result.returncode != 0:
            raise Exception(f"Error extracting text from RTF: {result.stderr.decode()}")
        return result.stdout.decode('utf-8')
    except Exception as e:
        raise Exception(f"Error extracting RTF text: {e}")


# Extract JSON from response content
def extract_json_from_response(response_content: str) -> dict:
    try:
        json_str_match = re.search(r'\{.*\}', response_content, re.DOTALL)
        if json_str_match:
            return json.loads(json_str_match.group())
        raise ValueError("No JSON object found in response")
    except json.JSONDecodeError as e:
        raise ValueError(f"JSON decoding error: {e}")
    except Exception as e:
        raise Exception(f"Error extracting JSON: {e}")
