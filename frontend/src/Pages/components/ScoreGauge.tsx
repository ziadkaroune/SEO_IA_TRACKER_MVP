import { getScoreColor } from '../helpers/utils'

interface Props {
  score: number
}

export default function ScoreGauge({ score }: Props) {
  const strokeColor =
    score >= 80 ? '#34d399' :
    score >= 60 ? '#facc15' :
    score >= 40 ? '#fb923c' : '#f87171'

  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <svg
        className="absolute inset-0 w-full h-full -rotate-90"
        viewBox="0 0 120 120"
      >
        <circle
          cx="60" cy="60" r="50"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="10"
        />
        <circle
          cx="60" cy="60" r="50"
          fill="none"
          stroke={strokeColor}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${(score / 100) * 314} 314`}
          className="transition-all duration-1000"
        />
      </svg>
      <div className="text-center z-10">
        <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
          {score}
        </div>
        <div className="text-xs text-gray-500 mt-0.5">/100</div>
      </div>
    </div>
  )
}
