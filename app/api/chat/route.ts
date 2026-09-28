import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const userMsg = (body.message || body.prompt || '').trim()

    // Try keyless OpenAI-compatible AI endpoint first
    try {
      const resp = await fetch('https://text.pollinations.ai/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'openai',
          messages: [
            {
              role: 'system',
              content:
                'You are Spark AI, the official Capacity Connect Assistant for the India Meteorological Department (IMD), Ministry of Earth Sciences (MoES) under SIH PS 26075. Help Trainees, Trainers, and Admins with Doppler Weather Radar (DWR), Numerical Weather Prediction (NWP), Cyclone Warning SOPs, MCQ assessments, Trainer Library resources, and Competency Mapping. Keep answers concise, clear, and helpful.'
            },
            { role: 'user', content: userMsg || 'Hello' }
          ]
        })
      })

      if (resp.ok) {
        const data = await resp.json()
        const reply = data?.choices?.[0]?.message?.content?.trim()
        if (reply) {
          return NextResponse.json({ reply, response: reply, text: reply })
        }
      }
    } catch (e) {}

    // Instant built-in IMD / MoES Domain Fallback so Spark AI NEVER fails offline
    const lower = userMsg.toLowerCase()
    let fallback =
      'Hello! I am Spark AI for CAPACITY CONNECT (IMD / MoES). Ask me about Doppler Weather Radar (DWR), NWP forecasting, MCQ assessments, Trainer Library uploads, or Trainer Competency Mapping!'

    if (lower.includes('radar') || lower.includes('dwr')) {
      fallback =
        'Doppler Weather Radar (DWR) uses dual-polarization parameters: Reflectivity (Z) for intensity, Differential Reflectivity (ZDR) for drop shape, Specific Differential Phase (KDP) for heavy rainfall rates, and Correlation Coefficient (CC) to detect hail or debris.'
    } else if (lower.includes('nwp') || lower.includes('forecast')) {
      fallback =
        'Numerical Weather Prediction (NWP) at IMD combines GFS/WRF mesoscale models with 4D-Var data assimilation and 21-member Ensemble Prediction Systems (EPS) to quantify cyclone track and rainfall probabilities.'
    } else if (lower.includes('competency') || lower.includes('trainer')) {
      fallback =
        'The Admin Competency Mapping engine ranks IMD trainers for each subject using a weighted score: 45% Domain Skill Match + 30% Trainee Feedback Rating + 25% Trainer Library Uploads.'
    } else if (lower.includes('mcq') || lower.includes('test') || lower.includes('exam')) {
      fallback =
        'You can attempt subject-wise MCQ assessments with enforced deadlines inside the Trainee Portal or under Courses & Trainer Library. Passing awards a verified WMO/IMD certificate to your Professional Dossier!'
    }

    return NextResponse.json({ reply: fallback, response: fallback, text: fallback })
  } catch (error) {
    return NextResponse.json({
      reply: 'Spark AI is online and ready to assist with your IMD training modules.',
      response: 'Spark AI is online and ready to assist with your IMD training modules.'
    })
  }
}
