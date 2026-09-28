'use client'
import { useState } from 'react'
import { MessageSquare, X, Send } from 'lucide-react'

export default function SparkAIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'IMD Training Directorate Helpdesk: Ask about Doppler Weather Radar (DWR), NWP models, MCQ deadlines, or Trainer Competency Mapping.'
    }
  ])
  const [loading, setLoading] = useState(false)

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim() || loading) return
    const userText = input.trim()
    setMessages((prev) => [...prev, { role: 'user', text: userText }])
    setInput('')
    setLoading(true)

    try {
      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      })
      const data = await resp.json()
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: data.reply || data.response || ' Query processed.' }
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: 'Helpdesk service is active. Please check your module syllabus.' }
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      {isOpen ? (
        <div className="w-80 sm:w-96 bg-white border border-slate-300 rounded-md shadow-xl overflow-hidden flex flex-col">
          <div className="bg-[#0b2545] text-white px-4 py-3 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold">IMD Technical Helpdesk</div>
              <div className="text-[10px] text-sky-200">Capacity Connect Domain Assistant</div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3.5 h-64 overflow-y-auto space-y-2.5 bg-[#f8fafc] text-xs">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2.5 rounded border ${
                  m.role === 'user'
                    ? 'bg-[#0b2545] text-white border-[#0b2545] ml-6'
                    : 'bg-white text-slate-800 border-slate-200 mr-6'
                }`}
              >
                {m.text}
              </div>
            ))}
            {loading && <div className="text-[11px] text-slate-500">Retrieving reference...</div>}
          </div>

          <form onSubmit={sendMessage} className="p-2.5 bg-white border-t border-slate-200 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about radar, NWP, or assessments..."
              className="flex-1 bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800 outline-none"
            />
            <button
              type="submit"
              className="bg-[#0b2545] hover:bg-[#163a63] text-white px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1"
            >
              <Send className="w-3 h-3" />
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#0b2545] hover:bg-[#163a63] text-white border border-slate-700 px-4 py-2.5 rounded-md shadow-md flex items-center gap-2 text-xs font-semibold"
        >
          <MessageSquare className="w-4 h-4 text-[#d97706]" />
          <span>IMD Helpdesk</span>
        </button>
      )}
    </div>
  )
}
