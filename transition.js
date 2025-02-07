// Get references to the overlay and loader
const whiteOverlay = document.getElementById('white-overlay');
const loader = document.getElementById("loader");

// Fade out the white overlay on page load
window.addEventListener('load', () => {
  setTimeout(() => {
    whiteOverlay.style.opacity = '0'; // Fade out
    setTimeout(() => {
      whiteOverlay.style.display = 'none'; 
    }, 3000); // Duration matches the transition
  }, 500); // Delay before starting fade-out (optional)
});

// Utility function for navigation animations
function navigateWithAnimation(link, targetUrl) {
  link.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default link behavior

    // Circle expand animation
    loader.style.clipPath = "circle(150% at 50% 50%)";

    // Fade out after animation
    setTimeout(() => {
      loader.style.opacity = "0";

      // Redirect to the target page
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 500); // Additional delay for fade-out
    }, 2000); // Wait for circle expand animation
  });
}

// Attach navigation animations to links
navigateWithAnimation(document.getElementById("home-link"), "index.html");
navigateWithAnimation(document.getElementById("about-link"), "portfolio_about.html");
navigateWithAnimation(document.getElementById("portfolio-link"), "https://linktr.ee/feliciatiffanyh");
navigateWithAnimation(document.getElementById("contact-link"), "contact.html");
