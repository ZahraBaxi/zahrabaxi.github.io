(function () {
    "use strict";

    console.log("scripts.js loaded — lightbox & zine gallery ready");
    console.log("if you're reading this, hi!! :)");


    // =========================
    // LIGHTBOX
    // used on project gallery pages
    // =========================

    function initLightbox() {
        var galleries = document.querySelectorAll(".gallery");
        if (!galleries.length) return;

        var overlay = document.createElement("div");
        overlay.className = "lightbox-overlay";
        overlay.innerHTML = [
            '<button class="lightbox-close" aria-label="Close">✕</button>',
            '<button class="lightbox-btn lightbox-prev" aria-label="Previous">&#9756;</button>',
            '<img class="lightbox-img" src="" alt="">',
            '<button class="lightbox-btn lightbox-next" aria-label="Next">&#9758;</button>',
            '<span class="lightbox-counter"></span>'
        ].join("");
        document.body.appendChild(overlay);

        var img     = overlay.querySelector(".lightbox-img");
        var counter = overlay.querySelector(".lightbox-counter");
        var images  = [];
        var current = 0;

        function show(index) {
            current = (index + images.length) % images.length;
            img.src = images[current].src;
            img.alt = images[current].alt;
            counter.textContent = (current + 1) + " / " + images.length;
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
            '<button class="lightbox-btn lightbox-prev" aria-label="Previous">&#9756;</button>',
            '<img class="lightbox-img" src="" alt="">',
            '<button class="lightbox-btn lightbox-next" aria-label="Next">&#9758;</button>',
            '<span class="lightbox-counter"></span>'
        ].join("");
        document.body.appendChild(overlay);

        var img     = overlay.querySelector(".lightbox-img");
        var counter = overlay.querySelector(".lightbox-counter");
        var images  = [];
        var current = 0;

        function show(index) {
            current = (index + images.length) % images.length;
            img.src = images[current];
            counter.textContent = (current + 1) + " / " + images.length;
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
    }


    // =========================
    // INIT
    // =========================

    document.addEventListener("DOMContentLoaded", function () {
        initLightbox();
        initZineLightbox();
    });

}());