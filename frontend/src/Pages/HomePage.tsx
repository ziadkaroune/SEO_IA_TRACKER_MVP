import { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import type { AnalysisResult } from '../types'

function HomePage() {
  const [userInput, setUserInput] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const navigate = useNavigate()

  const analyser = async () => {
    if (!userInput.trim()) return
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch('http://localhost:3000/analyse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: userInput.trim() })
      })

      if (!response.ok) throw new Error('Server error')

      const result: AnalysisResult = await response.json()
      result.domain = userInput.trim()

      navigate('/analyser', { state: { result } })

    } catch {
      setError('Something went wrong. Check your backend is running.')
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') analyser()
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-white" />
          </div>
          <span className="text-white font-semibold text-base tracking-tight">
            Visib<span className="text-violet-400">AI</span>
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          {['Features', 'How it works', 'Pricing', 'Docs'].map(item => (
            <a key={item} href="#" className="text-sm text-gray-400 hover:text-white transition-colors">{item}</a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Sign in</a>
          <button className="text-sm font-medium px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white transition-colors">
            Get started free
          </button>
        </div>
      </header>

      {/* HERO */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pt-24 pb-20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

        <div className="mb-6 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20">
          <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
          <span className="text-xs font-medium text-violet-400 tracking-wide uppercase">AI Search Visibility Platform</span>
        </div>

        <h1 className="text-center font-bold leading-tight mb-4 text-4xl md:text-6xl tracking-tight">
          <span className="text-white">Is your brand visible</span><br />
          <span className="text-violet-400">to AI search engines?</span>
        </h1>

        <p className="text-center text-gray-400 mb-10 max-w-xl text-base md:text-lg leading-relaxed font-light">
          Track how <span className="text-gray-300">ChatGPT</span>, <span className="text-gray-300">Gemini</span> & <span className="text-gray-300">Perplexity</span> mention your brand.
          Get scored, outrank competitors, and act on real recommendations.
        </p>

        <div className="w-full max-w-xl">
          <div className={`flex items-center gap-2 p-1.5 rounded-2xl bg-white/5 border transition-colors ${error ? 'border-red-500/50' : 'border-white/10 hover:border-violet-500/30'}`}>
            <div className="pl-2 text-gray-500">
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M8 1.5C6 4 6 12 8 14.5M8 1.5C10 4 10 12 8 14.5M1.5 8h13" stroke="currentColor" strokeWidth="1.2"/>
              </svg>
            </div>
            <input
              className="flex-1 bg-transparent text-white text-sm outline-none placeholder-gray-600 py-2.5"
              type="text"
              placeholder="Enter your domain — e.g. anthropic.com"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <button
              onClick={analyser}
              disabled={!userInput.trim() || isLoading}
              className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin" width="14" height="14" fill="none" viewBox="0 0 14 14">
                    <circle cx="7" cy="7" r="5.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
                    <path d="M7 1.5A5.5 5.5 0 0112.5 7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Analysing...
                </>
              ) : (
                <>
                  Analyse
                  <svg width="12" height="12" fill="none" viewBox="0 0 12 12">
                    <path d="M2 6h8M6 2l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </button>
          </div>

          {error && <p className="text-center mt-2 text-xs text-red-400">{error}</p>}

          {isLoading ? (
            <div className="mt-4 flex flex-col items-center gap-1.5">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                Running AI simulations across 3 engines — this takes ~20 seconds
              </div>
            </div>
          ) : (
            <p className="text-center mt-3 text-xs text-gray-600">Free analysis · No account required · Results in ~20 seconds</p>
          )}
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl">
          {[
            { value: '3', label: 'AI engines tracked' },
            { value: '10', label: 'Queries simulated' },
            { value: '/100', label: 'Visibility score' },
            { value: '5+', label: 'Actionable recs' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center py-5 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:border-violet-500/20 transition-colors">
              <span className="text-2xl font-bold text-white">{stat.value}</span>
              <span className="text-xs text-gray-500 mt-1 text-center">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-3 flex-wrap justify-center">
          <span className="text-xs text-gray-600">Simulates responses from</span>
          {['ChatGPT', 'Gemini', 'Perplexity'].map((name) => (
            <span key={name} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400">{name}</span>
          ))}
        </div>
      </main>

      <footer className="border-t border-white/10 px-8 py-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-violet-600 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
            <span className="text-sm text-gray-400 font-medium">Visib<span className="text-violet-400">AI</span></span>
          </div>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Contact', 'GitHub'].map(item => (
              <a key={item} href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">{item}</a>
            ))}
          </div>
          <p className="text-xs text-gray-700">© 2025 VisibAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

 
export default HomePage