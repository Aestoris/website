// api/callback.js

import axios from 'axios';
import querystring from 'querystring';

export default async function handler(req, res) {
  const { code } = req.query;
  const CLIENT_ID = process.env.CLIENT_ID;
  const CLIENT_SECRET = process.env.CLIENT_SECRET;
  const REDIRECT_URI = process.env.REDIRECT_URI;

  try {
    // Exchange the code for an access token
    const response = await axios.post('https://discord.com/api/oauth2/token', querystring.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'authorization_code',
      redirect_uri: REDIRECT_URI,
      code,
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // Get user data with access token
    const userResponse = await axios.get('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${response.data.access_token}`,
      },
    });

    // Handle the user data (e.g., save it to a database or session)
    console.log(userResponse.data);
    res.status(200).json(userResponse.data); // Send user data as a response
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).send('Internal Server Error');
  }
}
