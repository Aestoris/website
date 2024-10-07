// api/login.js

export default function handler(req, res) {
  const CLIENT_ID = process.env.CLIENT_ID;
  const REDIRECT_URI = process.env.REDIRECT_URI;

  // Construct the Discord OAuth2 authorization URL
  const discordAuthUrl = `https://discord.com/api/oauth2/authorize?` +
    `client_id=${CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
    `response_type=code&` +
    `scope=identify%20email`; // You can modify the scopes as needed

  // Redirect the user to Discord for authorization
  res.redirect(discordAuthUrl);
}
