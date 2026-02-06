
from pypdf import PdfReader
import io

def extract_text_from_bytes(file_bytes: bytes, filename: str) -> str:
    """
    Extract text from PDF bytes or direct text if not PDF.
    """
    filename = filename.lower()
    if filename.endswith(".pdf"):
        try:
            reader = PdfReader(io.BytesIO(file_bytes))
            text = ""
            for page in reader.pages:
                text += page.extract_text() + "\n"
            return text
        except Exception as e:
            print(f"Error reading PDF: {e}")
            return ""
    else:
        # Assume text file
        try:
            return file_bytes.decode('utf-8')
        except:
            return str(file_bytes)
