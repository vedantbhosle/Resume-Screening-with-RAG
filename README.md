# 🧠 AI Resume Screening & RAG System

A production-grade AI application that screens resumes against job descriptions and allows recruiters to chat with the candidate's profile using **RAG (Retrieval Augmented Generation)**.

## 🚀 Features

- **Store & Embed**: Uploads resumes (PDF/TXT) and Job Descriptions (PDF/TXT).
- **Instant Scoring**: Calculates a match score based on key technical skills found in both documents.
- **Skill Analysis**: Visualizes **Matched Skills** (Strengths) and **Missing Skills** (Gaps).
- **RAG Chat**: Ask questions ('experience with React?', 'leadership skills?') and get answers grounded purely in the resume's content using GPT-4o-mini.
- **Premium UI**: Modern glassmorphism design with React.

---

## 🏗️ Architecture

The project is a monorepo containing:

- **`backend/`** (Python + FastAPI)
  - Handles PDF parsing, OpenAI embeddings, Vector Storage (In-Memory), and RAG logic.
- **`frontend/`** (Vite + React + TypeScript)
  - Provides the file upload interface, score dashboard, and interactive chat window.

---

## 🛠️ Prerequisites

- **Python 3.11+**
- **Node.js**: v18+
- **OpenAI API Key**: Required for embeddings and chat.

---

## ⚡ Setup Guide

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
   - Create a `.env` file in `backend/` (or edit existing).
   - Add your OpenAI API Key:
     ```env
     OPENAI_API_KEY=sk-your-actual-api-key-here
     PORT=5000
     ```
5. Start the Server:
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 5000 --reload
   ```
   *The server runs on http://127.0.0.1:5000*

### 2. Setup Frontend (React)

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
4. Open the app in your browser (usually `http://localhost:5173`).

---

## 📖 How to Use the UI

### Step 1: Upload Documents
- On the home screen, you will see two upload areas.
- **Resume**: Click or drag-and-drop a candidate's Resume (PDF or TXT).
- **Job Description**: Click or drag-and-drop the Job Description (JD) file (PDF or TXT).
- Once both files are selected, click **"Process Files"**.

### Step 2: Review Analysis
- The system will process the documents and display:
  - **Match Score**: A percentage indicating how well the candidate matches the JD.
  - **Matched Skills**: Technical skills found in both the Resume and JD (Green).
  - **Missing Skills**: Skills required by the JD but missing from the Resume (Red).

### Step 3: Interview Chat (RAG)
- After analysis, the **AI Interview Chat** becomes active on the right.
- You can ask natural language questions about the candidate.
  - *Example: "Does this candidate have experience with cloud platforms?"*
  - *Example: "What is their education background?"*
- The AI will answer **only** using information found in the Resume.

---

## 📂 Project Structure

```
resume-rag/
├── backend/                # Python FastAPI Backend
│   ├── app/
│   │   ├── api/            # API Endpoints (upload, analyze, chat)
│   │   ├── services/       # Logic: PDF, Embeddings, Scoring, RAG
│   │   ├── utils/          # Helpers (Chunking)
│   │   └── main.py         # App Entry Point
│   ├── requirements.txt
│   └── .env
│
└── frontend/               # React Frontend
    ├── src/
    │   ├── components/     # Upload, MatchDisplay, ChatBox
    │   ├── api.ts          # API calls to Backend
    │   └── App.tsx         # Main Layout
    └── index.css           # Styling
```
