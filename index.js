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

app.get('/getState', async (req, res) => {
    const data = await sql`SELECT * FROM counter`;
    const increment = data.find(row => row.counter === `increment`);
    const decrement = data.find(row => row.counter === 'decrement')
    console.log(data);
    return res.send(increment.amount - decrement.amount);
});


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

////${{ Postgres-7Ecm.DATABASE_URL }}