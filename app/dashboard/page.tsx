'use client'
import { useState, useEffect } from 'react'
import { Clock, ShieldCheck, CheckCircle2, PlayCircle, FileText } from 'lucide-react'

const INITIAL_COURSES = [
  {
    id: 'imd-dwr-101',
    title: 'Doppler Weather Radar (DWR) Dual-Polarization Operations',
    subject: 'Doppler Radar & Nowcasting',
    trainer: 'Dr. M. Mohapatra (Director General, IMD)',
    duration: '6 Weeks',
    level: 'Advanced • WMO BIP-M',
    enrolled: true,
    deadline: '15 Oct 2026, 18:00 IST',
    materials: [
      { type: 'VIDEO', title: 'Lecture 1: Dual-Pol Radar Reflectivity (Z, ZDR, KDP) Analysis.mp4' },
      { type: 'PPT', title: 'Deck 2: Severe Thunderstorm & Hailstorm Signatures.pptx' },
      { type: 'PDF', title: 'IMD Standard Operating Procedure for DWR Calibration.pdf' }
    ],
    mcqs: [
      {
        q: 'Which Dual-Polarization radar parameter is most effective for estimating heavy rainfall rates in tropical cyclones?',
        options: ['Base Reflectivity (Z)', 'Specific Differential Phase (KDP)', 'Radial Velocity (V)', 'Spectrum Width (W)'],
        ans: 1
      },
      {
        q: 'What does a sharp drop in Correlation Coefficient (CC < 0.85) inside a high-reflectivity core indicate?',
        options: ['Clear-air turbulence', 'Non-meteorological targets or large hail/debris', 'Light stratiform drizzle', 'Beam blockage'],
        ans: 1
      }
    ]
  },
  {
    id: 'imd-nwp-202',
    title: 'Numerical Weather Prediction (NWP) & Ensemble Forecasting',
    subject: 'Numerical Weather Prediction (NWP)',
    trainer: 'Dr. R. K. Jenamani (Scientist-G, IMD)',
    duration: '8 Weeks',
    level: 'Intermediate • AMTC Core',
    enrolled: true,
    deadline: '20 Oct 2026, 17:00 IST',
    materials: [
      { type: 'VIDEO', title: 'Lecture 1: GFS & WRF Mesoscale Data Assimilation.mp4' },
      { type: 'PPT', title: 'Hybrid AI/ML Weather Forecasting Models in IMD.pptx' },
      { type: 'PDF', title: 'Ensemble Probability Strike Cone Verification Manual.pdf' }
    ],
    mcqs: [
      {
        q: 'Why does 4D-Var data assimilation outperform 3D-Var in rapidly intensifying cyclones?',
        options: [
          'It ignores satellite radiance observations',
          'It assimilates observations across a time window using forecast model dynamics',
          'It uses lower horizontal grid resolution',
          'It only runs on surface station data'
        ],
        ans: 1
      }
    ]
  },
  {
    id: 'imd-cyc-303',
    title: 'Tropical Cyclone Warning, Storm Surge & CAP Dissemination',
    subject: 'Cyclone Warning & Disaster Management',
    trainer: 'Dr. Sunitha Devi (Head, Cyclone Warning Division)',
    duration: '4 Weeks',
    level: 'Mandatory • All RMCs',
    enrolled: false,
    deadline: '28 Oct 2026, 18:00 IST',
    materials: [
      { type: 'VIDEO', title: 'Lecture 1: Dvorak Technique & Eye-Wall Replacement.mp4' },
      { type: 'PDF', title: 'Common Alerting Protocol (CAP) & Impact-Based Forecast SOP.pdf' }
    ],
    mcqs: [
      {
        q: 'In the Dvorak satellite intensity technique, what T-number corresponds to a Very Severe Cyclonic Storm (VSCS)?',
        options: ['T 1.5', 'T 2.5', 'T 4.0 to T 4.5', 'T 1.0'],
        ans: 2
      }
    ]
  }
]

const TRAINER_DIRECTORY = [
  {
    id: 'TR-101',
    name: 'Dr. M. Mohapatra',
    designation: 'Director General / Chief SME',
    qualifications: 'Ph.D. Atmospheric Physics, WMO Fellow',
    skills: ['Doppler Radar & Nowcasting', 'Cyclone Warning & Disaster Management', 'Synoptic Meteorology'],
    libraryUploads: 18,
    traineeRating: 4.95
  },
  {
    id: 'TR-102',
    name: 'Dr. Sunitha Devi',
    designation: 'Scientist-F • Cyclone Warning Division',
    qualifications: 'M.Tech Atmospheric Sciences, WMO BIP-MT',
    skills: ['Cyclone Warning & Disaster Management', 'Satellite Meteorology (INSAT-3DS)', 'Doppler Radar & Nowcasting'],
    libraryUploads: 12,
    traineeRating: 4.92
  },
  {
    id: 'TR-103',
    name: 'Dr. R. K. Jenamani',
    designation: 'Scientist-G • Aviation & NWP Lead',
    qualifications: 'Ph.D. Meteorology (IIT Delhi)',
    skills: ['Numerical Weather Prediction (NWP)', 'Aviation Meteorology', 'Mesoscale Modeling'],
    libraryUploads: 15,
    traineeRating: 4.88
  },
  {
    id: 'TR-104',
    name: 'Dr. Vikram Rathore',
    designation: 'Scientist-E • IITM Pune',
    qualifications: 'Ph.D. Climate Dynamics & Radar Telemetry',
    skills: ['Numerical Weather Prediction (NWP)', 'Doppler Radar & Nowcasting', 'Python Geospatial Analysis'],
    libraryUploads: 10,
    traineeRating: 4.85
  }
]

export default function CapacityConnectPortal() {
  const [role, setRole] = useState<'TRAINEE' | 'TRAINER' | 'ADMIN'>('TRAINEE')
  const [courses, setCourses] = useState(INITIAL_COURSES)

  const [traineeProfile, setTraineeProfile] = useState({
    name: 'Rohan Deshmukh',
    empId: 'IMD-TRN-2026-089',
    centre: 'RMC Jaipur / Bikaner Observatory',
    qualifications: 'M.Tech Atmospheric Sciences (WMO BIP-M Track)',
    experience: '3 Years • Automated Weather Station (AWS) & Radar Telemetry',
    interests: 'Doppler Radar Signal Processing, Cyclone Track Prediction, Mesoscale NWP',
    skills: ['Doppler Radar (DWR)', 'Python NWP', 'INSAT-3DS Telemetry', 'Synoptic Charts'],
    certificates: ['WMO BIP-M Foundation Certificate', 'Mission Mausam Radar Operations Certificate']
  })
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [activeQuizCourse, setActiveQuizCourse] = useState<any>(null)
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({})
  const [quizResult, setQuizResult] = useState<{ score: number; total: number } | null>(null)
  const [feedbackText, setFeedbackText] = useState('')
  const [feedbackRating, setFeedbackRating] = useState(5)
  const [feedbackToast, setFeedbackToast] = useState('')

  // Trainer state
  const [selectedCourseId, setSelectedCourseId] = useState('imd-dwr-101')
  const [newMatType, setNewMatType] = useState<'VIDEO' | 'PPT' | 'PDF'>('VIDEO')
  const [newMatTitle, setNewMatTitle] = useState('')
  const [newMcqQuestion, setNewMcqQuestion] = useState('')
  const [newMcqOpt1, setNewMcqOpt1] = useState('')
  const [newMcqOpt2, setNewMcqOpt2] = useState('')
  const [newMcqOpt3, setNewMcqOpt3] = useState('')
  const [newMcqOpt4, setNewMcqOpt4] = useState('')
  const [newMcqCorrect, setNewMcqCorrect] = useState(0)
  const [newMcqDeadline, setNewMcqDeadline] = useState('25 Oct 2026, 18:00 IST')
  const [trainerToast, setTrainerToast] = useState('')

  // Admin state
  const [selectedSubject, setSelectedSubject] = useState('Doppler Radar & Nowcasting')
  const [assignedTrainerMsg, setAssignedTrainerMsg] = useState('')
  const [pendingUsers, setPendingUsers] = useState([
    { id: 'U-901', name: 'Ananya Sharma', centre: 'RMC Mumbai', requestedRole: 'TRAINEE', qual: 'M.Sc. Meteorology', status: 'Pending' },
    { id: 'U-902', name: 'Dr. Vikram Rathore', centre: 'IITM Pune', requestedRole: 'TRAINER', qual: 'Ph.D. Climate Dynamics', status: 'Pending' },
    { id: 'U-903', name: 'Karan Verma', centre: 'RMC Chennai', requestedRole: 'TRAINEE', qual: 'B.Tech Electronics (Radar)', status: 'Approved' }
  ])
  const [bType, setBType] = useState('ANNOUNCEMENT')
  const [bTitle, setBTitle] = useState('')
  const [bDesc, setBDesc] = useState('')
  const [adminToast, setAdminToast] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('cc_active_role') as any
    if (saved && ['TRAINEE', 'TRAINER', 'ADMIN'].includes(saved)) setRole(saved)
    const handleRoleEvent = (e: any) => setRole(e.detail)
    window.addEventListener('cc-role-change', handleRoleEvent)
    return () => window.removeEventListener('cc-role-change', handleRoleEvent)
  }, [])

  function handleEnroll(courseId: string) {
    setCourses(courses.map(c => c.id === courseId ? { ...c, enrolled: true } : c))
  }

  function submitQuiz() {
    if (!activeQuizCourse) return
    let correctCount = 0
    activeQuizCourse.mcqs.forEach((m: any, idx: number) => {
      if (quizAnswers[idx] === m.ans) correctCount++
    })
    setQuizResult({ score: correctCount, total: activeQuizCourse.mcqs.length })
    const pct = Math.round((correctCount / activeQuizCourse.mcqs.length) * 100)
    if (pct >= 50) {
      const certName = `${activeQuizCourse.title.slice(0, 32)} (${pct}%)`
      if (!traineeProfile.certificates.includes(certName)) {
        setTraineeProfile({
          ...traineeProfile,
          certificates: [...traineeProfile.certificates, certName]
        })
      }
    }
  }

  function submitCourseFeedback(e: React.FormEvent) {
    e.preventDefault()
    if (!feedbackText.trim()) return
    setFeedbackToast(`Feedback recorded (${feedbackRating}/5) and logged to Trainer & Admin reports.`)
    setFeedbackText('')
    setTimeout(() => setFeedbackToast(''), 4000)
  }

  function handleUploadMaterial(e: React.FormEvent) {
    e.preventDefault()
    if (!newMatTitle.trim()) return
    setCourses(courses.map(c => {
      if (c.id !== selectedCourseId) return c
      return {
        ...c,
        materials: [...c.materials, { type: newMatType, title: newMatTitle }]
      }
    }))
    setNewMatTitle('')
    setTrainerToast('Material uploaded to Trainer Library and unlocked for enrolled trainees.')
    setTimeout(() => setTrainerToast(''), 4000)
  }

  function handleCreateMcq(e: React.FormEvent) {
    e.preventDefault()
    if (!newMcqQuestion.trim() || !newMcqOpt1.trim() || !newMcqOpt2.trim()) return
    setCourses(courses.map(c => {
      if (c.id !== selectedCourseId) return c
      return {
        ...c,
        deadline: newMcqDeadline,
        mcqs: [
          ...c.mcqs,
          {
            q: newMcqQuestion,
            options: [newMcqOpt1, newMcqOpt2, newMcqOpt3 || 'None of the above', newMcqOpt4 || 'All of the above'],
            ans: newMcqCorrect
          }
        ]
      }
    }))
    setNewMcqQuestion(''); setNewMcqOpt1(''); setNewMcqOpt2(''); setNewMcqOpt3(''); setNewMcqOpt4('')
    setTrainerToast(`MCQ Questionnaire published with deadline: ${newMcqDeadline}`)
    setTimeout(() => setTrainerToast(''), 4000)
  }

  function approveOrChangeRole(id: string, newStatus: string, newRole?: string) {
    setPendingUsers(pendingUsers.map(u => u.id === id ? { ...u, status: newStatus, requestedRole: newRole || u.requestedRole } : u))
  }

  function publishToHomepage(e: React.FormEvent) {
    e.preventDefault()
    if (!bTitle.trim() || !bDesc.trim()) return
    const badgeMap: any = {
      ANNOUNCEMENT: 'Official Circular',
      NOTIFICATION: 'Training Notice',
      ACHIEVEMENT: 'Departmental Milestone',
      NEW_CONTENT: 'New Study Material'
    }
    const newEntry = {
      id: 'b-' + Date.now(),
      type: bType,
      badge: badgeMap[bType],
      title: bTitle,
      desc: bDesc,
      date: 'Published Today • IMD Training Directorate'
    }
    const existing = JSON.parse(localStorage.getItem('cc_homepage_broadcasts') || 'null') || []
    localStorage.setItem('cc_homepage_broadcasts', JSON.stringify([newEntry, ...existing]))
    setBTitle(''); setBDesc('')
    setAdminToast('Published to public Notice Board.')
    setTimeout(() => setAdminToast(''), 4000)
  }

  const rankedTrainers = TRAINER_DIRECTORY.map(t => {
    const skillMatch = t.skills.some(s => s.toLowerCase().includes(selectedSubject.split(' ')[0].toLowerCase())) ? 100 : 68
    const ratingScore = (t.traineeRating / 5.0) * 100
    const outputScore = Math.min(100, t.libraryUploads * 5.5)
    const competencyIndex = (0.45 * skillMatch + 0.30 * ratingScore + 0.25 * outputScore).toFixed(1)
    return { ...t, competencyIndex }
  }).sort((a, b) => Number(b.competencyIndex) - Number(a.competencyIndex))

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* SUBHEADER BAR */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-[#0d9488]">
            {role === 'TRAINEE' && 'Trainee Module • Officer Learning & Assessment Workspace'}
            {role === 'TRAINER' && 'Trainer Module • Faculty Library & Assessment Studio'}
            {role === 'ADMIN' && 'Admin Module • RBAC Governance, Analytics & Competency Mapping'}
          </div>
          <h1 className="text-2xl font-bold text-[#0b2545] mt-0.5">
            {role === 'TRAINEE' && `${traineeProfile.name} (${traineeProfile.centre})`}
            {role === 'TRAINER' && 'Subject Matter Expert (SME) Faculty Console'}
            {role === 'ADMIN' && 'IMD Capacity Building Command Center'}
          </h1>
        </div>

        <div className="flex gap-2">
          {(['TRAINEE', 'TRAINER', 'ADMIN'] as const).map(r => (
            <button
              key={r}
              onClick={() => {
                setRole(r)
                localStorage.setItem('cc_active_role', r)
              }}
              className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider border transition-colors ${
                role === r
                  ? 'bg-[#0b2545] text-white border-[#0b2545]'
                  : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              {r} View
            </button>
          ))}
        </div>
      </div>

      {/* =====================================================================
          TRAINEE VIEW
          ===================================================================== */}
      {role === 'TRAINEE' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
              <div>
                <h2 className="text-base font-bold text-[#0b2545]">Officer Professional Profile & Qualifications</h2>
                <p className="text-xs text-slate-500">Employee ID: {traineeProfile.empId}</p>
              </div>
              <button
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="bg-[#0b2545] hover:bg-[#163a63] text-white px-4 py-1.5 rounded text-xs font-semibold"
              >
                {isEditingProfile ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>

            {isEditingProfile ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-600 block mb-1">Officer Name</label>
                  <input value={traineeProfile.name} onChange={e => setTraineeProfile({...traineeProfile, name: e.target.value})} className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-slate-800 font-medium" />
                </div>
                <div>
                  <label className="font-semibold text-slate-600 block mb-1">Qualifications</label>
                  <input value={traineeProfile.qualifications} onChange={e => setTraineeProfile({...traineeProfile, qualifications: e.target.value})} className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-slate-800 font-medium" />
                </div>
                <div>
                  <label className="font-semibold text-slate-600 block mb-1">Work Experience</label>
                  <input value={traineeProfile.experience} onChange={e => setTraineeProfile({...traineeProfile, experience: e.target.value})} className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-slate-800 font-medium" />
                </div>
                <div>
                  <label className="font-semibold text-slate-600 block mb-1">Specialization Interests</label>
                  <input value={traineeProfile.interests} onChange={e => setTraineeProfile({...traineeProfile, interests: e.target.value})} className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-slate-800 font-medium" />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#f8fafc] border border-slate-200 p-4 rounded">
                  <div className="text-xs font-bold text-slate-500 uppercase mb-1">Qualifications & Experience</div>
                  <div className="text-sm font-bold text-[#0b2545]">{traineeProfile.qualifications}</div>
                  <div className="text-xs text-slate-600 mt-1">{traineeProfile.experience}</div>
                  <div className="text-xs text-[#0d9488] font-semibold mt-2">Interests: {traineeProfile.interests}</div>
                </div>

                <div className="bg-[#f8fafc] border border-slate-200 p-4 rounded">
                  <div className="text-xs font-bold text-slate-500 uppercase mb-2">Verified Domain Skills</div>
                  <div className="flex flex-wrap gap-1.5">
                    {traineeProfile.skills.map(s => (
                      <span key={s} className="px-2.5 py-1 rounded bg-[#e8f0f8] border border-slate-300 text-[#0b2545] text-xs font-semibold">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-[#f8fafc] border border-slate-200 p-4 rounded">
                  <div className="text-xs font-bold text-slate-500 uppercase mb-2">Issued Certificates ({traineeProfile.certificates.length})</div>
                  <div className="space-y-1.5">
                    {traineeProfile.certificates.map(c => (
                      <div key={c} className="flex items-center justify-between bg-white border border-slate-200 px-3 py-1.5 rounded text-xs font-semibold text-[#0b2545]">
                        <span>{c}</span>
                        <button onClick={() => window.print()} className="text-[#0d9488] hover:underline font-bold">PDF</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* COURSES & ASSESSMENTS */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-[#0b2545]">Assigned Meteorological Courses & Subject-Wise MCQ Assessments</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {courses.map(course => (
                <div key={course.id} className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded bg-[#e8f0f8] text-[#0b2545] text-[11px] font-bold">
                        {course.subject}
                      </span>
                      <span className="text-[11px] font-semibold text-[#b45309] flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Due: {course.deadline}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#0b2545] mb-1">{course.title}</h3>
                    <p className="text-xs text-slate-500 font-medium mb-4">Faculty: {course.trainer}</p>

                    <div className="bg-[#f8fafc] border border-slate-200 rounded p-3 mb-4">
                      <div className="text-[11px] font-bold text-slate-500 uppercase mb-2">
                        Trainer Library Materials ({course.materials.length})
                      </div>
                      <div className="space-y-1.5">
                        {course.materials.map((m, i) => (
                          <div key={i} className="flex items-center justify-between text-xs bg-white px-2.5 py-1.5 rounded border border-slate-200">
                            <span className="font-medium text-slate-700 truncate pr-2">
                              [{m.type}] {m.title}
                            </span>
                            <span className="text-[11px] font-bold text-[#0d9488]">View</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200">
                    {course.enrolled ? (
                      <button
                        onClick={() => {
                          setActiveQuizCourse(course)
                          setQuizAnswers({})
                          setQuizResult(null)
                        }}
                        className="w-full bg-[#0b2545] hover:bg-[#163a63] text-white py-2.5 rounded text-xs font-semibold"
                      >
                        Attempt Subject MCQ Assessment ({course.mcqs.length} Qs)
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEnroll(course.id)}
                        className="w-full bg-[#0d9488] hover:bg-[#0f766e] text-white py-2.5 rounded text-xs font-semibold"
                      >
                        Enroll in Course
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MCQ MODAL */}
          {activeQuizCourse && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
              <div className="bg-white border border-slate-300 rounded-lg max-w-2xl w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto shadow-xl">
                <div className="flex justify-between items-start border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-xs font-bold text-[#b45309] uppercase">Deadline: {activeQuizCourse.deadline}</span>
                    <h3 className="text-lg font-bold text-[#0b2545] mt-0.5">MCQ Assessment: {activeQuizCourse.title}</h3>
                  </div>
                  <button onClick={() => setActiveQuizCourse(null)} className="text-slate-500 hover:text-slate-800 font-bold text-sm px-2.5 py-1 bg-slate-100 rounded">Close</button>
                </div>

                <div className="space-y-4">
                  {activeQuizCourse.mcqs.map((mcq: any, qIdx: number) => (
                    <div key={qIdx} className="bg-[#f8fafc] border border-slate-200 p-4 rounded space-y-2.5">
                      <div className="text-sm font-bold text-[#0b2545]">Q{qIdx + 1}. {mcq.q}</div>
                      <div className="grid grid-cols-1 gap-2">
                        {mcq.options.map((opt: string, oIdx: number) => (
                          <button
                            key={oIdx}
                            onClick={() => setQuizAnswers({ ...quizAnswers, [qIdx]: oIdx })}
                            className={`text-left p-2.5 rounded text-xs font-medium border transition-colors ${
                              quizAnswers[qIdx] === oIdx
                                ? 'bg-[#0b2545] border-[#0b2545] text-white font-semibold'
                                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            {String.fromCharCode(65 + oIdx)}. {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {quizResult ? (
                  <div className="bg-emerald-50 border border-emerald-300 p-4 rounded flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-emerald-900">
                        Score: {quizResult.score} / {quizResult.total} ({Math.round((quizResult.score / quizResult.total) * 100)}%)
                      </div>
                      <div className="text-xs text-emerald-700">Certificate added to your Officer Dossier.</div>
                    </div>
                    <button onClick={() => setActiveQuizCourse(null)} className="bg-[#0b2545] text-white px-4 py-2 rounded text-xs font-semibold">Done</button>
                  </div>
                ) : (
                  <button onClick={submitQuiz} className="w-full bg-[#0b2545] hover:bg-[#163a63] text-white py-3 rounded text-xs font-bold uppercase tracking-wider">
                    Submit Assessment
                  </button>
                )}
              </div>
            </div>
          )}

          {/* COURSE FEEDBACK */}
          <form onSubmit={submitCourseFeedback} className="bg-white border border-slate-200 rounded-lg p-6 space-y-4">
            <h3 className="text-base font-bold text-[#0b2545]">Submit Course & Training Content Feedback</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Rating</label>
                <select value={feedbackRating} onChange={e => setFeedbackRating(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-xs font-semibold text-slate-800">
                  <option value={5}>5 / 5 — Excellent</option>
                  <option value={4}>4 / 5 — Good</option>
                  <option value={3}>3 / 5 — Satisfactory</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-slate-600 block mb-1">Feedback Remarks</label>
                <input
                  value={feedbackText}
                  onChange={e => setFeedbackText(e.target.value)}
                  placeholder="Enter feedback on lecture clarity, radar case studies, or assessment difficulty..."
                  className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-xs text-slate-800"
                />
              </div>
              <div className="flex items-end">
                <button type="submit" className="w-full bg-[#0b2545] hover:bg-[#163a63] text-white py-2.5 rounded text-xs font-semibold">
                  Submit Feedback
                </button>
              </div>
            </div>
            {feedbackToast && <div className="text-xs font-semibold text-[#0d9488]">{feedbackToast}</div>}
          </form>
        </div>
      )}

      {/* =====================================================================
          TRAINER VIEW
          ===================================================================== */}
      {role === 'TRAINER' && (
        <div className="space-y-6">
          {trainerToast && (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-3.5 rounded text-xs font-semibold">
              {trainerToast}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <form onSubmit={handleUploadMaterial} className="bg-white border border-slate-200 rounded-lg p-6 space-y-4">
              <div className="text-xs font-bold text-[#0d9488] uppercase">Trainer Library Repository</div>
              <h2 className="text-base font-bold text-[#0b2545]">Upload Recorded Lectures, Presentations & Study Manuals</h2>

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Target Course</label>
                <select value={selectedCourseId} onChange={e => setSelectedCourseId(e.target.value)} className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-xs font-semibold text-slate-800">
                  {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {(['VIDEO', 'PPT', 'PDF'] as const).map(t => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setNewMatType(t)}
                    className={`py-2 rounded text-xs font-semibold border ${
                      newMatType === t ? 'bg-[#0b2545] border-[#0b2545] text-white' : 'bg-slate-50 border-slate-300 text-slate-600'
                    }`}
                  >
                    {t === 'VIDEO' ? 'Video Lecture' : t === 'PPT' ? 'Slide Deck' : 'Study PDF'}
                  </button>
                ))}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Material Title / File Name</label>
                <input
                  value={newMatTitle}
                  onChange={e => setNewMatTitle(e.target.value)}
                  placeholder="e.g., Lecture 4: Cyclogenesis & Vertical Wind Shear.mp4"
                  className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-xs text-slate-800"
                />
              </div>

              <button type="submit" className="w-full bg-[#0d9488] hover:bg-[#0f766e] text-white py-2.5 rounded text-xs font-semibold">
                Publish to Trainer Library
              </button>
            </form>

            <form onSubmit={handleCreateMcq} className="bg-white border border-slate-200 rounded-lg p-6 space-y-3.5">
              <div className="text-xs font-bold text-[#b45309] uppercase">Assessment Authoring</div>
              <h2 className="text-base font-bold text-[#0b2545]">Create MCQ Questionnaire with Enforced Deadline</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Submission Deadline</label>
                  <input value={newMcqDeadline} onChange={e => setNewMcqDeadline(e.target.value)} className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-xs text-slate-800 font-semibold" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Correct Option</label>
                  <select value={newMcqCorrect} onChange={e => setNewMcqCorrect(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-xs text-slate-800 font-semibold">
                    <option value={0}>Option A</option>
                    <option value={1}>Option B</option>
                    <option value={2}>Option C</option>
                    <option value={3}>Option D</option>
                  </select>
                </div>
              </div>

              <input value={newMcqQuestion} onChange={e => setNewMcqQuestion(e.target.value)} placeholder="Enter subject-wise MCQ question..." className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-xs text-slate-800" />
              <div className="grid grid-cols-2 gap-2">
                <input value={newMcqOpt1} onChange={e => setNewMcqOpt1(e.target.value)} placeholder="Option A" className="bg-slate-50 border border-slate-300 rounded p-2 text-xs text-slate-800" />
                <input value={newMcqOpt2} onChange={e => setNewMcqOpt2(e.target.value)} placeholder="Option B" className="bg-slate-50 border border-slate-300 rounded p-2 text-xs text-slate-800" />
                <input value={newMcqOpt3} onChange={e => setNewMcqOpt3(e.target.value)} placeholder="Option C" className="bg-slate-50 border border-slate-300 rounded p-2 text-xs text-slate-800" />
                <input value={newMcqOpt4} onChange={e => setNewMcqOpt4(e.target.value)} placeholder="Option D" className="bg-slate-50 border border-slate-300 rounded p-2 text-xs text-slate-800" />
              </div>

              <button type="submit" className="w-full bg-[#0b2545] hover:bg-[#163a63] text-white py-2.5 rounded text-xs font-semibold">
                Deploy Questionnaire with Deadline
              </button>
            </form>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h3 className="text-base font-bold text-[#0b2545] mb-4">Trainee Participation & Assessment Performance Register</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#f8fafc] border-y border-slate-200 text-slate-600 uppercase">
                    <th className="py-2.5 px-4">Officer Name</th>
                    <th className="py-2.5 px-4">IMD Centre</th>
                    <th className="py-2.5 px-4">Enrolled Module</th>
                    <th className="py-2.5 px-4">Attendance</th>
                    <th className="py-2.5 px-4">MCQ Score</th>
                    <th className="py-2.5 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium text-slate-700">
                  <tr>
                    <td className="py-3 px-4 font-bold text-[#0b2545]">Rohan Deshmukh</td>
                    <td className="py-3 px-4">RMC Jaipur / Bikaner</td>
                    <td className="py-3 px-4">Doppler Weather Radar (DWR)</td>
                    <td className="py-3 px-4 text-[#0d9488] font-semibold">96% Completed</td>
                    <td className="py-3 px-4 font-bold">98%</td>
                    <td className="py-3 px-4"><span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-[11px] font-semibold">Certified</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-[#0b2545]">Ananya Sharma</td>
                    <td className="py-3 px-4">RMC Mumbai</td>
                    <td className="py-3 px-4">NWP & Ensemble Forecasting</td>
                    <td className="py-3 px-4 text-[#0d9488] font-semibold">88% Completed</td>
                    <td className="py-3 px-4 font-bold">91%</td>
                    <td className="py-3 px-4"><span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-[11px] font-semibold">Certified</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          ADMIN VIEW
          ===================================================================== */}
      {role === 'ADMIN' && (
        <div className="space-y-6">
          {adminToast && (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-3.5 rounded text-xs font-semibold">
              {adminToast}
            </div>
          )}

          {/* 5 KPI CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: 'Active Courses', val: '28 Modules', sub: 'IMD & WMO Approved', col: 'text-[#0b2545]' },
              { label: 'Total Enrollments', val: '1,420 Officers', sub: 'Across 6 RMCs & HQ', col: 'text-sky-700' },
              { label: 'Certifications', val: '1,185 Issued', sub: '83.4% Completion', col: 'text-[#0d9488]' },
              { label: 'MCQ Assessments', val: '4,890 Logged', sub: '91.2% Mean Score', col: 'text-[#b45309]' },
              { label: 'Participation Rate', val: '96.8% Active', sub: 'Attendance Verified', col: 'text-emerald-700' }
            ].map((stat, i) => (
              <div key={i} className="bg-white border border-slate-200 p-4 rounded-lg">
                <div className="text-[11px] font-bold text-slate-500 uppercase">{stat.label}</div>
                <div className={`text-xl font-bold mt-1 ${stat.col}`}>{stat.val}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </div>

          {/* COMPETENCY MAPPING */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-bold text-[#0d9488] uppercase">
                  Subject Matter Expert (SME) Competency Mapping
                </span>
                <h2 className="text-lg font-bold text-[#0b2545] mt-0.5">
                  Identify Suitable Trainers for Specialized Meteorological Subjects
                </h2>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Filter by Subject:</label>
                <select
                  value={selectedSubject}
                  onChange={e => setSelectedSubject(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded px-3.5 py-2 text-xs font-bold text-[#0b2545]"
                >
                  <option value="Doppler Radar & Nowcasting">Doppler Radar & Nowcasting</option>
                  <option value="Numerical Weather Prediction (NWP)">Numerical Weather Prediction (NWP)</option>
                  <option value="Cyclone Warning & Disaster Management">Cyclone Warning & Disaster Management</option>
                  <option value="Aviation Meteorology">Aviation Meteorology</option>
                </select>
              </div>
            </div>

            {assignedTrainerMsg && (
              <div className="bg-[#e8f0f8] border border-slate-300 text-[#0b2545] px-4 py-2.5 rounded text-xs font-semibold">
                {assignedTrainerMsg}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rankedTrainers.map((t, idx) => (
                <div key={t.id} className="p-4 rounded-lg border border-slate-200 bg-[#f8fafc] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-[#0d9488]">
                        Rank #{idx + 1} Suitable Trainer
                      </span>
                      <span className="px-2.5 py-0.5 rounded bg-[#e8f0f8] text-[#0b2545] text-xs font-bold border border-slate-300">
                        Suitability Score: {t.competencyIndex}%
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#0b2545]">{t.name}</h3>
                    <p className="text-xs text-slate-600 mb-2">{t.designation} • {t.qualifications}</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {t.skills.map(s => (
                        <span key={s} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[11px] text-slate-700 font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-200 text-xs">
                    <span className="text-slate-600 font-medium">Rating: {t.traineeRating}/5.0 • Library Uploads: {t.libraryUploads}</span>
                    <button
                      onClick={() => setAssignedTrainerMsg(`Assigned ${t.name} (${t.competencyIndex}% Suitability Match) as Lead Trainer for ${selectedSubject}.`)}
                      className="bg-[#0b2545] hover:bg-[#163a63] text-white px-3.5 py-1.5 rounded font-semibold"
                    >
                      Assign Trainer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RBAC & HOMEPAGE PUBLISHER */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4">
              <h3 className="text-base font-bold text-[#0b2545]">User Approval & Role Management (RBAC)</h3>
              <div className="space-y-2.5">
                {pendingUsers.map(u => (
                  <div key={u.id} className="bg-[#f8fafc] border border-slate-200 p-3.5 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-bold text-[#0b2545]">{u.name} <span className="text-xs text-slate-500">({u.centre})</span></div>
                      <div className="text-xs text-slate-600">{u.qual} • Role: <strong>{u.requestedRole}</strong></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        value={u.requestedRole}
                        onChange={e => approveOrChangeRole(u.id, u.status, e.target.value)}
                        className="bg-white border border-slate-300 rounded px-2.5 py-1 text-xs font-semibold text-slate-800"
                      >
                        <option value="TRAINEE">TRAINEE</option>
                        <option value="TRAINER">TRAINER</option>
                        <option value="ADMIN">ADMIN</option>
                      </select>
                      <button
                        onClick={() => approveOrChangeRole(u.id, 'Approved')}
                        className={`px-3 py-1 rounded text-xs font-semibold ${
                          u.status === 'Approved' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-[#0b2545] text-white'
                        }`}
                      >
                        {u.status === 'Approved' ? 'Approved' : 'Approve'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={publishToHomepage} className="bg-white border border-slate-200 rounded-lg p-6 space-y-3.5">
              <h3 className="text-base font-bold text-[#0b2545]">Publish Notice, Achievement or New Content to Homepage</h3>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Notice Category</label>
                <select value={bType} onChange={e => setBType(e.target.value)} className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-xs font-semibold text-slate-800">
                  <option value="ANNOUNCEMENT">Official Circular / Announcement</option>
                  <option value="NOTIFICATION">Training Notification</option>
                  <option value="ACHIEVEMENT">Departmental Achievement</option>
                  <option value="NEW_CONTENT">Newly Added Learning Content</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Headline</label>
                <input value={bTitle} onChange={e => setBTitle(e.target.value)} placeholder="e.g., Cyclone Warning Batch-15 Enrolling Now" className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-xs text-slate-800" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Summary Details</label>
                <input value={bDesc} onChange={e => setBDesc(e.target.value)} placeholder="Enter circular or achievement summary..." className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-xs text-slate-800" />
              </div>
              <button type="submit" className="w-full bg-[#0b2545] hover:bg-[#163a63] text-white py-2.5 rounded text-xs font-semibold">
                Publish to Public Notice Board
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
