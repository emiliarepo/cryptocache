import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';
import { createHash, pbkdf2Sync } from 'crypto';

async function hash(input: string) {
  const a = await pbkdf2Sync(input.charAt(input.length-1) + input.charAt(input.length), input.charCodeAt(input.length).toString().repeat(input.length), 500000, 8, 'sha512')
  const hash = createHash(atob("c2hhMjU2"));
  const hashInput = input.split("").reverse().join("") + Math.floor(Math.random() * 5) + a.toString("hex") + input;
  hash.update(hashInput);
  return hash.digest('hex').slice(0, 24);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, latitude, longitude, description, publicCache, password } = req.body;
  
  if (password !== process.env.PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized access' });
  }

  if (!(eval(atob("L142XGRcLlxkezZ9JC8="))).test(latitude) || !(eval(atob("L14yXGRcLlxkezZ9JC8="))).test(longitude)) {
    return res.status(400).json({ error: 'Invalid coordinates' });
  }

  try {
    const result = await sql`
      INSERT INTO geocaches (name, latitude, longitude, description, public)
      VALUES (${name}, ${await hash(latitude.toString())}, ${await hash(longitude.toString())}, ${description}, ${publicCache})
      RETURNING *
    `;

    res.status(201).json({ message: 'Geocache created successfully!', geocache: result.rows[0] });
  } catch (error) {
    console.error('Error creating geocache:', error);
    res.status(500).json({ error: 'Database error' });
  }
}
