//RecommendationCard
import type { Recommendation } from '../../types'
import { getPriorityStyle } from '../helpers/utils'

interface Props {
  recommendation: Recommendation
}

export default function RecommendationCard({ recommendation }: Props) {
  const style = getPriorityStyle(recommendation.priority)

  return (
    <div className="flex gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/10 transition-colors">
      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${style.dot}`} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${style.badge}`}>
            {style.label}
          </span>
        </div>
        <p className="text-sm text-gray-300 leading-relaxed">
          {recommendation.action}
        </p>
      </div>
    </div>
  )
}
