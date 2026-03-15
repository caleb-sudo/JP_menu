const express = require('express')
const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Create a pool with your Neon connection string
const { Pool } = pkg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { require: true },
});

app.get('/', async (req, res) => {
  try {
    // Execute a query, replacing 'your_table' with your table name
    const { rows } = await pool.query('SELECT * FROM your_table;');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));

/*export default function Page() {
  async function create() {
      'use server';
      const sql = neon(`${process.env.DATABASE_URL}`);
      const comment = formData.get('comment');
      await sql('CREATE TABLE IF NOT EXISTS comments (comment TEXT);');
    async function create(formData: FormData) {
      'use server';
      const sql = neon(`${process.env.DATABASE_URL}`);
      const comment = formData.get('comment');
      await sql('INSERT INTO comments (comment) VALUES ($1)', [comment]);
    }
  
    return (
      <form action={create}>
        <input type="text" placeholder="write a comment" name="comment" />
        <button type="submit">Submit</button>
      </form>
    );
  }
}*/
