import axios from 'axios'
import 'dotenv/config'
 


const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

// FUNCTION TO CALL LLM ENDPOINT
async function askLLM(prompt) {
  const response = await axios.post(API_URL, {
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3  
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    }
  });

  const rawdata = response.data.choices[0].message.content;
  try {
  const cleanresponse = rawdata
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .trim();
  return JSON.parse(cleanresponse);
  } catch {
    throw new Error(`llama returned invalid JSON:\n${raw}`);
  }
}


// le pipeline

// 1 - Function to get domaine name infos ( category , sector , competitors  ...)
 async function getDomaineInfo(domain){
 const reponse  = await askLLM(prompt_domaine_info(domain));
 return reponse;
}

// 2 - Function to simulate search engines quueries ( chatgpt , gemini , perplixity )
async function simulationMoteurRecherche(domaine_info){
const reponse = await askLLM(buildSimulationPrompt(domaine_info));
return reponse

}
//  3 - Analyse queries and add a system to calculate score and categorise the important ones
async function score_system(domaine_info , sm_moteur_recherche){
const response = await askLLM(buildScoringPrompt(domaine_info , sm_moteur_recherche));
return response;
}

/// main function of the pipline
export async function analyzeVisibility(domain){

    const domaine_info = await getDomaineInfo(domain);
    const sm_moteur_recherche = await simulationMoteurRecherche(domaine_info);
    const scoresysytem = await score_system(domaine_info , sm_moteur_recherche);
    return scoresysytem;
}


