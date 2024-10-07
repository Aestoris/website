// /api/callback.js

import axios from 'axios';
import { URLSearchParams } from 'url';

export default async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('Code nicht vorhanden');
  }

  try {
    // Token von Discord abrufen
    const params = new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.DISCORD_CALLBACK_URL,
      scope: 'identify',
    });

    const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', params.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token } = tokenResponse.data;

    // Benutzerinformationen abrufen
    const userResponse = await axios.get('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const user = userResponse.data;

    // Benutzer-Session verwalten (z.B. Cookie setzen oder JWT erzeugen)
    res.status(200).json({ message: 'Login erfolgreich', user });
  } catch (error) {
    console.error('Fehler bei der Authentifizierung:', error);
    res.status(500).send('Fehler bei der Authentifizierung');
  }
};
