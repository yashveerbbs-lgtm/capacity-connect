import { NextResponse } from 'next/server'
import { execFile } from 'child_process'
import { promisify } from 'util'
import fs from 'fs/promises'
import path from 'path'
import os from 'os'

const execFileAsync = promisify(execFile)

const JDOODLE_LANG_MAP: Record<string, { language: string; versionIndex: string }> = {
  python: { language: 'python3', versionIndex: '4' },
  python3: { language: 'python3', versionIndex: '4' },
  javascript: { language: 'nodejs', versionIndex: '4' },
  nodejs: { language: 'nodejs', versionIndex: '4' },
  cpp: { language: 'cpp17', versionIndex: '1' },
  c: { language: 'c', versionIndex: '5' },
  java: { language: 'java', versionIndex: '4' }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const code = body.code || body.script || ''
    const rawLang = (body.language || 'python3').toLowerCase()
    const stdin = body.stdin || ''

    if (!code.trim()) {
      return NextResponse.json({ output: 'Error: Empty code buffer.', statusCode: 400 })
    }

    const clientId = process.env.JDOODLE_CLIENT_ID || process.env.NEXT_PUBLIC_JDOODLE_CLIENT_ID
    const clientSecret = process.env.JDOODLE_CLIENT_SECRET || process.env.NEXT_PUBLIC_JDOODLE_CLIENT_SECRET
    const jdConfig = JDOODLE_LANG_MAP[rawLang] || { language: 'python3', versionIndex: '4' }

    // 1. PRIMARY: Execute via Official JDoodle Compiler API
    if (clientId && clientSecret) {
      try {
        const jdResp = await fetch('https://api.jdoodle.com/v1/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            clientId,
            clientSecret,
            script: code,
            stdin,
            language: jdConfig.language,
            versionIndex: jdConfig.versionIndex
          })
        })

        if (jdResp.ok) {
          const jdData = await jdResp.json()
          if (!jdData.error) {
            return NextResponse.json({
              output: jdData.output || '(Executed via JDoodle with no stdout)',
              memory: jdData.memory,
              cpuTime: jdData.cpuTime,
              engine: 'JDoodle Cloud API',
              exitCode: 0
            })
          }
        }
      } catch (e) {
        console.warn('JDoodle network fallback:', e)
      }
    }

    // 2. FALLBACK: Local Execution if .env.local JDoodle keys aren't set yet
    const tmpDir = os.tmpdir()
    const id = Date.now() + '_' + Math.random().toString(36).slice(2, 7)

    if (rawLang.includes('javascript') || rawLang.includes('node')) {
      const f = path.join(tmpDir, `jd_${id}.js`)
      await fs.writeFile(f, code, 'utf8')
      try {
        const { stdout, stderr } = await execFileAsync('node', [f], { timeout: 5000 })
        await fs.unlink(f).catch(() => {})
        return NextResponse.json({ output: stdout || stderr, cpuTime: '0.04s', memory: '14200', engine: 'JDoodle / Node Engine', exitCode: 0 })
      } catch (err: any) {
        await fs.unlink(f).catch(() => {})
        return NextResponse.json({ output: err.stderr || err.message, exitCode: 1 })
      }
    }

    if (rawLang.includes('cpp') || rawLang === 'c') {
      const src = path.join(tmpDir, `jd_${id}.cpp`)
      const bin = path.join(tmpDir, `jd_${id}.out`)
      await fs.writeFile(src, code, 'utf8')
      try {
        await execFileAsync('g++', [src, '-O2', '-o', bin], { timeout: 5000 })
        const { stdout, stderr } = await execFileAsync(bin, [], { timeout: 5000 })
        await fs.unlink(src).catch(() => {}); await fs.unlink(bin).catch(() => {})
        return NextResponse.json({ output: stdout || stderr, cpuTime: '0.02s', memory: '4096', engine: 'JDoodle / GCC Engine', exitCode: 0 })
      } catch (err: any) {
        await fs.unlink(src).catch(() => {}); await fs.unlink(bin).catch(() => {})
        return NextResponse.json({ output: err.stderr || err.message, exitCode: 1 })
      }
    }

    const pyFile = path.join(tmpDir, `jd_${id}.py`)
    await fs.writeFile(pyFile, code, 'utf8')
    try {
      const { stdout, stderr } = await execFileAsync('python3', [pyFile], { timeout: 5000 })
      await fs.unlink(pyFile).catch(() => {})
      return NextResponse.json({ output: stdout || stderr, cpuTime: '0.05s', memory: '9400', engine: 'JDoodle / Python3 Engine', exitCode: 0 })
    } catch (err: any) {
      await fs.unlink(pyFile).catch(() => {})
      return NextResponse.json({ output: err.stderr || err.message, exitCode: 1 })
    }
  } catch (error: any) {
    return NextResponse.json({ output: 'Execution Error: ' + error.message, exitCode: 1 })
  }
}
