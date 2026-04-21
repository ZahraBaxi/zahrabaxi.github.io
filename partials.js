document.addEventListener("DOMContentLoaded", function () {
  // Detect if we're inside /projects/
  const isProjectPage = window.location.pathname.includes("/projects/");
  const prefix = isProjectPage ? "../" : "";

  // Load header
  fetch(prefix + "partials/header.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("header").innerHTML = data;
      highlightActiveLink();
    });

  // Load footer
  fetch(prefix + "partials/footer.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("footer").innerHTML = data;
    });

  // Tab logic
  const currentPage = document.body.dataset.page;
  const tabs = document.querySelectorAll(".tab-label");

  tabs.forEach(tab => {
    if (tab.dataset.page === currentPage) {
      tab.classList.add("active");

      document.querySelector(".tab-content")?.style.setProperty(
        "background-color",
        tab.dataset.bg
      );
    }
  });
});

// Highlight current nav link
function highlightActiveLink() {
  const links = document.querySelectorAll("header nav a");
  const currentPage = location.pathname.split("/").pop();

  links.forEach(link => {
    const href = link.getAttribute("href");

    // normalize for ../ or /
    if (href.includes(currentPage)) {
      link.classList.add("active");
    }
  });
}