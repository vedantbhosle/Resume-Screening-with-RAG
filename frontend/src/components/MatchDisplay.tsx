import React from 'react'
import { PieChart, Check, X } from 'lucide-react'

interface MatchDisplayProps {
  result: {
    score: number
    matched: string[]
    missing: string[]
  }
}

export const MatchDisplay: React.FC<MatchDisplayProps> = ({ result }) => {
  return (
    <div className="card">
      <div className="match-score-card">
        <div className="card-header" style={{justifyContent:'center'}}>
           <PieChart size={20} color="var(--accent-purple)"/> Match Score
        </div>
        <div className="score-value">{result.score}%</div>
      </div>

      <div className="skills-grid">
        <div className="skill-box">
           <h3 className="skill-title text-green">
             <Check size={20}/> Matched Skills
           </h3>
           <div className="skill-tags">
             {result.matched.map(s => (
               <span key={s} className="skill-tag matched">{s}</span>
             ))}
             {result.matched.length === 0 && <span style={{color:'var(--text-muted)'}}>No matches</span>}
           </div>
        </div>

        <div className="skill-box">
           <h3 className="skill-title text-red">
             <X size={20}/> Missing Skills
           </h3>
           <div className="skill-tags">
             {result.missing.map(s => (
               <span key={s} className="skill-tag missing">{s}</span>
             ))}
              {result.missing.length === 0 && <span style={{color:'var(--text-muted)'}}>None!</span>}
           </div>
        </div>
      </div>
    </div>
  )
}
