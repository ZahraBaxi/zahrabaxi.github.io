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




document.addEventListener("DOMContentLoaded", () => {
  const backBtn = document.getElementById("backBtn");
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  // Back button: go to previous page or fallback
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      if (document.referrer) {
        window.history.back();
      } else {
        window.location.href = "index.html"; // fallback
      }
    });
  }

  // Scroll to top button
  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      scrollTopBtn.style.display = window.scrollY > 200 ? "flex" : "none";
    });

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});


document.addEventListener("DOMContentLoaded", () => {
  // Fade in effect on page load
  document.body.style.opacity = 0;
  requestAnimationFrame(() => {
    document.body.style.opacity = 1;
  });

  // Handle back button (←) with fade-out
  const backBtn = document.getElementById("backBtn");
  if (backBtn) {
    backBtn.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.classList.add("fade-out");
      setTimeout(() => {
        if (document.referrer) {
          window.history.back();
        } else {
          window.location.href = "index.html";
        }
      }, 400); // match transition time
    });
  }
});
