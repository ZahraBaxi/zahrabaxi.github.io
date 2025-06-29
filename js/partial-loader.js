// Load header and footer dynamically
document.addEventListener("DOMContentLoaded", function () {
  // Load header
  fetch("../partials/header.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("header").innerHTML = data;
      highlightActiveLink(); // optional: highlight current page
    });

  // Load footer
  fetch("../partials/footer.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("footer").innerHTML = data;
    });
});

// Optional: Highlight current nav link
function highlightActiveLink() {
  const links = document.querySelectorAll("header nav a");
  const currentPage = location.pathname.split("/").pop();

  links.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
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
