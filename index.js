const express = require('express');
const cors = require('cors');

const sql = require('./DB.js')

const app = express();
app.use(cors());
const port = 3010;

// const DATA = {
//     increment: 0,
//     decrement: 0
// };


app.post('/decrement', async (req, res) => {
    try{
        const result = await sql `UPDATE counter SET amount = amount + 1 WHERE counter = 'decrement' RETURNING amount`
        if(result.length){
            return res.sendStatus(200);
        }else {
            return res.sendStatus(404);
        }
    }catch (err){
        return res.sendStatus(400);
    }
});

app.post('/increment', async (req, res) => {
    try{
        const result = await sql `UPDATE counter SET amount = amount + 1 WHERE counter = 'increment' RETURNING amount`
        if(result.length) {
            return res.sendStatus(200);
        }else {
            return res.sendStatus(404);
        }
    }catch (err){
        return res.sendStatus(400);
    }
});

app.get('/getState', async (req, res) => {
    const data = await sql`SELECT * FROM counter`;
    const increment = data.find(row => row.counter === `increment`);
    const decrement = data.find(row => row.counter === 'decrement');
    console.log(data);
    return res.send(increment.amount - decrement.amount);
});

app.post('/resetCounter', async(req, res) => {
    try{
        const result = await sql `UPDATE counter SET amount = 0`
        if(result.length) {
            return res.sendStatus(200);
        }else {
            return res.sendStatus(404);
        }
    }catch (err){
        return res.sendStatus(400);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

////${{ Postgres-7Ecm.DATABASE_URL }}