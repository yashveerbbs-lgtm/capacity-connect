'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShieldCheck, ArrowRight, FileText, Award, Bell, BookOpen } from 'lucide-react'

const DEFAULT_BROADCASTS = [
  {
    id: 'b1',
    type: 'ANNOUNCEMENT',
    badge: 'Official Circular',
    title: 'Mission Mausam 2026: Mandatory Doppler Weather Radar (DWR) Certification',
    desc: 'All Regional Meteorological Centre (RMC) officers must complete the Dual-Polarization Radar module and subject-wise MCQ assessment by 15 October 2026.',
    date: '28 Sep 2026 • IMD HQ, Lodhi Road, New Delhi'
  },
  {
    id: 'b2',
    type: 'ACHIEVEMENT',
    badge: 'Departmental Milestone',
    title: '98.4% Cyclone Track Forecast Verification Score Achieved by RMC Cohort',
    desc: 'RMC Bhubaneswar and Cyclone Warning Division trainees recorded the highest accuracy in the NWP Ensemble Prediction simulation.',
    date: '25 Sep 2026 • MoES Performance Review'
  },
  {
    id: 'b3',
    type: 'NEW_CONTENT',
    badge: 'New Study Material',
    title: 'Trainer Library Update: High-Resolution Mesoscale NWP & Fog Nowcasting',
    desc: 'Dr. R. K. Jenamani uploaded 4 recorded lectures, 2 slide decks, and a 20-question timed MCQ questionnaire.',
    date: '24 Sep 2026 • Trainer Library'
  },
  {
    id: 'b4',
    type: 'NOTIFICATION',
    badge: 'Training Schedule',
    title: 'WMO BIP-M & AMTC Batch-14 Trainer Competency Assignments Published',
    desc: 'Subject-wise trainer allocations for Aviation Meteorology, Agrometeorology, and Seismology have been finalized via Competency Mapping.',
    date: '22 Sep 2026 • Training Directorate'
  }
]

export default function LandingPage() {
  const router = useRouter()
  const [broadcasts, setBroadcasts] = useState(DEFAULT_BROADCASTS)
  const [filterType, setFilterType] = useState('ALL')

  useEffect(() => {
    const saved = localStorage.getItem('cc_homepage_broadcasts')
    if (saved) {
      try { setBroadcasts(JSON.parse(saved)) } catch (e) {}
    }
  }, [])

  function openPortalAs(role: 'TRAINEE' | 'TRAINER' | 'ADMIN') {
    localStorage.setItem('cc_active_role', role)
    router.push('/dashboard')
  }

  const visibleBroadcasts = filterType === 'ALL'
    ? broadcasts
    : broadcasts.filter(b => b.type === filterType)

  return (
    <div className="min-h-screen bg-[#f4f6f9] text-slate-800 font-sans">
      <div className="h-1.5 bg-[#d97706] w-full" />

      {/* INSTITUTIONAL TOP NAVBAR */}
      <nav className="bg-[#0b2545] text-white border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 bg-[#d97706] rounded flex items-center justify-center font-bold text-base text-white">
              IMD
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white block leading-none">
                CAPACITY CONNECT
              </span>
              <span className="text-xs text-sky-200 block mt-1">
                Ministry of Earth Sciences (MoES) • India Meteorological Department (SIH26075)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="text-xs font-semibold text-slate-200 hover:text-white px-3.5 py-2 rounded border border-slate-600"
            >
              Officer Sign In
            </Link>
            <Link
              href="/auth/register"
              className="bg-[#d97706] hover:bg-[#b45309] text-white px-4 py-2 rounded text-xs font-semibold transition-colors"
            >
              New Registration
            </Link>
          </div>
        </div>
      </nav>

      {/* CLEAN INSTITUTIONAL HERO BANNER */}
      <section className="bg-white border-b border-slate-200 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-block bg-[#e8f0f8] text-[#0b2545] border border-[#cbd5e1] px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
              Digital Capacity Building & Learning Management Portal
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#0b2545] leading-tight">
              Centralized Meteorological Training, Assessment & Competency Management
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
              Supporting Regional Meteorological Centres (RMCs) and state observatories across India with structured coursework, a centralized Trainer Library, timed MCQ evaluations, and algorithmic Subject Matter Expert (SME) competency mapping.
            </p>
          </div>

          {/* 3 ROLE ACCESS CARDS */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-3">
            <button
              onClick={() => openPortalAs('TRAINEE')}
              className="bg-[#f8fafc] hover:bg-[#e8f0f8] border border-slate-300 p-4 rounded-lg text-left transition-colors flex items-center justify-between group"
            >
              <div>
                <div className="text-xs font-bold text-[#0d9488] uppercase">Role 1 • Trainee Portal</div>
                <div className="text-sm font-bold text-[#0b2545] mt-0.5">Officer Profile, Coursework & Timed MCQs</div>
                <p className="text-xs text-slate-600 mt-0.5">Enroll in modules, view lectures, take tests & submit feedback.</p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#0b2545] group-hover:translate-x-1 transition-transform shrink-0" />
            </button>

            <button
              onClick={() => openPortalAs('TRAINER')}
              className="bg-[#f8fafc] hover:bg-[#e8f0f8] border border-slate-300 p-4 rounded-lg text-left transition-colors flex items-center justify-between group"
            >
              <div>
                <div className="text-xs font-bold text-[#d97706] uppercase">Role 2 • Trainer Studio</div>
                <div className="text-sm font-bold text-[#0b2545] mt-0.5">Trainer Library, Questionnaires & Deadlines</div>
                <p className="text-xs text-slate-600 mt-0.5">Upload lectures/slides/PDFs, set MCQ deadlines & track scores.</p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#0b2545] group-hover:translate-x-1 transition-transform shrink-0" />
            </button>

            <button
              onClick={() => openPortalAs('ADMIN')}
              className="bg-[#f8fafc] hover:bg-[#e8f0f8] border border-slate-300 p-4 rounded-lg text-left transition-colors flex items-center justify-between group"
            >
              <div>
                <div className="text-xs font-bold text-[#0b2545] uppercase">Role 3 • Admin Command Center</div>
                <div className="text-sm font-bold text-[#0b2545] mt-0.5">RBAC Approval, KPI Dashboards & Competency Mapping</div>
                <p className="text-xs text-slate-600 mt-0.5">Approve users, rank suitable trainers & publish homepage notices.</p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#0b2545] group-hover:translate-x-1 transition-transform shrink-0" />
            </button>
          </div>
        </div>
      </section>

      {/* HOMEPAGE NOTIFICATIONS, ANNOUNCEMENTS, ACHIEVEMENTS & NEW CONTENT */}
      <main className="max-w-7xl mx-auto py-10 px-6">
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold text-[#0d9488] uppercase tracking-wider">
                Official Directorate Bulletin
              </span>
              <h2 className="text-xl font-bold text-[#0b2545] mt-0.5">
                Notifications, Announcements, Achievements & Newly Added Learning Content
              </h2>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {['ALL', 'ANNOUNCEMENT', 'ACHIEVEMENT', 'NEW_CONTENT', 'NOTIFICATION'].map(t => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
                    filterType === t
                      ? 'bg-[#0b2545] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
            {visibleBroadcasts.map((item) => (
              <div
                key={item.id}
                className="bg-[#f8fafc] border border-slate-200 rounded-lg p-5 flex flex-col justify-between hover:border-slate-300 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold uppercase px-2.5 py-0.5 rounded bg-[#e8f0f8] text-[#0b2545] border border-slate-300">
                      {item.badge}
                    </span>
                    <span className="text-xs text-slate-500">{item.date}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#0b2545] mb-1.5">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 flex justify-between items-center text-xs">
                  <span className="text-[#0d9488] font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified by IMD Training Directorate
                  </span>
                  <button
                    onClick={() => openPortalAs('TRAINEE')}
                    className="font-bold text-[#0b2545] hover:underline"
                  >
                    View Module →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
