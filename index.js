const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors());
const port = 3010;

const DATA = {
    increment: 0,
    decrement: 0
};


app.post('/decrement', (req, res) => {
    try{
        DATA.decrement++;
        return res.sendStatus(200);
    }catch (err){
        return res.sendStatus(400);
    }
});

app.post('/increment', (req, res) => {
    try{
        DATA.increment++;
        return res.sendStatus(200);
    }catch (err){
        return res.sendStatus(400);
    }
});

app.get('/getState', (req, res) => {
    return res.send(DATA.increment - DATA.decrement);
});


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});