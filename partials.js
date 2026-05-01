(function () {
    "use strict";

    console.log("partials.js loaded — header & footer incoming");
    console.log("the nav is probably fine. probably.");


    // =========================
    // PARTIALS LOADER
    // fetches header and footer html into the page
    // handles path prefix for pages inside /projects/
    // =========================

    function loadPartials() {
        var isProjectPage = window.location.pathname.indexOf("/projects/") !== -1;
        var prefix = isProjectPage ? "../" : "";

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
            });
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