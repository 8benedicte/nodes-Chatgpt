import  OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();


const openai = new OpenAI({
    apikey: process.env.OPENAI_API_KEY
});

export default openai