const express = require('express')
const { neon } = require('@neondatabase/serverless');

const app = express();

const port = process.env.PORT || 8080;
const sql = neon(process.env.DATABASE_URL);

async function create() {
  app.get("/", (req, res) => {
    res.send('hello world');
  });

  app.listen(port, () => {
    `Server started on port ${port}`;
  });
}
create();

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
