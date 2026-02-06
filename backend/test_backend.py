
import urllib.request
import json
import mimetypes
import uuid

BASE_URL = "http://127.0.0.1:5000/api"

def post_multipart(url, fields, files):
    boundary = uuid.uuid4().hex
    data = io.BytesIO()
    
    for name, value in fields.items():
        data.write(f'--{boundary}\r\n'.encode())
        data.write(f'Content-Disposition: form-data; name="{name}"\r\n\r\n'.encode())
        data.write(f'{value}\r\n'.encode())
        
    for name, (filename, content) in files.items():
        content_type = mimetypes.guess_type(filename)[0] or 'application/octet-stream'
        data.write(f'--{boundary}\r\n'.encode())
        data.write(f'Content-Disposition: form-data; name="{name}"; filename="{filename}"\r\n'.encode())
        data.write(f'Content-Type: {content_type}\r\n\r\n'.encode())
        data.write(content)
        data.write(b'\r\n')
        
    data.write(f'--{boundary}--\r\n'.encode())
    
    req = urllib.request.Request(url, data=data.getvalue(), method='POST')
    req.add_header('Content-Type', f'multipart/form-data; boundary={boundary}')
    
    try:
        with urllib.request.urlopen(req) as response:
            return json.loads(response.read().decode())
    except urllib.error.HTTPError as e:
        print(f"Error {e.code}: {e.read().decode()}")
        return None

def post_json(url, data):
    req = urllib.request.Request(
        url, 
        data=json.dumps(data).encode(), 
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    try:
        with urllib.request.urlopen(req) as response:
            return json.loads(response.read().decode())
    except urllib.error.HTTPError as e:
        print(f"Error {e.code}: {e.read().decode()}")
        return None

import io

print("--- Testing /upload ---")
with open("test_resume.txt", "rb") as f:
    resume_content = f.read()
with open("test_jd.txt", "rb") as f:
    jd_content = f.read()

upload_res = post_multipart(
    f"{BASE_URL}/upload", 
    {}, 
    {
        "resume": ("test_resume.txt", resume_content), 
        "jd": ("test_jd.txt", jd_content)
    }
)
print(json.dumps(upload_res, indent=2))

if upload_res:
    resume_text = upload_res.get("resumeText", "")
    jd_text = upload_res.get("jdText", "")
    
    print("\n--- Testing /analyze ---")
    analyze_res = post_json(f"{BASE_URL}/analyze", {
        "resumeText": resume_text,
        "jdText": jd_text
    })
    print(json.dumps(analyze_res, indent=2))
    
    print("\n--- Testing /chat ---")
    chat_res = post_json(f"{BASE_URL}/chat", {
        "question": "What skills does the candidate have?"
    })
    print(json.dumps(chat_res, indent=2))
