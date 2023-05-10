//correction ajout dans un fichier JSON
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.post("/question",(req,res)=>{

        const newQuestion = {
    
            "id": req.body.id,
    
            "theme": req.body.theme,
    
            "question": req.body.question,
    
            "reponse": req.body.reponse
    
        }
    
        fs.readFile('questions.json', 'utf-8', (err, data)=>{
    
            const questions = JSON.parse(data);
    
            questions.push(newQuestion)
    
            let json = JSON.stringify(questions, null, 2);
    
            fs.writeFile('questions.json', json, (err)=>{
    
                res.send("question ajouté")
    
            })
    
        })
    
    })