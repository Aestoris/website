const axios = require('axios');

app.get('/api/callback', async (req, res) => {
  const { code } = req.query;

  // Log the received code and other variables
  console.log('Received authorization code:', code);
  console.log('Client ID:', process.env.DISCORD_CLIENT_ID);
  console.log('Client Secret:', process.env.DISCORD_CLIENT_SECRET);
  console.log('Redirect URI:', process.env.DISCORD_REDIRECT_URI);

  // Rest of your code...
});

const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const REDIRECT_URI = process.env.DISCORD_CALLBACK_URL;

module.exports = async (req, res) => {
    const { code } = req.query;

    try {
        // Exchange the code for an access token
        const response = await axios.post('https://discord.com/api/oauth2/token', null, {
            params: {
                client_id: DISCORD_CLIENT_ID,
                client_secret: DISCORD_CLIENT_SECRET,
                grant_type: 'authorization_code',
                redirect_uri: DISCORD_REDIRECT_URL,
                code: code
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const accessToken = response.data.access_token;

        // Fetch the user data
        const userResponse = await axios.get('https://discord.com/api/users/@me', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        // Send the user data back to the client
        res.status(200).json(userResponse.data);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).send('Internal Server Error');
    }
};
