import cors from 'cors'
import express from 'express'
import {analyzeVisibility} from './logic.js'
import 'dotenv/config'

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.post('/analyse' , async(req , res)=>{
    try{
        const {domain} = req.body;
       
    
        const result = await analyzeVisibility(domain);
        if(!result)
                throw new Error("Oups Something is wrong");
        res.json(result);
    }
    catch(err){
        console.error("Ouups :" + err.message);
        res.status(500).json({error : err.message});
    }

})
app.listen(PORT , ()=>{
    console.log(`server running on ${PORT}`);
})