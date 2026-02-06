import axios from "axios"

export const api = axios.create({
  baseURL: "http://127.0.0.1:5000/api"
})

export const uploadFiles = async (formData: FormData) => {
  const res = await api.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  })
  return res.data
}

export const analyzeResume = async (resumeText: string, jdText: string) => {
  const res = await api.post("/analyze", { resumeText, jdText })
  return res.data
}

export const chatWithRag = async (question: string) => {
  const res = await api.post("/chat", { question })
  return res.data
}
