'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, ShieldCheck } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [role, setRole] = useState<'TRAINEE' | 'TRAINER' | 'ADMIN'>('TRAINEE')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [centre, setCentre] = useState('RMC Jaipur / Bikaner Observatory')
  const [qualifications, setQualifications] = useState('')
  const [skills, setSkills] = useState('')

  function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    localStorage.setItem('cc_active_role', role)
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#f4f6f9] text-slate-800 flex flex-col font-sans">
      <div className="h-1.5 bg-[#d97706] w-full" />

      <header className="bg-[#0b2545] text-white border-b border-slate-700 py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-[#d97706] flex items-center justify-center font-bold text-sm text-white">
              IMD
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-white block leading-none">
                CAPACITY CONNECT
              </span>
              <span className="text-[11px] text-sky-200 block mt-0.5">
                Ministry of Earth Sciences (MoES) • India Meteorological Department
              </span>
            </div>
          </Link>
          <Link href="/auth/login" className="text-xs font-semibold text-sky-200 hover:text-white">
            Already Registered? Sign In →
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-lg w-full bg-white border border-slate-300 rounded-md shadow-xs overflow-hidden">
          <div className="bg-[#0b2545] text-white px-6 py-4 border-b border-slate-700">
            <div className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider">
              Departmental Onboarding (SIH26075)
            </div>
            <h1 className="text-lg font-bold text-white mt-0.5">
              New Officer / Trainer Portal Registration
            </h1>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-600 uppercase block mb-1.5">
                Designated Role
              </label>
              <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1 rounded border border-slate-300">
                {(['TRAINEE', 'TRAINER', 'ADMIN'] as const).map((r) => (
                  <button
                    type="button"
                    key={r}
                    onClick={() => setRole(r)}
                    className={`py-2 rounded text-xs font-bold transition-colors ${
                      role === r
                        ? 'bg-[#0b2545] text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSignup} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Full Name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Rohan Deshmukh"
                    className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-slate-900 font-medium outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Official Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="officer@imd.gov.in"
                    className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-slate-900 font-medium outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Regional Meteorological Centre (RMC) / Division
                </label>
                <input
                  value={centre}
                  onChange={(e) => setCentre(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-slate-900 font-medium outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Academic Qualifications & Work Experience
                </label>
                <input
                  value={qualifications}
                  onChange={(e) => setQualifications(e.target.value)}
                  placeholder="e.g., M.Tech Atmospheric Science • 3 Yrs Radar Operations"
                  className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-slate-900 font-medium outline-none"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Core Meteorological Skills (Used for Competency Mapping)
                </label>
                <input
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="e.g., Doppler Radar, NWP Forecasting, Cyclone Warning"
                  className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-slate-900 font-medium outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0d9488] hover:bg-[#0f766e] text-white py-2.5 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 mt-2"
              >
                Submit {role} Registration <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
