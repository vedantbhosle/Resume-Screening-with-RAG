# 🧠 AI Resume Screening & RAG System

A production-style AI application that screens resumes against job descriptions and allows recruiters to chat with the candidate's profile using RAG (Retrieval Augmented Generation).

## 🚀 Features

- **Store & Embed**: Uploads resumes (PDF/TXT), chunks text, and generates vector embeddings using OpenAI.
- **Instant Scoring**: Calculates a keyword-based match score between the Resume and Job Description.
- **RAG Chat**: Ask questions ('experience with React?', 'leadership skills?') and get answers grounded purely in the resume's content.
- **Premium UI**: Modern glassmorphism design with React & Vanilla CSS.

---

## 🏗️ Architecture

The project is a monorepo containing:

- **`backend/`** (Express + TypeScript)
  - Handles parsing, embedding, vector storage (in-memory), and RAG logic.
- **`frontend/`** (Vite + React + TypeScript)
  - Provides the upload interface, score visualization, and chat window.

---

## 🛠️ Prerequisites

- **Node.js**: v18+ installed.
- **OpenAI API Key**: Required for embeddings and chat completions.

---

## ⚡ Quick Start Guide

### 1. Setup Backend (Python)

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Create and Activate Virtual Environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure Environment:
   - Open `.env` file.
   - Add your OpenAI API Key:
     ```env
     OPENAI_API_KEY=sk-your-actual-api-key-here
     PORT=5000
     ```
5. Start the Server:
   ```bash
   uvicorn app.main:app --port 5000 --reload
   ```
   *The server runs on http://localhost:5000*

### 2. Setup Frontend

1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the UI:
   ```bash
   npm run dev
   ```
4. Click the link (usually http://localhost:5173`) to open the app.

---

## 🔍 How It Works

### 1. Data Ingestion
- When you upload `resume.pdf` and `job_description.txt`:
  - The backend extracts raw text using `pdf-parse`.
  - The text is split into chunks of 800 characters (overlap 150).
  - Each chunk is sent to OpenAI's `text-embedding-3-small` model to create a vector.
  - Vectors are stored in an in-memory array (`vectorStore.ts`).

### 2. Matching Logic
- The system extracts keywords (e.g., 'React', 'Python', 'AWS') from both documents.
- It calculates a similarity percentage based on the overlap of skills found in the Job Description vs. the Resume.

### 3. RAG Chat Engine
- When you ask a question:
  - The question is embedded into a vector.
  - The system searches the Vector Store for the top 3 most similar resume chunks (cosine similarity).
  - These chunks are fed as "Context" into GPT-4o-mini along with your question.
  - The LLM answers using ONLY that context.

---

## 📂 Project Structure

```
resume-rag/
├── backend/
│   ├── src/
│   │   ├── services/       # Core logic (PDF, Embeddings, RAG)
│   │   ├── controllers/    # API Request Handlers
│   │   ├── memory/         # In-memory storage
│   │   └── server.ts       # Entry point
│   └── .env                # API Keys
│
└── frontend/
    ├── src/
    │   ├── components/     # UI Widgets (Upload, ChatBox)
    │   ├── api.ts          # Backend connection
    │   └── index.css       # Global Premium Styling
```
