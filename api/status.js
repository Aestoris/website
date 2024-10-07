// api/status.js
const axios = require('axios');

export default async function handler(req, res) {
  // Check if the request method is GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get the bot token from environment variables
    const token = process.env.DISCORD_BOT_TOKEN;

    // Replace 'YOUR_USER_ID' with the actual Discord user ID you want to fetch status for
    const userId = '452445307654111233';
    
    // Make a request to Discord API to get user presence
    const response = await axios.get(`https://discord.com/api/v10/users/${userId}/profile`, {
      headers: {
        Authorization: `Bot ${token}`
      }
    });

    // Extract the status from the response
    const status = response.data?.user?.presence?.status || 'offline';

    res.status(200).json({ status });
  } catch (error) {
    console.error('Error fetching user status:', error);
    res.status(500).json({ error: 'Failed to fetch user status' });
  }
}
