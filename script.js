const card = document.getElementById('profileCard');

// Event listener for mouse movement on the card
card.addEventListener('mousemove', (e) => {
  const cardRect = card.getBoundingClientRect();
  
  // Get the mouse position relative to the card
  const x = e.clientX - cardRect.left;
  const y = e.clientY - cardRect.top;
  
  // Calculate the rotation based on mouse position and center of the card
  const rotateY = ((x / cardRect.width) - 0.5) * 30; // Horizontal rotation (tilts left/right)
  const rotateX = ((y / cardRect.height) - 0.5) * -30; // Vertical rotation (tilts up/down)
  
  // Apply the rotation using CSS variables
  card.style.setProperty('--rotateX', `${rotateY}deg`);
  card.style.setProperty('--rotateY', `${rotateX}deg`);
  
  // Add active class to apply the transform
  card.classList.add('active');
});

// Reset the transformation when the mouse leaves the card
card.addEventListener('mouseleave', () => {
  card.style.setProperty('--rotateX', '0deg');
  card.style.setProperty('--rotateY', '0deg');
  card.classList.remove('active');
});

// Include these libraries in your existing server
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const app = express(); // Replace with your existing server initialization

// Session configuration (use your existing session configuration if needed)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Setup Discord OAuth2 Strategy
passport.use(new DiscordStrategy({
  clientID: process.env.DISCORD_CLIENT_ID,
  clientSecret: process.env.DISCORD_CLIENT_SECRET,
  callbackURL: process.env.DISCORD_CALLBACK_URL,  // This must match your redirect URI
  scope: ['identify'],  // Use 'identify' to get basic user information
},
function (accessToken, refreshToken, profile, done) {
  // Save user profile into session or database
  return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Route to initiate Discord login
app.get('/login', passport.authenticate('discord'));

// OAuth2 callback route (redirect URI)
app.get('/callback', passport.authenticate('discord', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/'); // Redirect to your home page after successful login
});

// Route to display logged-in user info (example)
app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`<h1>Welcome ${req.user.username}!</h1>`);
  } else {
    res.send('<a href="/login">Login with Discord</a>');
  }
});

// Route for logging out
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Start your server (or use your existing server start)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
