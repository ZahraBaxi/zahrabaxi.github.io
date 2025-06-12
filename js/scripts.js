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
