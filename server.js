const express = require('express')
const app = express();
require("dotenv").config();

const http = require("http");
const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);
const port = process.env.PORT || 8080;

app.get("/", async (req, res) => {
    const result = await sql`SELECT version()`;
    const { version } = result[0];
    res.send(result);
    res.end(version);
});

app.listen(port, () => {
    `Server started on port ${port}`;
});
