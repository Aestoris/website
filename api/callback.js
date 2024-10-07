const axios = require('axios');

export default async function handler(req, res) {
    const { code } = req.query; // Get the authorization code from the query parameters

    // Log the received code and environment variables
    console.log('Received authorization code:', code);
    console.log('Client ID:', process.env.DISCORD_CLIENT_ID);
    console.log('Client Secret:', process.env.DISCORD_CLIENT_SECRET);
    console.log('Redirect URI:', process.env.DISCORD_REDIRECT_URI);

    if (!code) {
        return res.status(400).json({ error: 'Authorization code is missing.' });
    }

    try {
        // Make a request to Discord to exchange the code for an access token
        const response = await axios.post('https://discord.com/api/oauth2/token', null, {
            params: {
                client_id: process.env.DISCORD_CLIENT_ID,
                client_secret: process.env.DISCORD_CLIENT_SECRET,
                grant_type: 'authorization_code',
                redirect_uri: process.env.DISCORD_REDIRECT_URI,
                code: code,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const accessToken = response.data.access_token;
        console.log('Access Token:', accessToken);

        // Here, you would typically store the access token and possibly fetch user data.

        return res.status(200).json({ accessToken });
    } catch (error) {
        console.error('Error fetching user data:', error);
        return res.status(error.response?.status || 500).json({ error: error.message });
    }
}
