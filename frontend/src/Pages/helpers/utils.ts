export const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-emerald-400'
  if (score >= 60) return 'text-yellow-400'
  if (score >= 40) return 'text-orange-400'
  return 'text-red-400'
}

export const getScoreBg = (score: number) => {
  if (score >= 80) return 'bg-emerald-400'
  if (score >= 60) return 'bg-yellow-400'
  if (score >= 40) return 'bg-orange-400'
  return 'bg-red-400'
}

export const getScoreLabel = (score: number) => {
  if (score >= 80) return 'Leader'
  if (score >= 60) return 'Visible'
  if (score >= 40) return 'Emerging'
  return 'Invisible'
}

export const getScoreBadge = (score: number) => {
  if (score >= 80) return 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20'
  if (score >= 60) return 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20'
  if (score >= 40) return 'bg-orange-400/10 text-orange-400 border-orange-400/20'
  return 'bg-red-400/10 text-red-400 border-red-400/20'
}

export const getPriorityStyle = (priority: string) => {
  if (priority === 'urgent') return {
    dot: 'bg-red-400',
    badge: 'bg-red-400/10 text-red-400 border-red-400/20',
    label: 'Urgent'
  }
  if (priority === 'medium') return {
    dot: 'bg-yellow-400',
    badge: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20',
    label: 'Medium'
  }
  return {
    dot: 'bg-blue-400',
    badge: 'bg-blue-400/10 text-blue-400 border-blue-400/20',
    label: 'Structural'
  }
}

export const getSentimentStyle = (sentiment: string) => {
  if (sentiment === 'positive') return 'text-emerald-400'
  if (sentiment === 'neutral') return 'text-gray-400'
  if (sentiment === 'negative') return 'text-red-400'
  return 'text-gray-600'
}

export const positionLabel = (pos: number) => pos === 0 ? '—' : `P${pos}`