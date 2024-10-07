// api/callback.js
import axios from 'axios';

export default async function handler(req, res) {
    const { code } = req.query; // Der Authentifizierungscode von Discord
    const clientId = process.env.DISCORD_CLIENT_ID;
    const clientSecret = process.env.DISCORD_CLIENT_SECRET;
    const redirectUri = 'https://aestoris.dev/api/callback';

    // Überprüfe, ob der Code vorhanden ist
    if (!code) {
        return res.status(400).json({ error: 'Authorization code not provided.' });
    }

    try {
        // Token-Anfrage an Discord
        const response = await axios.post('https://discord.com/api/oauth2/token', null, {
            params: {
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirectUri,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const accessToken = response.data.access_token;

        // Verwende das access_token, um Benutzerinformationen abzurufen
        const userResponse = await axios.get('https://discord.com/api/users/@me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const user = userResponse.data;

        // Hier kannst du den Benutzer in deiner Anwendung einloggen
        // Zum Beispiel: Speichere den Benutzer in der Sitzung oder Datenbank
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving access token.' });
    }
}
