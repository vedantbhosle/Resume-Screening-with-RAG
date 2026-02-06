
from openai import OpenAI
import os
from .embedding_service import get_embedding
from .vector_store import search_similar

def ask_question(question: str, history: list = None):
    """
    RAG flow: Embed Question -> Search Vector Store -> Build Context -> Query LLM
    """
    q_embed = get_embedding(question)
    context_chunks = search_similar(q_embed)
    
    context_text = "\n\n".join([c['text'] for c in context_chunks])
    
    system_prompt = f"""
    You are a helpful assistant answering questions about a candidate's resume based ONLY on the context provided below.
    If the answer is not in the context, say "I don't see that information in the resume."
    
    Context:
    {context_text}
    """
    
    messages = [{"role": "system", "content": system_prompt}]
    
    # Add history if provided
    if history:
        # History format expected: [{"role": "user", "content": "..."}, {"role": "assistant", "content": "..."}]
        # We assume the frontend passes it correctly or we filter it.
        for msg in history:
            messages.append(msg)
            
    messages.append({"role": "user", "content": question})
    
    try:
        client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Error gathering answer: {e}"
