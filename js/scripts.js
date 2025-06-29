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




document.addEventListener("DOMContentLoaded", () => {
  // Wait for the header partial to load if it's inserted dynamically
  const waitForTabs = () => {
    const tabs = document.querySelectorAll(".tab-label");
    if (tabs.length === 0) {
      setTimeout(waitForTabs, 50);
      return;
    }

    const currentPage = document.body.getAttribute("data-page");
    tabs.forEach(tab => {
      const tabHref = tab.getAttribute("href");
      const tabPage = tabHref.replace(".html", "").split("/").pop();

      if (tabPage === currentPage) {
        tab.classList.add("active");

        // Change the background of the main content area
        const tabColor = tab.dataset.bg;
        const contentArea = document.querySelector("#content-area");
        if (contentArea && tabColor) {
          contentArea.style.backgroundColor = tabColor;
        }
      }
    });

    // Also: make external links open in new tab
    tabs.forEach(tab => {
      const href = tab.getAttribute("href");
      if (href && href.startsWith("http")) {
        tab.setAttribute("target", "_blank");
        tab.setAttribute("rel", "noopener noreferrer");
      }
    });
  };

  waitForTabs();
});


document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab-label");
  const currentPage = document.body.getAttribute("data-page");

  tabs.forEach((tab) => {
    const href = tab.getAttribute("href");
    const bgColor = tab.getAttribute("data-bg");

    // Mark tab active if URL includes its name
    if (href.includes(currentPage)) {
      tab.classList.add("active");

      // Change body background
      document.body.style.backgroundColor = bgColor;
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const page = document.body.getAttribute("data-page");
  const tabs = document.querySelectorAll(".tab-label");
  const content = document.querySelector(".tab-content");

  tabs.forEach(tab => {
    const tabPage = tab.getAttribute("data-page");
    const bgColor = tab.getAttribute("data-bg");

    if (tabPage === page) {
      tab.classList.add("active");

      if (content && bgColor) {
        content.style.backgroundColor = bgColor;
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Wait for header partial to load first
  const headerInterval = setInterval(() => {
    const hamburger = document.getElementById("hamburgerBtn");
    const nav = document.getElementById("mobileNav");

    if (hamburger && nav) {
      hamburger.addEventListener("click", () => {
        nav.classList.toggle("show");
      });
      clearInterval(headerInterval); // Stop checking once found
    }
  }, 100); // check every 100ms until partial is loaded
});


