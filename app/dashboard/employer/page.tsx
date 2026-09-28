'use client'
import { useState } from 'react'
import { ShieldCheck, X } from 'lucide-react'

const IMD_TRAINERS = [
  {
    id: 'IMD-SME-101',
    name: 'Dr. M. Mohapatra',
    rank: 'Director General / Chief SME',
    xp: 28,
    track: 'Doppler Radar & Cyclone Warning',
    score: '99.5%',
    libraryUploads: '18 Lectures & SOPs',
    skills: ['Doppler Radar & Nowcasting', 'Cyclone Warning SOP', 'Synoptic Meteorology', 'WMO BIP-M'],
    bio: 'Director General of Meteorology (IMD). Lead Subject Matter Expert in Tropical Cyclone forecasting, S-Band Doppler Weather Radar operations, and impact-based early warning systems.',
    certificates: ['WMO Permanent Representative Fellow', 'MoES National Award in Atmospheric Sciences']
  },
  {
    id: 'IMD-SME-102',
    name: 'Dr. Sunitha Devi',
    rank: 'Scientist-F • WMO Trainer',
    xp: 19,
    track: 'Cyclone Warning & Satellite Met',
    score: '98.0%',
    libraryUploads: '12 Lectures & Manuals',
    skills: ['Cyclone Warning & Disaster Management', 'INSAT-3DS Satellite Dvorak', 'Common Alerting Protocol (CAP)'],
    bio: 'Head of Cyclone Warning Division at IMD HQ. Specializes in INSAT-3DS satellite radiance interpretation, storm surge inundation modeling, and WMO severe weather advisories.',
    certificates: ['WMO BIP-MT Certified Instructor', 'ESCAP/WMO Tropical Cyclone Panel Lead']
  },
  {
    id: 'IMD-SME-103',
    name: 'Dr. R. K. Jenamani',
    rank: 'Scientist-G • Senior Faculty',
    xp: 24,
    track: 'Numerical Weather Prediction & Aviation',
    score: '95.4%',
    libraryUploads: '15 Lectures & PPTs',
    skills: ['Numerical Weather Prediction (NWP)', 'Aviation Meteorology', 'CAT-III Fog Nowcasting', '4D-Var Assimilation'],
    bio: 'Senior Scientist-G leading Aviation Meteorology at IGIA New Delhi and mesoscale Numerical Weather Prediction (NWP) training across regional IMD centres.',
    certificates: ['ICAO Aeronautical Meteorology Lead Auditor', 'IIT Delhi Ph.D. Atmospheric Modeling']
  },
  {
    id: 'IMD-SME-104',
    name: 'Dr. Vikram Rathore',
    rank: 'Scientist-E • IITM Faculty',
    xp: 14,
    track: 'Mesoscale NWP & Radar Telemetry',
    score: '92.0%',
    libraryUploads: '10 Lectures & Labs',
    skills: ['Numerical Weather Prediction (NWP)', 'Doppler Radar & Nowcasting', 'Python Geospatial Analytics', 'AWS Telemetry'],
    bio: 'Senior faculty at IITM Pune specializing in high-resolution ensemble weather forecasting and automated weather station (AWS) network calibration.',
    certificates: ['Mission Mausam Mesoscale Modeling Lead', 'WMO Data Assimilation Fellowship']
  }
]

export default function CompetencyMappingPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('All Subjects')
  const [activeTrainer, setActiveTrainer] = useState<any>(null)
  const [assignedBanner, setAssignedBanner] = useState('')

  const filteredTrainers = IMD_TRAINERS.filter(t => {
    const matchesSubject = selectedSubject === 'All Subjects'
      ? true
      : t.skills.join(' ').toLowerCase().includes(selectedSubject.toLowerCase()) || t.track.toLowerCase().includes(selectedSubject.toLowerCase())
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.skills.join(' ').toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSubject && matchesSearch
  })

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 text-slate-800">
      {/* MODAL */}
      {activeTrainer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="bg-white border border-slate-300 rounded-lg max-w-2xl w-full p-6 shadow-xl space-y-5">
            <div className="flex justify-between items-start border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-bold text-[#0d9488] uppercase">{activeTrainer.id} • Verified Faculty</span>
                <h2 className="text-xl font-bold text-[#0b2545] flex items-center gap-2 mt-0.5">
                  {activeTrainer.name} <ShieldCheck className="w-5 h-5 text-[#0d9488]" />
                </h2>
                <p className="text-xs text-slate-500 font-medium">{activeTrainer.rank} • {activeTrainer.track}</p>
              </div>
              <button onClick={() => setActiveTrainer(null)} className="bg-slate-100 text-slate-700 p-1.5 rounded">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-[#f8fafc] border border-slate-200 p-4 rounded text-slate-700 leading-relaxed">
                {activeTrainer.bio}
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-[#f8fafc] border border-slate-200 p-3 rounded">
                  <div className="text-slate-500 font-bold uppercase text-[10px]">Suitability Match</div>
                  <div className="text-lg font-bold text-[#0d9488] mt-0.5">{activeTrainer.score}</div>
                </div>
                <div className="bg-[#f8fafc] border border-slate-200 p-3 rounded">
                  <div className="text-slate-500 font-bold uppercase text-[10px]">Experience</div>
                  <div className="text-lg font-bold text-[#0b2545] mt-0.5">{activeTrainer.xp} Years</div>
                </div>
                <div className="bg-[#f8fafc] border border-slate-200 p-3 rounded">
                  <div className="text-slate-500 font-bold uppercase text-[10px]">Trainer Library</div>
                  <div className="text-sm font-bold text-[#0b2545] mt-1">{activeTrainer.libraryUploads}</div>
                </div>
              </div>

              <div>
                <div className="text-slate-500 font-bold uppercase mb-2">Verified Credentials</div>
                <div className="space-y-1.5">
                  {activeTrainer.certificates.map((c: string) => (
                    <div key={c} className="bg-[#f8fafc] border border-slate-200 px-3.5 py-2 rounded flex justify-between items-center">
                      <span className="font-semibold text-[#0b2545]">{c}</span>
                      <span className="text-[#0d9488] font-bold text-[11px]">MoES Verified</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setAssignedBanner(`Assigned ${activeTrainer.name} (${activeTrainer.score} Suitability Match) as Lead Subject Trainer.`)
                  setActiveTrainer(null)
                }}
                className="w-full bg-[#0b2545] hover:bg-[#163a63] text-white py-2.5 rounded text-xs font-bold uppercase tracking-wider"
              >
                Assign Trainer to Subject Cohort
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#0d9488] uppercase tracking-wider">
            Trainer Competency Mapping Matrix (SIH26075)
          </span>
          <h1 className="text-2xl font-bold text-[#0b2545] mt-0.5">
            Identify Suitable Trainers for Specialized Meteorological Subjects
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Algorithmic suitability ranking based on domain qualifications (45%), trainee feedback ratings (30%), and Trainer Library contributions (25%).
          </p>
        </div>

        <div className="bg-[#f8fafc] border border-slate-200 px-5 py-3 rounded flex items-center gap-5 shrink-0">
          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase">Verified SMEs</div>
            <div className="text-xl font-bold text-[#0b2545]">{IMD_TRAINERS.length}</div>
          </div>
          <div className="border-l border-slate-300 pl-5">
            <div className="text-[10px] font-bold text-slate-500 uppercase">Mean Match</div>
            <div className="text-xl font-bold text-[#0d9488]">96.2%</div>
          </div>
        </div>
      </div>

      {assignedBanner && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-3.5 rounded text-xs font-semibold">
          {assignedBanner}
        </div>
      )}

      {/* FILTER BAR */}
      <div className="flex flex-col md:flex-row justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {['All Subjects', 'Doppler Radar', 'Numerical Weather Prediction', 'Cyclone Warning', 'Aviation'].map(sub => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`px-3.5 py-2 rounded text-xs font-semibold transition-colors ${
                selectedSubject === sub
                  ? 'bg-[#0b2545] text-white'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        <input
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search faculty name or skill..."
          className="bg-white border border-slate-300 rounded px-3.5 py-2 text-xs text-slate-800 font-medium min-w-[240px]"
        />
      </div>

      {/* TRAINER CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTrainers.map(t => (
          <div key={t.id} className="bg-white border border-slate-200 rounded-lg p-5 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#0d9488] uppercase">{t.id}</span>
                <h3 className="text-base font-bold text-[#0b2545] flex items-center gap-1.5 mt-0.5">
                  {t.name} <ShieldCheck className="w-4 h-4 text-[#0d9488]" />
                </h3>
                <p className="text-xs text-slate-500">{t.rank} • {t.track}</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-[#e8f0f8] border border-slate-300 text-[#0b2545] text-xs font-bold">
                Match: {t.score}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-[#f8fafc] border border-slate-200 p-3 rounded text-xs">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Domain Experience</span>
                <strong className="text-sm text-[#0b2545]">{t.xp} Years</strong>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Library Contributions</span>
                <strong className="text-sm text-[#0d9488]">{t.libraryUploads}</strong>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {t.skills.map(s => (
                <span key={s} className="px-2.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700">
                  {s}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200">
              <button
                onClick={() => setActiveTrainer(t)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 py-2 rounded text-xs font-bold"
              >
                View Faculty Dossier
              </button>
              <button
                onClick={() => setAssignedBanner(`Assigned ${t.name} (${t.score} Suitability Match) to lead ${t.track}.`)}
                className="bg-[#0b2545] hover:bg-[#163a63] text-white py-2 rounded text-xs font-bold"
              >
                Assign Trainer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
