'use client'
import { useState, useEffect } from 'react'
import { ShieldCheck, Edit2 } from 'lucide-react'

export default function ProfessionalDossierPage() {
  const [role, setRole] = useState<'TRAINEE' | 'TRAINER' | 'ADMIN'>('TRAINEE')
  const [isEditing, setIsEditing] = useState(false)
  const [toast, setToast] = useState('')

  const [dossier, setDossier] = useState({
    name: 'Rohan Deshmukh',
    id: 'IMD-MOES-2026-801',
    centre: 'Regional Meteorological Centre (RMC) Jaipur / Bikaner',
    designation: 'Meteorological Officer (Trainee Track)',
    qualifications: 'M.Tech Atmospheric Sciences (WMO BIP-M Track)',
    experience: '3 Years • Automated Weather Station (AWS), Doppler Radar & NWP Telemetry',
    interests: 'Dual-Pol Doppler Radar Nowcasting, Tropical Cyclone Track Modeling, Mesoscale NWP',
    skills: ['Doppler Weather Radar (DWR)', 'Numerical Weather Prediction (NWP)', 'Python Geospatial Analysis', 'INSAT-3DS Satellite Interpretation', 'Synoptic Meteorology'],
    certificates: [
      { title: 'WMO BIP-M Basic Instruction Package for Meteorologists', date: 'Sep 2026', score: '98%' },
      { title: 'Mission Mausam Dual-Pol Radar & Nowcasting Certification', date: 'Aug 2026', score: '96%' },
      { title: 'NWP Ensemble Prediction & Cyclone Warning SOP', date: 'Jul 2026', score: '95%' }
    ]
  })

  useEffect(() => {
    const savedRole = localStorage.getItem('cc_active_role') as any
    if (savedRole) setRole(savedRole)
    const handleRole = (e: any) => setRole(e.detail)
    window.addEventListener('cc-role-change', handleRole)
    return () => window.removeEventListener('cc-role-change', handleRole)
  }, [])

  function handleSave() {
    setIsEditing(false)
    setToast('Officer Dossier updated and synchronized with Competency Mapping records.')
    setTimeout(() => setToast(''), 4000)
  }

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6 text-slate-800">
      {toast && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded text-xs font-semibold">
          {toast}
        </div>
      )}

      {/* HEADER CARD */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded bg-[#0b2545] flex items-center justify-center text-2xl font-bold text-white">
            {dossier.name.charAt(0)}
          </div>
          <div>
            <div className="text-xs font-bold text-[#0d9488] uppercase">
              {role} SERVICE RECORD • {dossier.id}
            </div>
            <h1 className="text-2xl font-bold text-[#0b2545] flex items-center gap-2 mt-0.5">
              {dossier.name} <ShieldCheck className="w-5 h-5 text-[#0d9488]" />
            </h1>
            <p className="text-xs text-slate-600">{dossier.designation} • {dossier.centre}</p>
          </div>
        </div>

        <button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className="bg-[#0b2545] hover:bg-[#163a63] text-white px-4 py-2 rounded text-xs font-bold flex items-center gap-1.5"
        >
          <Edit2 className="w-3.5 h-3.5" /> {isEditing ? 'Save Record' : 'Edit Dossier'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4">
          <h2 className="text-base font-bold text-[#0b2545] border-b border-slate-200 pb-2">
            Qualifications, Work Experience & Specialization Interests
          </h2>
          {isEditing ? (
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-600 block mb-1">Full Name</label>
                <input value={dossier.name} onChange={e => setDossier({...dossier, name: e.target.value})} className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-slate-800" />
              </div>
              <div>
                <label className="font-semibold text-slate-600 block mb-1">Academic Qualifications</label>
                <input value={dossier.qualifications} onChange={e => setDossier({...dossier, qualifications: e.target.value})} className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-slate-800" />
              </div>
              <div>
                <label className="font-semibold text-slate-600 block mb-1">Work Experience</label>
                <input value={dossier.experience} onChange={e => setDossier({...dossier, experience: e.target.value})} className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-slate-800" />
              </div>
              <div>
                <label className="font-semibold text-slate-600 block mb-1">Domain Interests</label>
                <input value={dossier.interests} onChange={e => setDossier({...dossier, interests: e.target.value})} className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-slate-800" />
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-xs">
              <div className="bg-[#f8fafc] border border-slate-200 p-3.5 rounded">
                <div className="text-slate-500 font-bold uppercase text-[10px] mb-1">Academic Qualifications</div>
                <div className="text-sm font-bold text-[#0b2545]">{dossier.qualifications}</div>
              </div>
              <div className="bg-[#f8fafc] border border-slate-200 p-3.5 rounded">
                <div className="text-slate-500 font-bold uppercase text-[10px] mb-1">Departmental Experience</div>
                <div className="text-sm font-bold text-[#0b2545]">{dossier.experience}</div>
              </div>
              <div className="bg-[#f8fafc] border border-slate-200 p-3.5 rounded">
                <div className="text-slate-500 font-bold uppercase text-[10px] mb-1">Research & Training Interests</div>
                <div className="text-sm font-semibold text-[#0d9488]">{dossier.interests}</div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-5">
          <div>
            <h2 className="text-base font-bold text-[#0b2545] border-b border-slate-200 pb-2 mb-3">
              Verified Meteorological Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {dossier.skills.map(s => (
                <span key={s} className="px-3 py-1 rounded bg-[#e8f0f8] border border-slate-300 text-[#0b2545] text-xs font-semibold">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-base font-bold text-[#0b2545] border-b border-slate-200 pb-2 mb-3">
              Official WMO / IMD Certifications ({dossier.certificates.length})
            </h2>
            <div className="space-y-2">
              {dossier.certificates.map((c, i) => (
                <div key={i} className="bg-[#f8fafc] border border-slate-200 p-3 rounded flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#0b2545]">{c.title}</div>
                    <div className="text-[11px] text-[#0d9488] font-semibold mt-0.5">Issued: {c.date} • Score: {c.score}</div>
                  </div>
                  <button
                    onClick={() => window.print()}
                    className="bg-[#0b2545] hover:bg-[#163a63] text-white px-3 py-1.5 rounded text-[11px] font-semibold"
                  >
                    Download PDF
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
