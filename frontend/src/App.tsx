import { useState } from 'react'
import { Upload } from './components/Upload'
import { MatchDisplay } from './components/MatchDisplay'
import { ChatBox } from './components/ChatBox'
import { analyzeResume } from './api'
import { Sparkles } from 'lucide-react'

function App() {
  const [result, setResult] = useState<{score:number, matched:string[], missing:string[]} | null>(null)
  const handleUploadSuccess = async (resumeText: string, jdText: string) => {
    try {
      const res = await analyzeResume(resumeText, jdText)
      setResult(res)
    } catch(e) {
      alert("Analysis failed")
    }
  }

  return (
    <div className="container">
      <header style={{textAlign:'center', marginBottom:'3rem'}}>
           <div style={{
             display:'inline-flex', alignItems:'center', gap:'0.5rem', 
             padding:'0.25rem 0.75rem', background:'rgba(59, 130, 246, 0.1)', 
             border:'1px solid rgba(59, 130, 246, 0.2)', borderRadius:'9999px',
             color:'var(--accent-blue)', fontSize:'0.875rem', fontWeight:'500', marginBottom:'1rem'
           }}>
             <Sparkles size={16}/> AI Powered Recruitment
           </div>
           <h1 style={{
             fontSize:'2.5rem', fontWeight:'700', margin:'0.5rem 0',
             background: 'var(--primary-gradient)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent'
           }}>
             Resume Intelligence
           </h1>
           <p style={{color:'var(--text-muted)', maxWidth:'600px', margin:'0 auto'}}>
             Upload a resume and job description to get instant matching analysis and interview insights via RAG technology.
           </p>
      </header>

      <div className="grid-layout">
           <div style={{display:'flex', flexDirection:'column', gap:'1.5rem'}}>
              <Upload onUploadSuccess={handleUploadSuccess}/>
              {result && <MatchDisplay result={result}/>}
           </div>
           
           <div>
              <div style={{
                 transition:'all 0.5s', 
                 opacity: result ? 1 : 0.4, 
                 filter: result ? 'none' : 'blur(4px) grayscale(100%)',
                 pointerEvents: result ? 'auto' : 'none'
              }}>
                 <ChatBox />
              </div>
           </div>
      </div>
    </div>
  )
}

export default App
