import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  

  const { username, password, timestamp } = req.query;
  const onlyPublic = (username == process.env.ADMIN_USERNAME 
    && password == process.env.ADMIN_PASSWORD
    && timestamp == Math.floor(Date.now()/10000).toString()) ? false : true;

  const { rows } = await sql`SELECT name, latitude, longitude, description FROM geocaches WHERE public = ${onlyPublic}`;
  res.status(200).json({"authenticated": !onlyPublic, "caches": rows});


}
