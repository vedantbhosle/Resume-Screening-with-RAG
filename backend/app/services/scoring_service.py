
import re
from openai import OpenAI
import os

SKILL_DB = ["react", "node", "python", "aws", "docker", "sql", "mongodb", "typescript", "javascript", "go", "java", "c++", "kubernetes", "terraform", "azure", "gcp"]

def extract_skills_from_text(text: str) -> list[str]:
    text_lower = text.lower()
    found_skills = []
    for skill in SKILL_DB:
        # Simple inclusion check. For more robustness could use regex boundries.
        if re.search(r'\b' + re.escape(skill) + r'\b', text_lower):
            found_skills.append(skill)
    return list(set(found_skills))

def calculate_match(resume_text: str, jd_text: str):
    r_skills = extract_skills_from_text(resume_text)
    j_skills = extract_skills_from_text(jd_text)
    
    # Skills in JD that are also in Resume
    matched = [s for s in j_skills if s in r_skills]
    # Skills in JD that are NOT in Resume
    missing = [s for s in j_skills if s not in r_skills]
    
    score = 0
    if len(j_skills) > 0:
        score = round((len(matched) / len(j_skills)) * 100)
    else:
        # If JD has no keywords from our DB, this naive logic fails. 
        # But keeping it parity with original TS logic which was naive.
        score = 0
        
    return {
        "score": score,
        "matched": matched,
        "missing": missing
    }

def generate_insights_llm(resume_text: str, jd_text: str) -> str:
    """
    Generate a 2-3 sentence summary of strengths and gaps using LLM.
    """
    try:
        client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        prompt = f"""
        You are an expert technical recruiter. Analyze the following Resume against the Job Description.
        Provide a concise summary (max 3 sentences) highlighting the key strengths and critical gaps.
        
        Job Description:
        {jd_text[:2000]}
        
        Resume:
        {resume_text[:2000]}
        
        Output format:
        Strengths: [Draft 1 sentence]
        Gaps: [Draft 1 sentence]
        Overall: [Draft 1 sentence]
        """
        
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=150
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"Error generating insights: {e}")
        return "Could not generate insights at this time."
