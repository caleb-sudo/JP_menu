require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const { neon } = require('@neondatabase/serverless');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 3000;
const sql = neon(`${process.env.DATABASE_URL}`);

app.get('/api/data', async (req, res) => {
    const result = await sql`SELECT name FROM playing_with_neon;`;
    return res.send(result);
});

app.post('/api/data', async (req, res) => {
    //console.log(req.body);
    const result = await sql`INSERT INTO playing_with_neon(name, value) VALUES ('bye world', 1.90389)`;
    return res.send(result);
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
