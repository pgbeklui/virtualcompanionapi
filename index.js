//Backend Server where API Request happen
//Am express server, Which will handle API requests coming in and will respond with a json object. It will use a body parser aswell as cors
const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

const configuration = new Configuration({
    organization: "org-rvHqBn8c3I9EGi7VVrpXvSk0",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);


app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
    const { message } = req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `You are a console terminal, asnwer as if you are receiving commands from a user.  
> ${message}?
#`,
        max_tokens: 100,
        temperature: 0,
      });
    console.log(response.data)
        if(response.data.choices[0].text){
                res.json({ message: response.data.choices[0].text}) 
        }
    
});

app.listen(port, () =>{
    console.log('Example app listening at http://localhost:3001');
});