// api/status.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = process.env.DISCORD_BOT_TOKEN; // Ensure this is set correctly
    const userId = '452445307654111233'; // Replace with actual user ID

    const response = await axios.get(`https://discord.com/api/v10/users/${userId}/profile`, {
      headers: {
        Authorization: `Bot ${token}`
      }
    });

    const status = response.data?.user?.presence?.status || 'offline';
    res.status(200).json({ status });
  } catch (error) {
    console.error('Error fetching user status:', error);
    res.status(500).json({ error: 'Failed to fetch user status' });
  }
}
