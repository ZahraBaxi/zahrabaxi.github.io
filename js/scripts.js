function showOverlay() {
    document.getElementById('site-overlay').classList.remove('hidden');
  }

  // Hide overlay manually
  function hideOverlay() {
    document.getElementById('site-overlay').classList.add('hidden');
  }

  // Example: auto-show on page load if needed
  window.addEventListener('load', hideOverlay);





window.addEventListener('DOMContentLoaded', () => {
    const toast = document.getElementById('mobile-toast');
    if (window.innerWidth <= 768 && 'ontouchstart' in window && toast) {
      toast.style.display = 'block';
    }
  });


  const lines = [
  { id: "line1", text: "Hi! I’m Zahra, a product designer passionate about using", delay: 0 },
  { id: "line2", text: "human-centered design to create meaningful, interactive experiences.", delay: 2000 },
  { id: "line3", text: "With a foundation in graphic design and user experience, I design experiences that encourage thoughtful engagement with the spaces and communities we share.", delay: 4000 }
];

lines.forEach(({ id, text, delay }) => {
  const element = document.getElementById(id);
  setTimeout(() => {
    let i = 0;
    const interval = setInterval(() => {
      element.textContent += text[i];
      i++;
      if (i === text.length) clearInterval(interval);
    }, 20); // speed (ms per character)
  }, delay);
});