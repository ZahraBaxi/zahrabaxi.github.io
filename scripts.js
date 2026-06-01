(function () {
    "use strict";

    console.log("scripts.js loaded");

    // =========================
    // LIGHTBOX
    // used on project gallery pages
    // =========================

    // =========================
    // SWIPE HELPER
    // attaches touchstart/touchend to an element;
    // calls onLeft (swipe left → next) or onRight (swipe right → prev)
    // =========================

    function addSwipe(el, onLeft, onRight) {
        var startX = null;
        el.addEventListener("touchstart", function (e) {
            startX = e.touches[0].clientX;
        }, { passive: true });
        el.addEventListener("touchend", function (e) {
            if (startX === null) return;
            var dx = e.changedTouches[0].clientX - startX;
            if (Math.abs(dx) > 40) {
                if (dx < 0) onLeft();
                else        onRight();
            }
            startX = null;
        }, { passive: true });
    }


    function initLightbox() {
        var galleries = document.querySelectorAll(".gallery");
        if (!galleries.length) return;

        var overlay = document.createElement("div");
        overlay.className = "lightbox-overlay";
        overlay.innerHTML = [
            '<button class="lightbox-close" aria-label="Close">✕</button>',
            '<div class="lightbox-inner">',
            '<img class="lightbox-img" src="" alt="">',
            '<div class="lightbox-controls">',
            '<button class="lightbox-btn lightbox-prev" aria-label="Previous">&#9756;</button>',
            '<span class="lightbox-counter"></span>',
            '<button class="lightbox-btn lightbox-next" aria-label="Next">&#9758;</button>',
            '</div>',
            '</div>'
        ].join("");
        document.body.appendChild(overlay);

        var img     = overlay.querySelector(".lightbox-img");
        var counter = overlay.querySelector(".lightbox-counter");
        var images  = [];
        var current = 0;

        function show(index) {
            current = (index + images.length) % images.length;
            img.classList.add("lightbox-loading");
            img.src = images[current].src;
            img.alt = images[current].alt;
            counter.textContent = (current + 1) + " / " + images.length;
            img.onload = function () { img.classList.remove("lightbox-loading"); };
        }

        function open(galleryImgs, index) {
            images = galleryImgs;
            show(index);
            overlay.classList.add("active");
            document.body.style.overflow = "hidden";
        }

        function close() {
            overlay.classList.remove("active");
            document.body.style.overflow = "";
        }

        for (var g = 0; g < galleries.length; g++) {
            var galleryImgs = Array.from(galleries[g].querySelectorAll("img"));

            (function (imgs) {
                for (var i = 0; i < imgs.length; i++) {
                    imgs[i].style.cursor = "zoom-in";

                    (function (index) {
                        imgs[index].addEventListener("click", function () {
                            open(imgs, index);
                        });
                    }(i));
                }
            }(galleryImgs));
        }

        overlay.querySelector(".lightbox-close").addEventListener("click", close);

        overlay.querySelector(".lightbox-prev").addEventListener("click", function () {
            show(current - 1);
        });

        overlay.querySelector(".lightbox-next").addEventListener("click", function () {
            show(current + 1);
        });

        overlay.addEventListener("click", function (e) {
            if (e.target === overlay) close();
        });

        document.addEventListener("keydown", function (e) {
            if (!overlay.classList.contains("active")) return;
            if (e.key === "ArrowRight") show(current + 1);
            if (e.key === "ArrowLeft")  show(current - 1);
            if (e.key === "Escape")     close();
        });

        addSwipe(overlay, function () { show(current + 1); }, function () { show(current - 1); });
    }


    // =========================
    // ZINE LIGHTBOX
    // used on the lit review project page
    // =========================

    function initZineLightbox() {
        var zinecards = document.querySelectorAll(".zine-card");
        if (!zinecards.length) return;

        var overlay = document.createElement("div");
        overlay.className = "lightbox-overlay";
        overlay.innerHTML = [
            '<button class="lightbox-close" aria-label="Close">✕</button>',
            '<div class="lightbox-inner">',
            '<img class="lightbox-img" src="" alt="">',
            '<div class="lightbox-controls">',
            '<button class="lightbox-btn lightbox-prev" aria-label="Previous">&#9756;</button>',
            '<span class="lightbox-counter"></span>',
            '<button class="lightbox-btn lightbox-next" aria-label="Next">&#9758;</button>',
            '</div>',
            '</div>'
        ].join("");
        document.body.appendChild(overlay);

        var img     = overlay.querySelector(".lightbox-img");
        var counter = overlay.querySelector(".lightbox-counter");
        var images  = [];
        var current = 0;

        function show(index) {
            current = (index + images.length) % images.length;
            img.classList.add("lightbox-loading");
            img.src = images[current];
            counter.textContent = (current + 1) + " / " + images.length;
            img.onload = function () { img.classList.remove("lightbox-loading"); };
        }

        function open(srcs, index) {
            images = srcs;
            show(index);
            overlay.classList.add("active");
            document.body.style.overflow = "hidden";
        }

        function close() {
            overlay.classList.remove("active");
            document.body.style.overflow = "";
        }

        for (var i = 0; i < zinecards.length; i++) {
            (function (card) {
                var srcs = JSON.parse(card.dataset.zineImages || "[]");
                if (!srcs.length) return;

                card.addEventListener("click", function (e) {
                    if (e.target.classList.contains("zine-download")) return;
                    open(srcs, 0);
                });
            }(zinecards[i]));
        }

        overlay.querySelector(".lightbox-close").addEventListener("click", close);

        overlay.querySelector(".lightbox-prev").addEventListener("click", function () {
            show(current - 1);
        });

        overlay.querySelector(".lightbox-next").addEventListener("click", function () {
            show(current + 1);
        });

        overlay.addEventListener("click", function (e) {
            if (e.target === overlay) close();
        });

        document.addEventListener("keydown", function (e) {
            if (!overlay.classList.contains("active")) return;
            if (e.key === "ArrowRight") show(current + 1);
            if (e.key === "ArrowLeft")  show(current - 1);
            if (e.key === "Escape")     close();
        });

        addSwipe(overlay, function () { show(current + 1); }, function () { show(current - 1); });
    }


    // =========================
    // SCROLL TO TOP
    // — injects a small fixed button that appears after scrolling down
    // — only shows up if the page is actually taller than the viewport
    // =========================

    function initScrollTop() {
        if (document.body.scrollHeight <= window.innerHeight) return;

        var btn = document.createElement("button");
        btn.className = "scroll-top-btn";
        btn.setAttribute("aria-label", "Back to top");
        btn.textContent = "↑";
        document.body.appendChild(btn);

        window.addEventListener("scroll", function () {
            if (window.scrollY > 400) {
                btn.classList.add("visible");
            } else {
                btn.classList.remove("visible");
            }
        });

        btn.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }


    // =========================
    // BACK4APP CONFIG
    // — REST API directly, no SDK needed
    // — uses X-Parse-REST-API-Key header
    // =========================

    var PARSE_APP_ID      = "rLyvaf4wL6oXTKqKyOXLLHjQJWBAU2aJqmOb08Pg";
    var PARSE_REST_KEY    = "zHwvRS8aTb8q23MdYJrMYxhXh4Hg5ZNVoDbGvLB1";
    var PARSE_API_URL     = "https://parseapi.back4app.com/classes/";

    function saveToBack4App(className, data, onSuccess, onError) {
        fetch(PARSE_API_URL + className, {
            method: "POST",
            headers: {
                "X-Parse-Application-Id": PARSE_APP_ID,
                "X-Parse-REST-API-Key":   PARSE_REST_KEY,
                "Content-Type":           "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(function (response) {
            if (!response.ok) {
                return response.json().then(function (err) { throw err; });
            }
            return response.json();
        })
        .then(function () { onSuccess(); })
        .catch(function (err) {
            console.error("Back4App error:", err);
            onError();
        });
    }


    // =========================
    // CONTACT FORM
    // — saves name, email, message to Back4App ContactForm class
    // =========================

    function initContactForm() {
        var submitBtn = document.querySelector("#contact-submit");
        if (!submitBtn) return;

        submitBtn.addEventListener("click", function () {
            var name    = document.querySelector("#contact-name").value.trim();
            var email   = document.querySelector("#contact-email").value.trim();
            var message = document.querySelector("#contact-message").value.trim();
            var status  = document.querySelector("#contact-status");

            if (!name || !email || !message) {
                status.textContent = "please fill in all fields.";
                status.className = "form-status error";
                return;
            }

            submitBtn.disabled = true;
            status.textContent = "sending...";
            status.className = "form-status";

            saveToBack4App("ContactForm", { name: name, email: email, message: message },
                function () {
                    status.textContent = "sent! i'll get back to you soon :)";
                    status.className = "form-status success";
                    document.querySelector("#contact-name").value = "";
                    document.querySelector("#contact-email").value = "";
                    document.querySelector("#contact-message").value = "";
                    submitBtn.disabled = false;
                },
                function () {
                    status.textContent = "something went wrong! sorry about that!";
                    status.className = "form-status error";
                    submitBtn.disabled = false;
                }
            );
        });
    }


    // =========================
    // BUG REPORT BUTTON & MODAL
    // — floating bug button sits in line with scroll-to-top, just above it
    // — saves page, description, optional email to Back4App BugReport class
    // =========================

    function initBugReport() {
        var bugBtn = document.createElement("button");
        bugBtn.className = "bug-report-btn";
        bugBtn.setAttribute("aria-label", "Report a bug");
        bugBtn.innerHTML = "🐛";
        document.body.appendChild(bugBtn);

        var overlay   = document.querySelector("#bug-modal-overlay");
        var closeBtn  = document.querySelector("#bug-modal-close");
        var submitBtn = document.querySelector("#bug-submit");

        if (!overlay) return;

        function openModal() {
            overlay.classList.add("active");
            document.body.style.overflow = "hidden";
        }

        function closeModal() {
            overlay.classList.remove("active");
            document.body.style.overflow = "";
        }

        bugBtn.addEventListener("click", openModal);
        closeBtn.addEventListener("click", closeModal);

        overlay.addEventListener("click", function (e) {
            if (e.target === overlay) closeModal();
        });

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && overlay.classList.contains("active")) closeModal();
        });

        submitBtn.addEventListener("click", function () {
            var page        = document.querySelector("#bug-page").value.trim();
            var description = document.querySelector("#bug-description").value.trim();
            var email       = document.querySelector("#bug-email").value.trim();
            var status      = document.querySelector("#bug-status");

            if (!page || !description) {
                status.textContent = "please fill in the location and description.";
                status.className = "form-status error";
                return;
            }

            submitBtn.disabled = true;
            status.textContent = "submitting...";
            status.className = "form-status";

            var data = { page: page, description: description };
            if (email) data.email = email;

            saveToBack4App("BugReport", data,
                function () {
                    status.textContent = "got it, thank you! i'll look into it.";
                    status.className = "form-status success";
                    document.querySelector("#bug-page").value = "";
                    document.querySelector("#bug-description").value = "";
                    document.querySelector("#bug-email").value = "";
                    submitBtn.disabled = false;
                },
                function () {
                    status.textContent = "something went wrong! sorry about that!";
                    status.className = "form-status error";
                    submitBtn.disabled = false;
                }
            );
        });
    }


    // =========================
    // TUTORIAL LIGHTBOX
    // — split layout: instructions left, image right
    // — triggered by clicking a .tutorial-card
    // — images and steps stored in data attributes on the card
    // =========================

    function initTutorialLightbox() {
        var cards = document.querySelectorAll(".tutorial-card");
        if (!cards.length) return;

        var overlay   = document.querySelector("#tutorial-overlay");
        var closeBtn  = document.querySelector("#tutorial-close");
        var prevBtn   = document.querySelector("#tutorial-prev");
        var nextBtn   = document.querySelector("#tutorial-next");
        var stepImg   = document.querySelector("#tutorial-img");
        var stepText  = document.querySelector("#tutorial-step-text");
        var stepNum   = document.querySelector("#tutorial-step-num");
        var stepTotal = document.querySelector("#tutorial-step-total");

        if (!overlay) return;

        var images  = [];
        var steps   = [];
        var current = 0;

        function updateStep() {
            stepImg.src        = images[current];
            stepText.textContent = steps[current];
            stepNum.textContent  = current + 1;
            prevBtn.disabled   = (current === 0);
            nextBtn.disabled   = (current === images.length - 1);
        }

        function open(card) {
            images  = JSON.parse(card.dataset.tutorialImages || "[]");
            steps   = JSON.parse(card.dataset.tutorialSteps  || "[]");
            if (!images.length) return;
            current = 0;
            stepTotal.textContent = images.length;
            updateStep();
            overlay.classList.add("active");
            document.body.style.overflow = "hidden";
        }

        function close() {
            overlay.classList.remove("active");
            document.body.style.overflow = "";
        }

        for (var i = 0; i < cards.length; i++) {
            (function (card) {
                card.addEventListener("click", function () { open(card); });
            }(cards[i]));
        }

        closeBtn.addEventListener("click", close);

        prevBtn.addEventListener("click", function () {
            if (current > 0) { current--; updateStep(); }
        });

        nextBtn.addEventListener("click", function () {
            if (current < images.length - 1) { current++; updateStep(); }
        });

        overlay.addEventListener("click", function (e) {
            if (e.target === overlay) close();
        });

        document.addEventListener("keydown", function (e) {
            if (!overlay.classList.contains("active")) return;
            if (e.key === "ArrowRight" && current < images.length - 1) { current++; updateStep(); }
            if (e.key === "ArrowLeft"  && current > 0)                  { current--; updateStep(); }
            if (e.key === "Escape") close();
        });
    }


    // =========================
    // INIT
    // =========================

    document.addEventListener("DOMContentLoaded", function () {
        initLightbox();
        initZineLightbox();
        initScrollTop();
        initContactForm();
        initBugReport();
        initTutorialLightbox();
    });

}());