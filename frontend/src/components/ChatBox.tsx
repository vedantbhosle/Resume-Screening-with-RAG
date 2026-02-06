import React, { useState, useRef, useEffect } from 'react'
import { chatWithRag } from '../api'
import { MessageSquare, Send, Bot } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export const ChatBox: React.FC = () => {
  const [query, setQuery] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if(!query.trim()) return
    const userMsg: Message = { role: 'user', content: query }
    setMessages(prev => [...prev, userMsg])
    setQuery("")
    setLoading(true)

    try {
       const res = await chatWithRag(userMsg.content)
       setMessages(prev => [...prev, { role: 'assistant', content: res.answer }])
    } catch(e) {
       setMessages(prev => [...prev, { role: 'assistant', content: "Error getting response." }])
    } finally {
       setLoading(false)
    }
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
         <MessageSquare size={20} color="var(--accent-blue)"/>
         <span>AI Interview Chat</span>
      </div>

      <div className="chat-messages">
        {messages.length === 0 && (
            <div style={{textAlign:'center', color:'var(--text-muted)', marginTop:'2rem'}}>
                <Bot size={48} style={{margin:'0 auto', opacity:0.2, marginBottom:'0.5rem'}}/>
                <p>Ask questions about the candidate...</p>
            </div>
        )}
        {messages.map((m,i) => (
           <div key={i} className={`message ${m.role}`}>
              <div className="message-bubble">{m.content}</div>
           </div>
        ))}
        {loading && (
           <div className="message assistant">
              <div className="message-bubble loading-dots">
                  <div className="dot"></div><div className="dot"></div><div className="dot"></div>
              </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
         <input 
           value={query}
           onChange={e => setQuery(e.target.value)}
           onKeyDown={e => e.key === 'Enter' && handleSend()}
           placeholder="Ask about skills, experience..."
           className="chat-input"
         />
         <button 
           onClick={handleSend}
           disabled={loading || !query.trim()}
           className="btn-send"
         >
           <Send size={20}/>
         </button>
      </div>
    </div>
  )
}
