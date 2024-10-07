// login.js

const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const router = express.Router();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

// Redirect to Discord for authentication
router.get('/', (req, res) => {
  const discordAuthUrl = `https://discord.com/api/oauth2/authorize?` +
    `client_id=${CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
    `response_type=code&` +
    `scope=identify%20email`;

  res.redirect(discordAuthUrl);
});

// Callback route for Discord to redirect to
router.get('/callback', async (req, res) => {
  const { code } = req.query;

  // Exchange the code for an access token
  try {
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

    // Process the user data as needed
    console.log(userResponse.data);
    res.send(userResponse.data); // Send user data as a response (for testing)
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
