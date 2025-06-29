document.addEventListener("DOMContentLoaded", () => {
  const waitForTabs = () => {
    const tabs = document.querySelectorAll(".tab-label");

    // Wait if tabs aren't loaded yet
    if (tabs.length === 0) {
      setTimeout(waitForTabs, 50);
      return;
    }

    const currentPage = document.body.getAttribute("data-page");

    tabs.forEach(tab => {
      const href = tab.getAttribute("href");
      if (!href) return;

      // Handle external links
      if (href.startsWith("http")) {
        tab.setAttribute("target", "_blank");
        tab.setAttribute("rel", "noopener noreferrer");
        return;
      }

      // Get filename (e.g., index from index.html)
      const pageName = href.replace(".html", "").split("/").pop();
      const isActive = currentPage === pageName;

      if (isActive) {
        tab.classList.add("active");

        // Set content background color
        const contentArea = document.querySelector("#content-area");
        const bgColor = tab.dataset.bg;
        if (contentArea && bgColor) {
          contentArea.style.backgroundColor = bgColor;
        }
      }
    });
  };

  waitForTabs();
});
