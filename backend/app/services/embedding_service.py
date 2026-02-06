
from openai import OpenAI
import os

# Initialize client globally (lazily) or per request. 
# Better to do per request or just use global if env is set at startup.
# We'll use a getter to ensure env var is picked up.

def get_openai_client():
    return OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def get_embedding(text: str):
    """
    Generate embedding for text using text-embedding-3-small
    """
    chunk_text = text.replace("\n", " ")
    # Truncate if too long? OpenAI has limits, but for chunks it should be fine.
    
    try:
        client = get_openai_client()
        response = client.embeddings.create(
            input=[chunk_text],
            model="text-embedding-3-small"
        )
        return response.data[0].embedding
    except Exception as e:
        print(f"Error generating embedding: {e}")
        return []
