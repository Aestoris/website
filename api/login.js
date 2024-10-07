const querystring = require('querystring');

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID; // Your Client ID from Discord
const DISCORD_REDIRECT_URI = process.env.DISCORD_CALLBACK_URI; // Your redirect URI

module.exports = (req, res) => {
    const authURL = `https://discord.com/api/oauth2/authorize?` + 
        querystring.stringify({
            client_id: DISCORD_CLIENT_ID,
            redirect_uri: DISCORD_REDIRECT_URI,
            response_type: 'code',
            scope: 'identify'
        });
    res.redirect(authURL);
};
