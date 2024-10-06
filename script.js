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
