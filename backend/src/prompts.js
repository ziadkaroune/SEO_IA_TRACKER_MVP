
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
