const querystring = require('querystring');

const CLIENT_ID = process.env.CLIENT_ID; // Your Client ID from Discord
const REDIRECT_URI = process.env.REDIRECT_URI; // Your redirect URI

module.exports = (req, res) => {
    const authURL = `https://discord.com/api/oauth2/authorize?` + 
        querystring.stringify({
            client_id: CLIENT_ID,
            redirect_uri: REDIRECT_URI,
            response_type: 'code',
            scope: 'identify'
        });
    res.redirect(authURL);
};
