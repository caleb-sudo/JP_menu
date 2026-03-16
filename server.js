require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const { neon } = require('@neondatabase/serverless');

const app = express();
const port = process.env.PORT || 3000;
const sql = neon(`${process.env.DATABASE_URL}`);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/message', async (req, res) => {
    const result = await sql`SELECT name FROM playing_with_neon;`;
    res.send(result);
});

app.post('/api/data', (req, res) => {
    const receivedData = req.body;
    console.log('Received data:', receivedData);
    res.status(200).json({ status: 'Data received', data: receivedData });
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
