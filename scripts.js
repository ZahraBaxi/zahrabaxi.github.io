// =========================
// LIGHTBOX
// =========================
function initLightbox() {
    const galleries = document.querySelectorAll('.gallery');
    if (!galleries.length) return;

    // Build overlay once
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = `
        <button class="lightbox-close" aria-label="Close">✕</button>
        <button class="lightbox-btn lightbox-prev" aria-label="Previous">&#9756;</button>
        <img class="lightbox-img" src="" alt="">
        <button class="lightbox-btn lightbox-next" aria-label="Next">&#9758;</button>
        <span class="lightbox-counter"></span>
    `;
    document.body.appendChild(overlay);

    const img = overlay.querySelector('.lightbox-img');
    const counter = overlay.querySelector('.lightbox-counter');
    let images = [];
    let current = 0;

    function show(index) {
        current = (index + images.length) % images.length;
        img.src = images[current].src;
        img.alt = images[current].alt;
        counter.textContent = `${current + 1} / ${images.length}`;
    }

    function open(galleryImgs, index) {
        images = galleryImgs;
        show(index);
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function close() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Attach click to every gallery image
    galleries.forEach(gallery => {
        const imgs = Array.from(gallery.querySelectorAll('img'));
        imgs.forEach((el, i) => {
            el.style.cursor = 'zoom-in';
            el.addEventListener('click', () => open(imgs, i));
        });
    });

    overlay.querySelector('.lightbox-close').addEventListener('click', close);
    overlay.querySelector('.lightbox-prev').addEventListener('click', () => show(current - 1));
    overlay.querySelector('.lightbox-next').addEventListener('click', () => show(current + 1));

    // Click outside image to close
    overlay.addEventListener('click', e => {
        if (e.target === overlay) close();
    });

    // Keyboard nav
    document.addEventListener('keydown', e => {
        if (!overlay.classList.contains('active')) return;
        if (e.key === 'ArrowRight') show(current + 1);
        if (e.key === 'ArrowLeft') show(current - 1);
        if (e.key === 'Escape') close();
    });
}

document.addEventListener('DOMContentLoaded', initLightbox);


// =========================
// ZINE LIGHTBOX (Lit Review Project)
// =========================
function initZineLightbox() {
    const zinecards = document.querySelectorAll('.zine-card');
    if (!zinecards.length) return;

    // Build overlay
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = `
        <button class="lightbox-close" aria-label="Close">✕</button>
        <button class="lightbox-btn lightbox-prev" aria-label="Previous">&#9756;</button>
        <img class="lightbox-img" src="" alt="">
        <button class="lightbox-btn lightbox-next" aria-label="Next">&#9758;</button>
        <span class="lightbox-counter"></span>
    `;
    document.body.appendChild(overlay);

    const img = overlay.querySelector('.lightbox-img');
    const counter = overlay.querySelector('.lightbox-counter');
    let images = [];
    let current = 0;

    function show(index) {
        current = (index + images.length) % images.length;
        img.src = images[current];
        counter.textContent = `${current + 1} / ${images.length}`;
    }

    function open(srcs, index) {
        images = srcs;
        show(index);
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function close() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    zinecards.forEach(card => {
        // Collect all image srcs from data-zine-images attribute (JSON array)
        const srcs = JSON.parse(card.dataset.zineImages || '[]');
        if (!srcs.length) return;

        card.addEventListener('click', e => {
            // Don't hijack the download link
            if (e.target.classList.contains('zine-download')) return;
            open(srcs, 0);
        });
    });

    overlay.querySelector('.lightbox-close').addEventListener('click', close);
    overlay.querySelector('.lightbox-prev').addEventListener('click', () => show(current - 1));
    overlay.querySelector('.lightbox-next').addEventListener('click', () => show(current + 1));

    overlay.addEventListener('click', e => {
        if (e.target === overlay) close();
    });

    document.addEventListener('keydown', e => {
        if (!overlay.classList.contains('active')) return;
        if (e.key === 'ArrowRight') show(current + 1);
        if (e.key === 'ArrowLeft') show(current - 1);
        if (e.key === 'Escape') close();
    });
}

document.addEventListener('DOMContentLoaded', initZineLightbox);