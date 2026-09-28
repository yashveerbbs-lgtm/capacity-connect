'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Terminal, BookOpen, Compass, UserCheck, LayoutGrid, ExternalLink } from 'lucide-react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [role, setRole] = useState<'TRAINEE' | 'TRAINER' | 'ADMIN'>('TRAINEE')

  useEffect(() => {
    const savedRole = localStorage.getItem('cc_active_role') as 'TRAINEE' | 'TRAINER' | 'ADMIN'
    if (savedRole && ['TRAINEE', 'TRAINER', 'ADMIN'].includes(savedRole)) {
      setRole(savedRole)
    }
  }, [])

  function switchRole(newRole: 'TRAINEE' | 'TRAINER' | 'ADMIN') {
    setRole(newRole)
    localStorage.setItem('cc_active_role', newRole)
    window.dispatchEvent(new CustomEvent('cc-role-change', { detail: newRole }))
  }

  const navLinks = [
    { href: '/dashboard', label: 'Portal Overview', icon: LayoutGrid },
    { href: '/dashboard/courses', label: 'Courses & Trainer Library', icon: BookOpen },
    { href: '/dashboard/workspace', label: 'Meteorological IDE', icon: Terminal },
    { href: '/dashboard/employer', label: 'Competency Mapping', icon: Compass },
    { href: '/dashboard/profile', label: 'Officer Dossier', icon: UserCheck }
  ]

  return (
    <div className="min-h-screen bg-[#f4f6f9] text-slate-800 flex flex-col font-sans">
      {/* GOVERNMENT OCHRE TOP STRIP */}
      <div className="h-1 bg-[#d97706] w-full" />

      {/* INSTITUTIONAL NAVY TOP BAR */}
      <header className="bg-[#0b2545] text-white border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-[#d97706] flex items-center justify-center font-bold text-sm tracking-tight text-white">
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

            <nav className="hidden lg:flex items-center gap-1 ml-4">
              {navLinks.map((item) => {
                const Icon = item.icon
                const active = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      active
                        ? 'bg-white text-[#0b2545]'
                        : 'text-slate-200 hover:bg-[#163a63] hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* CLEAN ROLE SWITCHER */}
          <div className="flex items-center gap-3">
            <div className="flex bg-[#13315c] p-0.5 rounded border border-slate-600">
              {(['TRAINEE', 'TRAINER', 'ADMIN'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => switchRole(r)}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                    role === r
                      ? 'bg-white text-[#0b2545]'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {r === 'TRAINEE' ? 'Trainee' : r === 'TRAINER' ? 'Trainer' : 'Admin'}
                </button>
              ))}
            </div>
            <Link
              href="/"
              className="text-xs font-semibold text-sky-200 hover:text-white px-2.5 py-1.5 rounded border border-slate-600 flex items-center gap-1"
            >
              Notice Board <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}
