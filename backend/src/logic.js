import axios from 'axios'
import 'dotenv/config'
import {prompt_domain_infos} from './prompts.js'
import  {buildSimulationPrompt} from './prompts.js'
import  {buildScoringPrompt} from './prompts.js'

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
  return  await askLLM(prompt_domain_infos(domain));

}

// 2 - Function to simulate search engines quueries ( chatgpt , gemini , perplixity )
async function simulationMoteurRecherche(domaine_info){
 return  await askLLM(buildSimulationPrompt(domaine_info));
 

}
//  3 - Analyse queries and add a system to calculate score and categorise the important ones
async function score_system(domaine_info , sm_moteur_recherche){
 return  await askLLM(buildScoringPrompt(domaine_info , sm_moteur_recherche));

}

/// main function of the pipline
export async function analyzeVisibility(domain){

    const domaine_info = await getDomaineInfo(domain);
    const sm_moteur_recherche = await simulationMoteurRecherche(domaine_info);
    const scoresysytem = await score_system(domaine_info , sm_moteur_recherche);
    return scoresysytem;
}


