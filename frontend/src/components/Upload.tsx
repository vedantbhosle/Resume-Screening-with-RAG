import React, { useState } from 'react'
import { uploadFiles } from '../api'
import { Upload as UploadIcon, FileText, CheckCircle, Loader2 } from 'lucide-react'

interface UploadProps {
  onUploadSuccess: (resumeText: string, jdText: string) => void
}

export const Upload: React.FC<UploadProps> = ({ onUploadSuccess }) => {
  const [resume, setResume] = useState<File | null>(null)
  const [jd, setJd] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleUpload = async () => {
    if (!resume || !jd) return
    setLoading(true)
    const formData = new FormData()
    formData.append("resume", resume)
    formData.append("jd", jd)

    try {
      const data = await uploadFiles(formData)
      onUploadSuccess(data.resumeText, data.jdText)
    } catch (e: any) {
      console.error(e)
      const msg = e.response?.data?.detail || e.message || "Unknown error"
      alert(`Upload failed: ${msg}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <UploadIcon size={20} color="var(--accent-blue)" />
        <span>Upload Documents</span>
      </div>

      <div className={`file-drop-area ${resume ? 'has-file' : ''}`}>
        <input
          type="file"
          onChange={e => setResume(e.target.files?.[0] || null)}
          className="file-input"
        />
        <div className="file-info">
          {resume ? <CheckCircle size={20} color="var(--accent-green)" /> : <FileText size={20} />}
          <span>{resume ? resume.name : "Upload Resume (PDF/TXT)"}</span>
        </div>
      </div>

      <div className={`file-drop-area ${jd ? 'has-file' : ''}`}>
        <input
          type="file"
          onChange={e => setJd(e.target.files?.[0] || null)}
          className="file-input"
        />
        <div className="file-info">
          {jd ? <CheckCircle size={20} color="var(--accent-green)" /> : <FileText size={20} />}
          <span>{jd ? jd.name : "Upload Job Description (PDF/TXT)"}</span>
        </div>
      </div>

      <button
        onClick={handleUpload}
        disabled={!resume || !jd || loading}
        className="btn-primary"
      >
        {loading ? <Loader2 className="animate-spin" size={20} /> : "Process Files"}
      </button>
    </div>
  )
}
