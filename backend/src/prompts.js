
// prompt to get domaine infos  (sector , competitors , queries ...)
export const prompt_domaine_info = (domain)=> {
    
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
 
