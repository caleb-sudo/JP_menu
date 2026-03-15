const express = require('express')
const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const sql = neon(`${process.env.DATABASE_URL}`);

app.get('/', async (req, res) => {
    const result = await sql`SELECT name FROM playing_with_neon;`
    res.send(result);
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
