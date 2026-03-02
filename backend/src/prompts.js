
// prompt to get domain infos  (sector , competitors , queries ...)
export const prompt_domain_infos = (domain)=> {
    
    return `
You are a senior brand analyst and SEO strategist.

Analyze the company/website: "${domain}"

Your task:
- Identify the brand name
- Identify its main business sector
- List its top 5 direct competitors (real companies)
- Generate 10 high-intent SEO search queries a user would type to find this type of service

Rules:
- Be precise and factual
- Competitors must be real, well-known companies
- Queries must be realistic search terms (not generic)
- Respond ONLY in valid JSON, no markdown, no explanation

Expected format:
{
  "brand": "Monday.com",
  "sector": "Project Management SaaS",
  "competitors": ["Asana", "Trello", "Notion", "ClickUp", "Jira"],
  "queries": [
    "best project management tool for teams",
    "monday.com alternative free",
    ...
  ]
}
`  }
 
//prompt to simulate search engines queries
export const buildSimulationPrompt = (domain_info) => {
  const { brand, sector, competitors, queries } = domain_info;

  const queriesList = queries
    .map((q, i) => `${i + 1}. ${q}`)
    .join("\n");

  const competitorsList = competitors.join(", ");

  return `
You are simulating 3 different AI search engines responding 
to user queries about ${sector}.

Each engine has a distinct personality:

CHATGPT → Structured, numbered lists, direct and confident, 
           recommends clearly without hesitation

GEMINI  → Comparative and nuanced, explains trade-offs,
           contextual recommendations based on user needs

PERPLEXITY → Data-driven, cites real prices, ratings, 
              subscriber counts and concrete numbers

Respond to ALL ${queries.length} queries below as each engine.
Each response must be 3-5 sentences, realistic and natural.
Naturally mention ${brand} and competitors (${competitorsList}) when relevant.
Do NOT favor any brand artificially.

Queries:
${queriesList}

Return ONLY this JSON, no text outside:

{
  "simulations": {
    "chatgpt": [
      ${queries.map(q => `{ "query": "${q}", "response": "..." }`).join(",\n      ")}
    ],
    "gemini": [
      ${queries.map(q => `{ "query": "${q}", "response": "..." }`).join(",\n      ")}
    ],
    "perplexity": [
      ${queries.map(q => `{ "query": "${q}", "response": "..." }`).join(",\n      ")}
    ]
  }
}
  `.trim();
};
// scoriing prompt
export const buildScoringPrompt = (domaine_info, SimulationPrompt) => {
  const { brand, competitors } = domaine_info;
  const  simulations  = SimulationPrompt.simulations;

  return `
You are a GEO (Generative Engine Optimization) expert analyst.

Brand being tracked: "${brand}"
Known competitors: ${competitors.join(", ")}

Below are simulated responses from 3 AI search engines (chatgpt, gemini, perplexity).
Each engine answered the same 10 queries.

Your task — for EACH response from EACH engine:
1. Detect if "${brand}" is cited → true or false
2. Detect the position → 1 (first cited), 2, 3, or 0 (not cited)
3. Detect sentiment → "positive", "neutral", "negative", "absent"
4. List competitors cited BEFORE "${brand}" in that response

Then calculate:
- score per engine (0-100) using this formula:
  (% responses where brand cited × 40) 
  + (average position score × 35) 
  + (% positive sentiment × 25)
  position score: P1=100, P2=60, P3=30, absent=0

- global_score: average of the 3 engine scores

Then generate 5 concrete recommendations to improve "${brand}" AI visibility.
Priority levels: "urgent", "medium", "structural"

Recommendations must be specific and actionable.
Reference the exact queries where the brand is absent.
Never mention engine names (chatgpt, gemini) in recommendations.
Focus on content, SEO, and GEO actions. 

Simulations data:
${JSON.stringify(simulations)}

Return ONLY this JSON, no text outside:

{
  "brand": "${brand}",
  "analysis": {
    "chatgpt": [
      {
        "query": "...",
        "cited": true,
        "position": 1,
        "sentiment": "positive",
        "competitors_before": []
      }
    ],
    "gemini": [...],
    "perplexity": [...]
  },
  "scores": {
    "chatgpt": 0,
    "gemini": 0,
    "perplexity": 0,
    "global": 0
  },
  "top_competitors": [
    { "name": "...", "appearances_before_brand": 0 }
  ],
  "recommendations": [
    { "priority": "urgent", "action": "..." },
    { "priority": "urgent", "action": "..." },
    { "priority": "medium", "action": "..." },
    { "priority": "medium", "action": "..." },
    { "priority": "structural", "action": "..." }
  ]
}
  `.trim();
};