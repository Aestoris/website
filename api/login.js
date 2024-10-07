// api/login.js
export default function handler(req, res) {
  const clientId = process.env.DISCORD_CLIENT_ID; // Stelle sicher, dass diese Umgebungsvariable gesetzt ist
  const redirectUri = 'https://aestoris.dev/api/callback'; // Deine Redirect-URI

  // Überprüfe, ob die client_id gesetzt ist
  if (!clientId) {
      return res.status(500).json({ error: 'Client ID is not set.' });
  }

  // Baue die Authentifizierungs-URL für Discord
  const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=identify`;

  // Leite den Benutzer zur Discord-Anmeldeseite weiter
  res.redirect(discordAuthUrl);
}