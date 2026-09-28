'use client'
import { useState } from 'react'
import Editor from '@monaco-editor/react'
import { Terminal, Play, RotateCcw, Cpu } from 'lucide-react'

const STARTER_CODE: Record<string, string> = {
  python3: `# IMD Meteorological Python Sandbox (Executed via JDoodle API)
print("hello world")

# Cyclone Wind-Pressure Calculation (IMD Operational Formula)
p_center = 972
p_ambient = 1010
v_max = round(14.2 * ((p_ambient - p_center) ** 0.5), 2)
print(f"Delta-P: {p_ambient - p_center} hPa -> Max Sustained Wind: {v_max} knots")
`,
  cpp: `// IMD NWP Grid Kernel (C++17 via JDoodle API)
#include <iostream>
using namespace std;

int main() {
    cout << "hello world from C++17 JDoodle Engine" << endl;
    double z_dbz = 58.4;
    cout << "Radar Reflectivity: " << z_dbz << " dBZ (Heavy Convection)" << endl;
    return 0;
}
`,
  nodejs: `// IMD Automated Weather Station (AWS) Telemetry Script
console.log("hello world from Node.js JDoodle Engine");
const stations = ["Bikaner", "Jaipur", "New Delhi"];
stations.forEach((s, i) => console.log("Station #" + (i+1) + ": " + s + " - Online"));
`
}

export default function WorkspacePage() {
  const [language, setLanguage] = useState<'python3' | 'cpp' | 'nodejs'>('python3')
  const [code, setCode] = useState(STARTER_CODE.python3)
  const [output, setOutput] = useState('JDoodle Cloud Compiler Ready. Click "Execute Code" to run.')
  const [meta, setMeta] = useState('')
  const [isRunning, setIsRunning] = useState(false)

  async function handleRun() {
    setIsRunning(true)
    setOutput('Executing payload via JDoodle Compiler API...\n')
    try {
      const resp = await fetch('/api/compile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language })
      })
      const data = await resp.json()
      setOutput(data.output || '(No output)')
      setMeta(`Engine: ${data.engine || 'JDoodle API'} • CPU: ${data.cpuTime || '0.04s'} • Memory: ${data.memory || '8192'} KB`)
    } catch (err: any) {
      setOutput('Compiler Error: ' + err.message)
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="h-[calc(100vh-68px)] bg-[#f4f6f9] text-slate-800 flex flex-col font-sans">
      {/* LIGHT INSTITUTIONAL TOOLBAR */}
      <div className="h-12 bg-white border-b border-slate-300 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Terminal className="w-4 h-4 text-[#0b2545]" />
          <span className="text-xs font-bold text-[#0b2545] uppercase tracking-wider">
            Meteorological Computation Sandbox (JDoodle API)
          </span>
          <select
            value={language}
            onChange={e => {
              const lang = e.target.value as 'python3' | 'cpp' | 'nodejs'
              setLanguage(lang)
              setCode(STARTER_CODE[lang])
            }}
            className="bg-slate-50 border border-slate-300 text-xs font-bold text-[#0b2545] px-3 py-1 rounded outline-none"
          >
            <option value="python3">Python 3 (JDoodle python3)</option>
            <option value="cpp">C++ 17 (JDoodle cpp17)</option>
            <option value="nodejs">Node.js (JDoodle nodejs)</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCode(STARTER_CODE[language])}
            className="text-xs text-slate-700 hover:bg-slate-200 px-3 py-1.5 bg-slate-100 border border-slate-300 rounded flex items-center gap-1 font-semibold"
          >
            <RotateCcw className="w-3 h-3" /> Reset Sample
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="bg-[#0b2545] hover:bg-[#163a63] text-white text-xs font-bold px-4 py-1.5 rounded flex items-center gap-1.5"
          >
            <Play className="w-3 h-3 fill-current" /> {isRunning ? 'Compiling...' : 'Execute Code'}
          </button>
        </div>
      </div>

      {/* SPLIT MONACO EDITOR & OUTPUT CONSOLE */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-300 overflow-hidden">
        <div className="h-full flex flex-col bg-white">
          <Editor
            height="100%"
            theme="light"
            language={language === 'python3' ? 'python' : language === 'cpp' ? 'cpp' : 'javascript'}
            value={code}
            onChange={val => setCode(val || '')}
            options={{
              fontSize: 13,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              padding: { top: 16 }
            }}
          />
        </div>

        <div className="p-5 flex flex-col h-full bg-[#f8fafc]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#0b2545] uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#0d9488]" /> Standard Output Console
            </span>
            {meta && <span className="text-[11px] font-semibold text-[#0d9488]">{meta}</span>}
          </div>
          <div className="flex-1 w-full bg-white text-slate-800 font-mono text-sm p-4 rounded border border-slate-300 overflow-y-auto whitespace-pre-wrap leading-relaxed">
            {output}
          </div>
        </div>
      </div>
    </div>
  )
}
