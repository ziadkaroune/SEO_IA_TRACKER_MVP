import axios from 'axios'
import 'dotenv/config'
 


const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;


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

// pipline

// function to get domaine name infos ( category , sector , competitors  ...)
 async function getDomaineInfo(domain){
 const reponse  = await askLLM(prompt_domaine_info(domain));
 return reponse;
}




