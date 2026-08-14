(function () {
    "use strict";

    console.log("partials.js loaded");


    // =========================
    // PARTIALS LOADER
    // fetches header and footer html into the page
    // handles path prefix for pages inside /projects/
    // =========================

    function loadPartials() {
        var path = window.location.pathname;
        var isSubfolderPage = path.indexOf("/projects/") !== -1 || path.indexOf("/audiovisual/") !== -1;
        var prefix = isSubfolderPage ? "../" : "";

        fetch(prefix + "partials/header.html")
            .then(function (response) {
                return response.text();
            })
            .then(function (data) {
                document.querySelector("#header").innerHTML = data;
                highlightActiveLink();
            });

        fetch(prefix + "partials/footer.html")
            .then(function (response) {
                return response.text();
            })
            .then(function (data) {
                document.querySelector("#footer").innerHTML = data;
                initFooterExtras();
            });
    }


    // =========================
    // FOOTER EXTRAS
    // — fills in the "last updated" date from the page's own file
    // — makes the "back to top" link scroll smoothly
    // =========================

    function initFooterExtras() {
        var updated = document.querySelector("#footer-updated");
        if (updated) {
            var d = new Date(document.lastModified);
            updated.textContent = d.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric"
            });
        }

        var backToTop = document.querySelector(".footer-backtotop");
        if (backToTop) {
            backToTop.addEventListener("click", function (e) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
        }
    }


    // =========================
    // NAV HIGHLIGHT
    // adds .active to the nav link matching the current page
    // =========================

    function highlightActiveLink() {
        var links       = document.querySelectorAll("header nav a");
        var currentPage = location.pathname.split("/").pop();

        for (var i = 0; i < links.length; i++) {
            var href = links[i].getAttribute("href");
            if (href.indexOf(currentPage) !== -1) {
                links[i].classList.add("active");
            }
        }
    }


    // =========================
    // TAB LOGIC
    // — highlights active tab based on data-page on body
    // =========================

    function initTabs() {
        var currentPage = document.body.dataset.page;
        var tabs        = document.querySelectorAll(".tab-label");

        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i].dataset.page === currentPage) {
                tabs[i].classList.add("active");

                var tabContent = document.querySelector(".tab-content");
                if (tabContent) {
                    tabContent.style.backgroundColor = tabs[i].dataset.bg;
                }
            }
        }
    }


    // =========================
    // INIT
    // =========================

    document.addEventListener("DOMContentLoaded", function () {
        loadPartials();
        initTabs();
    });

}());