'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [role, setRole] = useState<'TRAINEE' | 'TRAINER' | 'ADMIN'>('TRAINEE')
  const [email, setEmail] = useState('rohan.deshmukh@imd.gov.in')
  const [password, setPassword] = useState('••••••••••••')

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    localStorage.setItem('cc_active_role', role)
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#f4f6f9] text-slate-800 flex flex-col font-sans">
      <div className="h-1.5 bg-[#d97706] w-full" />

      {/* TOP INSTITUTIONAL BAR */}
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
          <Link href="/" className="text-xs font-semibold text-sky-200 hover:text-white">
            ← Back to Notice Board
          </Link>
        </div>
      </header>

      {/* CENTERED LOGIN BOX */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white border border-slate-300 rounded-md shadow-xs overflow-hidden">
          <div className="bg-[#0b2545] text-white px-6 py-4 border-b border-slate-700">
            <div className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider">
              Single Sign-On (SSO) Authentication
            </div>
            <h1 className="text-lg font-bold text-white mt-0.5">
              Officer & Faculty Portal Login
            </h1>
          </div>

          <div className="p-6 space-y-5">
            {/* 3-ROLE SELECTOR */}
            <div>
              <label className="text-xs font-bold text-slate-600 uppercase block mb-2">
                Select Portal Role
              </label>
              <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1 rounded border border-slate-300">
                {(['TRAINEE', 'TRAINER', 'ADMIN'] as const).map((r) => (
                  <button
                    type="button"
                    key={r}
                    onClick={() => {
                      setRole(r)
                      if (r === 'TRAINEE') setEmail('rohan.deshmukh@imd.gov.in')
                      if (r === 'TRAINER') setEmail('dr.mohapatra@imd.gov.in')
                      if (r === 'ADMIN') setEmail('directorate.admin@moes.gov.in')
                    }}
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

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Official Departmental Email (@imd.gov.in / @moes.gov.in)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 focus:border-[#0b2545] rounded px-3 py-2.5 text-sm text-slate-900 font-medium outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Password / Employee Token
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 focus:border-[#0b2545] rounded px-3 py-2.5 text-sm text-slate-900 font-medium outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0b2545] hover:bg-[#163a63] text-white py-2.5 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <Lock className="w-3.5 h-3.5" /> Sign In as {role} <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <span className="flex items-center gap-1 text-[#0d9488] font-semibold">
                <ShieldCheck className="w-4 h-4" /> RBAC Session Verified
              </span>
              <Link href="/auth/register" className="font-bold text-[#0b2545] hover:underline">
                Register New Account →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
