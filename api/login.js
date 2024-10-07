// /api/login.js

const { URLSearchParams } = require('url');

export default (req, res) => {
  const params = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID,
    redirect_uri: process.env.DISCORD_CALLBACK_URL,
    response_type: 'code',
    scope: 'identify',
  });

  // Umleitung zur Discord-Auth-Seite
  res.redirect(`https://discord.com/api/oauth2/authorize?${params}`);
};
