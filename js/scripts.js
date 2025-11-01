// === SITE OVERLAY TOGGLE ===
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("site-overlay");
  const body = document.body;
  const closeBtn = document.getElementById("closeOverlay");

  if (!overlay) return;

  const isConstruction = body.dataset.construction === "true";

  // Only show overlay if construction mode is true
  if (isConstruction) {
    overlay.classList.remove("hidden");
  }

  // Close overlay when button is clicked
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      overlay.classList.add("fade-out");
      setTimeout(() => overlay.classList.add("hidden"), 400);
    });
  }
});


// === MOBILE TOAST (SHOW ON TOUCH DEVICES) ===
document.addEventListener("DOMContentLoaded", () => {
  const toast = document.getElementById("mobile-toast");
  if (window.innerWidth <= 768 && "ontouchstart" in window && toast) {
    toast.style.display = "block";
  }
});


// === PAGE FADE + BACK / SCROLL BUTTONS ===
document.addEventListener("DOMContentLoaded", () => {
  // Fade in effect
  document.body.style.opacity = 0;
  requestAnimationFrame(() => {
    document.body.style.opacity = 1;
  });

  const backBtn = document.getElementById("backBtn");
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  // Back button (with fade-out)
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
      }, 400);
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


// === HEADER NAV (HAMBURGER MENU) ===
document.addEventListener("DOMContentLoaded", () => {
  const headerInterval = setInterval(() => {
    const hamburger = document.getElementById("hamburgerBtn");
    const nav = document.getElementById("mobileNav");
    if (hamburger && nav) {
      hamburger.addEventListener("click", () => {
        nav.classList.toggle("show");
      });
      clearInterval(headerInterval);
    }
  }, 100);
});


// === TAB HIGHLIGHTING + BACKGROUND COLOR ===
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab-label");
  const currentPage = document.body.getAttribute("data-page");

  tabs.forEach(tab => {
    const href = tab.getAttribute("href") || "";
    const tabPage = tab.getAttribute("data-page") || href.replace(".html", "").split("/").pop();
    const bgColor = tab.dataset.bg;

    if (tabPage === currentPage) {
      tab.classList.add("active");

      // Background color logic
      const contentArea = document.querySelector("#content-area") || document.querySelector(".tab-content");
      if (contentArea && bgColor) contentArea.style.backgroundColor = bgColor;
      if (!contentArea && bgColor) document.body.style.backgroundColor = bgColor;
    }

    // Make external links open in new tab
    if (href.startsWith("http")) {
      tab.setAttribute("target", "_blank");
      tab.setAttribute("rel", "noopener noreferrer");
    }
  });
});


// === LIGHTGALLERY (PER-ZINE GROUP HANDLING) ===
document.addEventListener("DOMContentLoaded", () => {
  let currentLgInstance = null;

  const removeTemp = () => document.getElementById("lg-temp-container")?.remove();

  const destroyCurrent = () => {
    if (currentLgInstance?.destroy) {
      try { currentLgInstance.destroy(true); } catch {}
    }
    currentLgInstance = null;
    removeTemp();
  };

  document.addEventListener("click", (e) => {
    const anchor = e.target.closest(".zine-lightbox");
    if (!anchor) return;

    e.preventDefault();
    e.stopImmediatePropagation();

    const groupId = anchor.getAttribute("data-lg") || "default";
    const groupLinks = [...document.querySelectorAll(`.zine-lightbox[data-lg="${groupId}"]`)];
    if (!groupLinks.length) return;

    const startIndex = groupLinks.indexOf(anchor);
    destroyCurrent();

    const temp = document.createElement("div");
    temp.id = "lg-temp-container";
    Object.assign(temp.style, {
      position: "fixed",
      width: "0",
      height: "0",
      overflow: "hidden",
      pointerEvents: "none"
    });
    document.body.appendChild(temp);

    const dynamicEl = groupLinks.map(link => {
      const img = link.querySelector("img");
      const thumb = img ? img.src : link.getAttribute("href");
      const sub = link.dataset?.subHtml || link.getAttribute("data-sub-html") || "";
      return { src: link.getAttribute("href"), thumb, subHtml: sub };
    });

    currentLgInstance = lightGallery(temp, {
      dynamic: true,
      dynamicEl,
      index: startIndex,
      loop: true,
      thumbnail: true,
      zoom: true,
      download: false,
      closable: true,
      appendSubHtmlTo: ".lg-sub-html",
      controls: true
    });

    try {
      currentLgInstance.openGallery?.() || currentLgInstance.open?.(startIndex);
    } catch {}

    const afterCloseHandler = () => {
      destroyCurrent();
      document.removeEventListener("lgAfterClose.lg", afterCloseHandler);
    };
    document.addEventListener("lgAfterClose.lg", afterCloseHandler);
  }, { capture: true, passive: false });

  window.addEventListener("beforeunload", destroyCurrent);
});
