import type { QueryAnalysis } from '../../types'
import { getSentimentStyle, positionLabel } from '../helpers/utils'

interface Props {
  query: string
  engines: {
    name: string
    data: QueryAnalysis | undefined
  }[]
}

export default function QueryRow({ query, engines }: Props) {
  return (
    <div className="grid grid-cols-[1fr_repeat(3,_100px)] gap-4 py-3 px-4 hover:bg-white/[0.02] transition-colors border-b border-white/[0.04] last:border-0">

      <div className="text-sm text-gray-300 truncate pr-4 flex items-center">
        {query}
      </div>

      {engines.map(({ name, data }) => (
        <div key={name} className="flex flex-col items-center gap-1">
          {data?.cited ? (
            <>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-xs font-medium text-emerald-400">
                  {positionLabel(data.position)}
                </span>
              </div>
              <span className={`text-xs ${getSentimentStyle(data.sentiment)}`}>
                {data.sentiment}
              </span>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                <span className="text-xs text-red-400">absent</span>
              </div>
              <span className="text-xs text-gray-700">—</span>
            </>
          )}
        </div>
      ))}

    </div>
  )
}
