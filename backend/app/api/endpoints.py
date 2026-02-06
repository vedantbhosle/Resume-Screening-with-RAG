
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Body
from pydantic import BaseModel
from typing import List, Optional
import uuid

from ..services.pdf_service import extract_text_from_bytes
from ..services.embedding_service import get_embedding
from ..services.vector_store import add_to_store, clear_store
from ..services.scoring_service import calculate_match, generate_insights_llm
from ..services.rag_service import ask_question
from ..utils.chunking import chunk_text

router = APIRouter()

class AnalyzeRequest(BaseModel):
    resumeText: str
    jdText: str

class ChatRequest(BaseModel):
    question: str
    history: Optional[List[dict]] = []

@router.post("/upload")
async def upload_files(
    resume: UploadFile = File(...),
    jd: UploadFile = File(...)
):
    try:
        # Read files
        resume_bytes = await resume.read()
        jd_bytes = await jd.read()
        
        # Extract Text
        resume_text = extract_text_from_bytes(resume_bytes, resume.filename)
        jd_text = extract_text_from_bytes(jd_bytes, jd.filename)
        
        # Clear previous session data (mvp: single user)
        clear_store()
        
        # Chunk and Embed Resume for RAG
        chunks = chunk_text(resume_text)
        for chunk in chunks:
            embedding = get_embedding(chunk)
            add_to_store({
                "id": str(uuid.uuid4()),
                "text": chunk,
                "embedding": embedding
            })
            
        print(f"Stored {len(chunks)} chunks from resume.")
            
        return {
            "resumeText": resume_text,
            "jdText": jd_text
        }
    except Exception as e:
        print(f"Upload error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/analyze")
async def analyze(req: AnalyzeRequest):
    try:
        # Calculate Score
        match_data = calculate_match(req.resumeText, req.jdText)
        
        # Generate Insights (LLM)
        insights = generate_insights_llm(req.resumeText, req.jdText)
        
        # Combine
        return {
            **match_data,
            "insights": insights
        }
    except Exception as e:
         print(f"Analysis error: {e}")
         raise HTTPException(status_code=500, detail=str(e))

@router.post("/chat")
async def chat(req: ChatRequest):
    try:
        answer = ask_question(req.question, req.history)
        return {"answer": answer} # Frontend expects 'answer' or directly text? Adjusted to keys.
        # If frontend expects plain text, checking `chatController` would have helped.
        # Assuming JSON for modern API.
    except Exception as e:
        print(f"Chat error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
