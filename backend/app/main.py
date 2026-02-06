
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from .api import endpoints

load_dotenv()

app = FastAPI(title="Resume RAG Backend")

# CORS setup to allow requests from frontend (default vite port 5173 and others)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For dev, allow all. In prod, lock down.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(endpoints.router, prefix="/api")

@app.on_event("startup")
async def startup_event():
    if not os.getenv("OPENAI_API_KEY"):
        print("WARNING: OPENAI_API_KEY is not set in .env")
    print("Backend started. Ready to serve.")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
