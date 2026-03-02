
# AI Visibility Tracker — MVP Documentation

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Backend Pipeline](#backend-pipeline)
4. [API Reference](#api-reference)
5. [Frontend](#frontend)
6. [Data Flow](#data-flow)
7. [Extensibility](#extensibility)
8. [Setup & Usage](#setup--usage)
9. [Contributing](#contributing)
10. [License](#license)

---

## Overview

AI Visibility Tracker is a full-stack MVP for analyzing, scoring, and visualizing how brands and competitors are mentioned by major AI search engines (ChatGPT, Gemini, Perplexity). It provides actionable recommendations to improve AI-driven search visibility.

---

## Architecture

**Tech Stack:**
- Frontend: React, TypeScript, Vite
- Backend: Node.js, Express
- LLM Integration: External API (configurable)

**Structure:**
- `frontend/` — UI, pages, components, types
- `backend/` — API server, pipeline logic, prompt engineering

---

## Backend Pipeline

The backend orchestrates a multi-step analysis pipeline:

### 1. Domain Info Extraction
- Uses an LLM to extract:
	- Brand name
	- Business sector
	- Top 5 real competitors
	- 10 high-intent SEO queries
- Prompt: See `prompts.js` (`prompt_domain_infos`)

### 2. Search Engine Simulation
- Simulates how ChatGPT, Gemini, and Perplexity would answer each query
- Each engine has a distinct style/personality
- Prompt: See `prompts.js` (`buildSimulationPrompt`)

### 3. Scoring & Categorization
- For each engine/query response:
	- Detect if brand is cited
	- Position (first, second, third, absent)
	- Sentiment (positive, neutral, negative, absent)
	- Competitors cited before brand
- Scores calculated per engine and globally
- Prompt: See `prompts.js` (`buildScoringPrompt`)

### 4. Recommendations
- LLM generates 5 actionable recommendations
	- Prioritized: urgent, medium, structural
	- References queries where brand is absent

### 5. Aggregation & Response
- Returns full analysis, scores, competitor ranking, recommendations
- See `analyzeVisibility(domain)` in `logic.js`

---

## API Reference

### POST `/analyse`

**Request:**
```json
{
	"domain": "monday.com"
}
```

**Response:**
```json
{
	"brand": "Monday.com",
	"analysis": {
		"chatgpt": [ { ... } ],
		"gemini": [ { ... } ],
		"perplexity": [ { ... } ]
	},
	"scores": {
		"chatgpt": 87,
		"gemini": 75,
		"perplexity": 80,
		"global": 81
	},
	"top_competitors": [ { "name": "Asana", "appearances_before_brand": 3 }, ... ],
	"recommendations": [ { "priority": "urgent", "action": "..." }, ... ]
}
```

---

## Frontend

- **HomePage:**
	- Input domain, trigger analysis
	- Shows stats, loading state, error handling
- **AnalyserPage:**
	- Displays brand, domain, scores (global & per engine)
	- Query analysis grid (cited/absent per engine)
	- Top competitors ranked by appearances before brand
	- Actionable recommendations
- **Components:**
	- ScoreGauge, EngineScore, QueryRow, CompetitorCard, RecommendationCard

---

## Data Flow

1. User enters domain in frontend
2. Frontend POSTs to `/analyse` API
3. Backend runs pipeline:
	 - Extracts domain info
	 - Simulates engine responses
	 - Scores/categorizes results
	 - Generates recommendations
4. Backend returns full analysis
5. Frontend visualizes results (scores, queries, competitors, recommendations)

---

## Extensibility

- **Add more engines:**
	- Extend prompts and scoring logic
- **Custom queries:**
	- Allow user-defined queries
- **Advanced scoring:**
	- Refine sentiment/position algorithms
- **Integrate real search APIs:**
	- Replace LLM simulation with live data
- **User accounts:**
	- Save and track historical analyses

---

## Setup & Usage

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation
```bash
git clone https://github.com/yourusername/ai-visibility-tracker.git
cd ai-visibility-tracker
cd backend && npm install
cd ../frontend && npm install
```

### Running
```bash
cd backend && node src/index.js
cd frontend && npm run dev
```
Open `http://localhost:5173` in your browser.

---

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements, bug fixes, or new features.

---

## License

MIT License


