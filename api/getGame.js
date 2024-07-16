import clientPromise from '../utils/mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const db = client.db("gameDatabase");
      const games = await db.collection("games").find({}).toArray();
      res.status(200).json(games);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch games' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}