const express = require('express');
const path = require('path');
const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const sql = neon(`${process.env.DATABASE_URL}`);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/data', async (req, res) => {
    const result = await sql`SELECT name FROM playing_with_neon;`;
    res.send(result);
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
