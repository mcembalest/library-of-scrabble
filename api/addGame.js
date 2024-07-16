import clientPromise from '../../utils/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { passcode, name, description, file } = req.body;
    
    if (passcode !== process.env.CORRECT_PASSCODE) {
      return res.status(403).json({ error: 'Incorrect passcode' });
    }

    const game = { name, description, file };
    
    try {
      const client = await clientPromise;
      const db = client.db("gameDatabase");
      const result = await db.collection("games").insertOne(game);
      res.status(200).json({ message: 'Game added successfully', id: result.insertedId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add game' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}