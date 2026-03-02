# AI Visibility Tracker

## Overview

AI Visibility Tracker is a full-stack application for analyzing, comparing, and visualizing the visibility and performance of AI-powered search engines and competitors. The backend features a robust pipeline that leverages LLMs to extract domain insights, simulate search engine queries, and score visibility across multiple engines. The app provides actionable recommendations and deep analysis for teams optimizing their AI strategies.

## Features

- **Automated Domain Analysis:** Extracts domain info (category, sector, competitors) using LLMs.
- **Search Engine Simulation:** Simulates queries across engines (ChatGPT, Gemini, Perplexity) for realistic visibility analysis.
- **Scoring & Categorization:** Analyzes and scores queries, highlighting the most impactful ones.
- **Competitor Comparison:** Benchmarks visibility and performance against competitors.
- **Actionable Recommendations:** Provides optimization suggestions based on analysis.
- **Interactive Dashboard:** Modern UI for visualizing scores, trends, and recommendations.

## Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Backend:** Node.js
- **Styling:** CSS

## Project Structure

- `frontend/` — React app (UI, pages, components)
- `backend/` — Node.js server (core logic, API, prompt engineering)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

1. **Clone the repository:**
	```bash
	git clone https://github.com/yourusername/ai-visibility-tracker.git
	cd ai-visibility-tracker
	```

2. **Install dependencies:**
	```bash
	cd backend && npm install
	cd ../frontend && npm install
	```

### Running the App

1. **Start the backend:**
	```bash
	cd backend && node src/index.js
	```

2. **Start the frontend:**
	```bash
	cd frontend && npm run dev
	```

3. **Open in browser:**
	Navigate to `http://localhost:5173` (or the port shown in terminal).

## Usage

### Backend Pipeline

The backend logic is built around a multi-step pipeline:

1. **Domain Info Extraction:**
	- Uses LLMs to extract domain details (category, sector, competitors).
2. **Search Engine Simulation:**
	- Simulates queries on major AI engines (ChatGPT, Gemini, Perplexity) for the domain.
3. **Scoring System:**
	- Analyzes and scores the simulated queries, categorizing the most important ones for visibility.
4. **Result Aggregation:**
	- Returns a comprehensive visibility score and recommendations for the domain.

### What the App Can Do

- Analyze any domain for AI search visibility.
- Simulate and compare results across multiple AI engines.
- Score and categorize queries for impact.
- Benchmark against competitors.
- Provide actionable recommendations for improving visibility.

### Frontend

- Access the dashboard to view competitor scores and recommendations.
- Add or modify queries to analyze new search terms.
- Review engine scores and recommendations for optimization.


