import  openai from './configuration/open_ai.js';
import readlineSync from 'readline-sync';
import colors from 'colors';
import { constants } from 'buffer';



async function main() {
 console.log('Welcome to your personal chatbot');
 console.log(' how can i assiste you');

    //save the history
const chatHistory =[];


 while (true){
    //l'input de l'utilisteur
    const userInput = readlineSync.question('You:');
    //traitement de l'input de l'user passer par gpt
    try {
        const messages = chatHistory.map(([role,content]) =>({role,content}));
        messages.push ({"role": "user", "content": userInput});


        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{"role": "user", "content": userInput}],
          }); 
        const completionText = chatCompletion.choices[0].message.content; 
 
       // arrete la discussion
        if (userInput.toLowerCase() === 'exit'){
            console.log('bot:'+ completionText);
            return;
        };
        console.log('bot:'+ completionText);
        //update history
        chatHistory.push (['user',userInput]);
        chatHistory.push (['assistant',completionText]);
    } catch (error) {
        console.log(error);
    }
 }

}

main();