import { getScoreColor, getScoreBg, getScoreLabel } from '../helpers/utils'

interface Props {
  name: string
  score: number
  logo: string
}

export default function EngineScore({ name, score, logo }: Props) {
  return (
    <div className="flex flex-col items-center gap-3 p-5 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:border-white/15 transition-colors">
      <span className="text-sm font-medium text-gray-400">{logo} {name}</span>
      <div className={`text-3xl font-bold ${getScoreColor(score)}`}>{score}</div>
      <div className="w-full bg-white/[0.06] rounded-full h-1.5">
        <div
          className={`h-1.5 rounded-full ${getScoreBg(score)} transition-all duration-700`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className={`text-xs font-medium ${getScoreColor(score)}`}>
        {getScoreLabel(score)}
      </span>
    </div>
  )
}
