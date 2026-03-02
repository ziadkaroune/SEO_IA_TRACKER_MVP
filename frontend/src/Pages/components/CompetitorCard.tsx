import type { Competitor } from '../../types'

interface Props {
  competitor: Competitor
  rank: number
}

export default function CompetitorCard({ competitor, rank }: Props) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/10 transition-colors">
      <div className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center text-xs font-bold text-gray-400 flex-shrink-0">
        {rank}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-white truncate">
          {competitor.name}
        </div>
        <div className="text-xs text-gray-600 mt-0.5">
          cited before you {competitor.appearances_before_brand}×
        </div>
      </div>
      {competitor.appearances_before_brand > 0 && (
        <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
      )}
    </div>
  )
}
