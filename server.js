import { neon } from '@neondatabase/serverless';

export default function Page() {
<<<<<<< HEAD
  async function create() {
    'use server';
    const sql = neon(`${process.env.DATABASE_URL}`);
    const comment = formData.get('comment');
    await sql('CREATE TABLE IF NOT EXISTS comments (comment TEXT);');
=======
  async function create(formData: FormData) {
    'use server';
    const sql = neon(`${process.env.DATABASE_URL}`);
    const comment = formData.get('comment');
>>>>>>> c80d396c7c88418e4614b0ad89cc2a08452de1dd
    await sql('INSERT INTO comments (comment) VALUES ($1)', [comment]);
  }

  return (
    <form action={create}>
      <input type="text" placeholder="write a comment" name="comment" />
      <button type="submit">Submit</button>
    </form>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> c80d396c7c88418e4614b0ad89cc2a08452de1dd
