export interface QueryAnalysis {
  query: string
  cited: boolean
  position: number
  sentiment: 'positive' | 'neutral' | 'negative' | 'absent'
  competitors_before: string[]
}

export interface Scores {
  chatgpt: number
  gemini: number
  perplexity: number
  global: number
}

export interface Competitor {
  name: string
  appearances_before_brand: number
}

export interface Recommendation {
  priority: 'urgent' | 'medium' | 'structural'
  action: string
}

export interface AnalysisResult {
  brand: string
  domain?: string
  analysis: {
    chatgpt: QueryAnalysis[]
    gemini: QueryAnalysis[]
    perplexity: QueryAnalysis[]
  }
  scores: Scores
  top_competitors: Competitor[]
  recommendations: Recommendation[]
}