
import math

# Global In-Memory Store
# Structure: List of dicts: {"id": str, "text": str, "embedding": list[float], "doc_id": str}
store = []

def add_to_store(chunk):
    """
    chunk: dict with keys 'id', 'text', 'embedding'
    """
    store.append(chunk)

def get_store():
    return store

def clear_store():
    global store
    store = []

def cosine_similarity(a, b):
    dot = sum(x * y for x, y in zip(a, b))
    norm_a = math.sqrt(sum(x * x for x in a))
    norm_b = math.sqrt(sum(x * x for x in b))
    if norm_a == 0 or norm_b == 0:
        return 0
    return dot / (norm_a * norm_b)

def search_similar(query_embedding, top_k=3):
    """
    Returns top_k chunks sorted by cosine similarity
    """
    scores = []
    for chunk in store:
        score = cosine_similarity(query_embedding, chunk['embedding'])
        scores.append({
            "text": chunk['text'],
            "score": score,
            "id": chunk.get('id')
        })
    
    # Sort descending
    scores.sort(key=lambda x: x['score'], reverse=True)
    return scores[:top_k]
