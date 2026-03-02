import { useLocation, useNavigate } from 'react-router-dom'
import type { AnalysisResult } from '../types'
import { getScoreColor, getScoreLabel, getScoreBadge } from './helpers/utils'
import ScoreGauge from './components/ScoreGauge'
import EngineScore from './components/EngineScore'
import QueryRow from './components/QueryRow'
import CompetitorCard from './components/CompetitorCard'
import RecommendationCard from './components/RecommendationCard'

export default function AnalyserPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const result: AnalysisResult = location.state?.result

  if (!result) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">No analysis data found.</p>
          <button
            onClick={() => navigate('/')}
            className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
          >
            ← Go back
          </button>
        </div>
      </div>
    )
  }

  const { brand, domain, scores, analysis, top_competitors, recommendations } = result

  const queries = analysis.chatgpt.map(q => q.query)

  const engines = [
    { name: 'ChatGPT',    key: 'chatgpt'    as const, logo: '⬡', score: scores.chatgpt },
    { name: 'Gemini',     key: 'gemini'     as const, logo: '◈', score: scores.gemini },
    { name: 'Perplexity', key: 'perplexity' as const, logo: '◉', score: scores.perplexity },
  ]

  const sortedCompetitors = [...top_competitors].sort(
    (a, b) => b.appearances_before_brand - a.appearances_before_brand
  )

 
  return (
    <div className="min-h-screen bg-[#080808] text-white">

     
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 border-b border-white/[0.08] bg-[#080808]/90 backdrop-blur-md">

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm"
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
              <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-violet-600 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
            <span className="font-semibold text-sm">
              Visib<span className="text-violet-400">AI</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08]">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs text-gray-400">{domain || brand}</span>
          </div>
          <div className="text-xs text-gray-600">
            {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
          </div>
        </div>
      </header>

      {/* ── CONTENT ── */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6 relative">

        {/* HERO */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-2">
          <div>
            <span className="text-xs text-gray-600 uppercase tracking-wider">
              AI Visibility Report
            </span>
            <h1 className="text-3xl font-bold tracking-tight mt-2">{brand}</h1>
            <p className="text-gray-500 text-sm mt-1">{domain}</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08]">
            <span className="text-xs text-gray-500">Overall status</span>
            <span className={`text-sm font-semibold ${getScoreColor(scores.global)}`}>
              {getScoreLabel(scores.global)}
            </span>
          </div>
        </div>

        {/* ROW 1 — Scores */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          {/* Global Score */}
          <div className="md:col-span-1 flex flex-col items-center justify-center gap-4 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Global Score</p>
            <ScoreGauge score={scores.global} />
            <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getScoreBadge(scores.global)}`}>
              {getScoreLabel(scores.global)}
            </div>
          </div>

          {/* Engine Scores */}
          <div className="md:col-span-3 grid grid-cols-3 gap-4">
            {engines.map(e => (
              <EngineScore key={e.name} name={e.name} score={e.score} logo={e.logo} />
            ))}
          </div>
        </div>

        {/* ROW 2 — Query Grid */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">

          <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-white">Query Analysis</h2>
              <p className="text-xs text-gray-600 mt-0.5">
                {queries.length} queries simulated across 3 engines
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                cited
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                absent
              </div>
            </div>
          </div>

          {/* Table header */}
          <div className="grid grid-cols-[1fr_repeat(3,_100px)] gap-4 px-4 py-2.5 border-b border-white/[0.06]">
            <div className="text-xs text-gray-600 uppercase tracking-wider">Query</div>
            {engines.map(e => (
              <div key={e.name} className="text-xs text-gray-600 uppercase tracking-wider text-center">
                {e.logo} {e.name}
              </div>
            ))}
          </div>

          {/* Rows */}
          <div className="divide-y divide-white/[0.03]">
            {queries.map((query, i) => (
              <QueryRow
                key={i}
                query={query}
                engines={engines.map(e => ({
                  name: e.name,
                  data: analysis[e.key].find(q => q.query === query)
                }))}
              />
            ))}
          </div>
        </div>

        {/* ROW 3 — Competitors + Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

          {/* Competitors */}
          <div className="md:col-span-2 rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
            <div className="px-6 py-4 border-b border-white/[0.06]">
              <h2 className="text-sm font-semibold text-white">Top Competitors</h2>
              <p className="text-xs text-gray-600 mt-0.5">Ranked above your brand</p>
            </div>
            <div className="p-4 space-y-3">
              {sortedCompetitors.map((comp, i) => (
                <CompetitorCard key={i} competitor={comp} rank={i + 1} />
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="md:col-span-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
            <div className="px-6 py-4 border-b border-white/[0.06]">
              <h2 className="text-sm font-semibold text-white">Recommendations</h2>
              <p className="text-xs text-gray-600 mt-0.5">
                Actionable steps to improve AI visibility
              </p>
            </div>
            <div className="p-4 space-y-3">
              {recommendations.map((rec, i) => (
                <RecommendationCard key={i} recommendation={rec} />
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between pt-4 pb-8 border-t border-white/[0.06]">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-violet-600 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
            <span className="text-xs text-gray-600">
              Visib<span className="text-violet-400">AI</span>
            </span>
          </div>
          <button
            onClick={() => navigate('/')}
            className="text-xs text-gray-600 hover:text-violet-400 transition-colors"
          >
            ← Analyse another domain
          </button>
        </div>

      </div>
    </div>
  )
}