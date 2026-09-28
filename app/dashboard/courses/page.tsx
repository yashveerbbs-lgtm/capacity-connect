'use client'
import { useState, useEffect, useRef } from 'react'
import { Plus, UploadCloud, Link as LinkIcon, FileText, Video, Lock, Clock } from 'lucide-react'

const INITIAL_IMD_COURSES = [
  {
    id: 'dwr-101',
    title: 'Doppler Weather Radar (DWR) Dual-Polarization Operations',
    instructor: 'Dr. M. Mohapatra (Director General, IMD)',
    level: 'WMO BIP-M • Advanced',
    duration: '6 Weeks',
    deadline: '15 Oct 2026',
    desc: 'Operational S-Band and C-Band Doppler Weather Radar scan strategies, hydrometeor classification, severe thunderstorm signatures, and mesocyclone detection.',
    materials: [
      {
        type: 'VIDEO',
        title: 'Lecture 1: Dual-Pol Radar Reflectivity (Z, ZDR, KDP) Analysis.mp4',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
      },
      {
        type: 'PPT',
        title: 'Slide Deck: Severe Thunderstorm & Hailstorm Signatures.pptx'
      },
      {
        type: 'PDF',
        title: 'Study Manual: IMD Standard Operating Procedure for DWR Calibration.pdf'
      }
    ],
    enrolled: true
  },
  {
    id: 'nwp-202',
    title: 'Numerical Weather Prediction (NWP) & Ensemble Forecasting',
    instructor: 'Dr. R. K. Jenamani (Scientist-G, IMD)',
    level: 'AMTC Core • Intermediate',
    duration: '8 Weeks',
    deadline: '20 Oct 2026',
    desc: 'Practical training in GFS/WRF mesoscale models, 4D-Var satellite radiance assimilation, and ensemble probability strike cone verification.',
    materials: [
      {
        type: 'VIDEO',
        title: 'Lecture 1: GFS & WRF Mesoscale Data Assimilation.mp4',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
      },
      {
        type: 'PPT',
        title: 'Slide Deck: Hybrid AI/ML Weather Forecasting Models in IMD.pptx'
      }
    ],
    enrolled: true
  },
  {
    id: 'cyc-303',
    title: 'Tropical Cyclone Warning, Storm Surge & CAP Dissemination',
    instructor: 'Dr. Sunitha Devi (Head, Cyclone Warning Division)',
    level: 'Mandatory • All RMCs',
    duration: '4 Weeks',
    deadline: '28 Oct 2026',
    desc: 'Operational cyclone intensity estimation using INSAT-3DS Dvorak technique, storm surge modeling, and Common Alerting Protocol (CAP) bulletins.',
    materials: [
      {
        type: 'VIDEO',
        title: 'Lecture 1: Dvorak Technique & Eye-Wall Replacement Cycles.mp4',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
      }
    ],
    enrolled: false
  }
]

export default function IMDCoursesAndTrainerLibrary() {
  const [role, setRole] = useState<'TRAINEE' | 'TRAINER' | 'ADMIN'>('TRAINEE')
  const [courses, setCourses] = useState(INITIAL_IMD_COURSES)
  const [activeMediaMaterial, setActiveMediaMaterial] = useState<any>(null)
  const [showUploadModal, setShowUploadModal] = useState(false)

  const [targetCourseId, setTargetCourseId] = useState('dwr-101')
  const [uploadTab, setUploadTab] = useState<'FILE' | 'URL'>('FILE')
  const [newTitle, setNewTitle] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [attachedFileName, setAttachedFileName] = useState('')
  const [attachedBlobUrl, setAttachedBlobUrl] = useState<string | null>(null)
  const [matType, setMatType] = useState<'VIDEO' | 'PPT' | 'PDF'>('VIDEO')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem('cc_active_role') as any
    if (saved && ['TRAINEE', 'TRAINER', 'ADMIN'].includes(saved)) setRole(saved)
    const handleRoleEvent = (e: any) => setRole(e.detail)
    window.addEventListener('cc-role-change', handleRoleEvent)
    return () => window.removeEventListener('cc-role-change', handleRoleEvent)
  }, [])

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setAttachedFileName(file.name)
    if (!newTitle) setNewTitle(file.name)

    if (file.type.startsWith('video/') || file.name.endsWith('.mp4') || file.name.endsWith('.webm')) {
      setMatType('VIDEO')
      setAttachedBlobUrl(URL.createObjectURL(file))
    } else if (file.name.endsWith('.ppt') || file.name.endsWith('.pptx')) {
      setMatType('PPT')
      setAttachedBlobUrl(null)
    } else {
      setMatType('PDF')
      setAttachedBlobUrl(null)
    }
  }

  function handleAddMaterial(e: React.FormEvent) {
    e.preventDefault()
    if (!newTitle.trim()) return

    const newMaterialItem = {
      type: matType,
      title: newTitle,
      url: uploadTab === 'URL' ? videoUrl : attachedBlobUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    }

    setCourses(courses.map(c => {
      if (c.id !== targetCourseId) return c
      return {
        ...c,
        materials: [newMaterialItem, ...c.materials]
      }
    }))

    setNewTitle('')
    setVideoUrl('')
    setAttachedFileName('')
    setAttachedBlobUrl(null)
    setShowUploadModal(false)
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 text-slate-800">
      <div className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#0d9488] uppercase tracking-wider">
            Departmental Training Repository ({role} View)
          </span>
          <h1 className="text-2xl font-bold text-[#0b2545] mt-0.5">
            Meteorological Courses & Trainer Library
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Recorded lectures, slide presentations, and operational manuals uploaded by IMD Subject Matter Experts.
          </p>
        </div>

        {role === 'TRAINER' || role === 'ADMIN' ? (
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-[#0b2545] hover:bg-[#163a63] text-white px-4 py-2.5 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-2 self-start"
          >
            <Plus className="w-4 h-4" /> Upload Video / Study Asset ({role})
          </button>
        ) : (
          <div className="bg-[#f8fafc] border border-slate-300 px-4 py-2.5 rounded flex items-center gap-2 text-xs font-medium text-slate-600">
            <Lock className="w-3.5 h-3.5 text-[#b45309]" />
            <span>
              Trainee Read-Only Library •{' '}
              <button
                onClick={() => {
                  localStorage.setItem('cc_active_role', 'TRAINER')
                  window.dispatchEvent(new CustomEvent('cc-role-change', { detail: 'TRAINER' }))
                }}
                className="text-[#0b2545] underline font-bold"
              >
                Switch to Trainer
              </button>{' '}
              to upload files
            </span>
          </div>
        )}
      </div>

      {/* COURSE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map(c => (
          <div key={c.id} className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded bg-[#e8f0f8] text-[#0b2545] text-xs font-bold">
                  {c.level}
                </span>
                <span className="text-xs font-semibold text-[#b45309] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Assessment Due: {c.deadline}
                </span>
              </div>
              <h2 className="text-lg font-bold text-[#0b2545] mb-1">{c.title}</h2>
              <p className="text-xs font-semibold text-[#0d9488] mb-2">Faculty: {c.instructor} • {c.duration}</p>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">{c.desc}</p>

              <div className="bg-[#f8fafc] border border-slate-200 rounded p-3.5 mb-4 space-y-2">
                <div className="text-[11px] font-bold text-slate-500 uppercase flex justify-between items-center">
                  <span>Trainer Library Files ({c.materials.length})</span>
                  <span className="text-[#0b2545]">Click to Open</span>
                </div>
                {c.materials.map((m: any, idx: number) => (
                  <div key={idx} className="text-xs font-medium text-slate-800 bg-white px-3 py-2 rounded border border-slate-200 flex justify-between items-center">
                    <span className="truncate pr-3">
                      <strong>[{m.type}]</strong> {m.title}
                    </span>
                    <button
                      onClick={() => setActiveMediaMaterial(m)}
                      className="text-xs text-white bg-[#0b2545] hover:bg-[#163a63] px-2.5 py-1 rounded font-semibold whitespace-nowrap"
                    >
                      {m.type === 'VIDEO' ? 'Play Video' : 'Open File'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-3 border-t border-slate-200">
              <button
                onClick={() => setCourses(courses.map(x => x.id === c.id ? { ...x, enrolled: true } : x))}
                className={`flex-1 py-2.5 rounded text-xs font-bold uppercase tracking-wider ${
                  c.enrolled
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                    : 'bg-[#0b2545] text-white'
                }`}
              >
                {c.enrolled ? 'Enrolled in Course' : 'Enroll in Course'}
              </button>
              <button
                onClick={() => setActiveMediaMaterial(c.materials[0])}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 px-4 py-2.5 rounded text-xs font-bold"
              >
                Open Media Player
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* VIDEO / DOCUMENT PLAYER MODAL */}
      {activeMediaMaterial && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-300 rounded-lg max-w-3xl w-full p-6 space-y-4 shadow-xl">
            <div className="flex justify-between items-start border-b border-slate-200 pb-3">
              <div>
                <span className="text-xs font-bold text-[#0d9488] uppercase">
                  {activeMediaMaterial.type === 'VIDEO' ? 'Trainer Library Video Stream' : 'Trainer Library Document Viewer'}
                </span>
                <h3 className="text-base font-bold text-[#0b2545] mt-0.5">{activeMediaMaterial.title}</h3>
              </div>
              <button onClick={() => setActiveMediaMaterial(null)} className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1 rounded text-xs font-bold">
                Close
              </button>
            </div>

            {activeMediaMaterial.type === 'VIDEO' ? (
              <div className="rounded overflow-hidden bg-black border border-slate-300 aspect-video flex items-center justify-center">
                <video
                  controls
                  autoPlay
                  src={activeMediaMaterial.url || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="bg-[#f8fafc] border border-slate-200 rounded p-8 text-center space-y-3">
                <FileText className="w-12 h-12 text-[#0b2545] mx-auto" />
                <div className="text-sm font-bold text-[#0b2545]">{activeMediaMaterial.title}</div>
                <p className="text-xs text-slate-600">Official study material archived in the IMD Trainer Library.</p>
                <button onClick={() => window.print()} className="bg-[#0b2545] text-white px-4 py-2 rounded text-xs font-semibold">
                  Download / Print Document
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* UPLOAD MODAL */}
      {showUploadModal && (role === 'TRAINER' || role === 'ADMIN') && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          <form onSubmit={handleAddMaterial} className="bg-white border border-slate-300 rounded-lg max-w-lg w-full p-6 space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-[#0b2545] flex items-center gap-2">
                <UploadCloud className="w-4 h-4 text-[#0d9488]" /> Attach Video Lecture or Study File
              </h3>
              <button type="button" onClick={() => setShowUploadModal(false)} className="text-slate-500 font-bold text-xs">Close</button>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Target Course</label>
              <select
                value={targetCourseId}
                onChange={e => setTargetCourseId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-xs font-semibold text-slate-800"
              >
                {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded border border-slate-300">
              <button
                type="button"
                onClick={() => setUploadTab('FILE')}
                className={`py-1.5 rounded text-xs font-bold flex items-center justify-center gap-1.5 ${
                  uploadTab === 'FILE' ? 'bg-[#0b2545] text-white' : 'text-slate-600'
                }`}
              >
                <UploadCloud className="w-3.5 h-3.5" /> Browse Local Video
              </button>
              <button
                type="button"
                onClick={() => setUploadTab('URL')}
                className={`py-1.5 rounded text-xs font-bold flex items-center justify-center gap-1.5 ${
                  uploadTab === 'URL' ? 'bg-[#0b2545] text-white' : 'text-slate-600'
                }`}
              >
                <LinkIcon className="w-3.5 h-3.5" /> Paste Video URL
              </button>
            </div>

            {uploadTab === 'FILE' ? (
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept="video/*,.mp4,.webm,.ppt,.pptx,.pdf"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-slate-300 hover:border-[#0b2545] rounded p-5 text-center bg-slate-50"
                >
                  <Video className="w-7 h-7 text-[#0b2545] mx-auto mb-1.5" />
                  <span className="text-xs font-bold text-[#0b2545] block">
                    {attachedFileName ? `Selected: ${attachedFileName}` : 'Click to select Video (.mp4) or Study File (.pdf / .pptx)'}
                  </span>
                </button>
              </div>
            ) : (
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Direct Video URL (.mp4)</label>
                <input
                  value={videoUrl}
                  onChange={e => {
                    setVideoUrl(e.target.value)
                    setMatType('VIDEO')
                  }}
                  placeholder="https://.../lecture.mp4"
                  className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-xs text-slate-800"
                />
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Lecture / Material Title</label>
              <input
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="e.g., Lecture 5: Doppler Radar Beam Blockage Analysis"
                className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-xs text-slate-800"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#0b2545] hover:bg-[#163a63] text-white py-2.5 rounded text-xs font-bold uppercase tracking-wider"
            >
              Publish to Trainer Library
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
