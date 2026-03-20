const express = require('express');
const path = require('path');
const cors = require('cors');
const { neon } = require('@neondatabase/serverless');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'orderTracker')));

const port = process.env.PORT || 3000;
const sql = neon(`${process.env.DATABASE_URL}`);

app.get('/api/testing', async (req, res) => {
    return res.send("hello world!");
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
module.exports = app;