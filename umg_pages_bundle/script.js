document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.querySelector(".site-nav");
  const header = document.querySelector(".site-header");
  const hero = document.querySelector(".hero");
  const heroMedia = document.querySelector(".hero-media");

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
      siteNav.classList.toggle("open");
    });

    document.querySelectorAll(".site-nav a").forEach((link) => {
      link.addEventListener("click", () => {
        siteNav.classList.remove("open");
      });
    });
  }

  let loadStart = null;
  const loadDuration = 1800;
  let loadScale = 1.2;

  function animateLoad(timestamp) {
    if (!heroMedia) return;

    if (!loadStart) loadStart = timestamp;

    const elapsed = timestamp - loadStart;
    const progress = Math.min(elapsed / loadDuration, 1);

    loadScale = 1.2 - (1.2 - 1.08) * progress;
    updateHeroScale();

    if (progress < 1) {
      requestAnimationFrame(animateLoad);
    }
  }

  function updateHeroScale() {
    if (!hero || !heroMedia) return;

    const scrollProgress = Math.min(window.scrollY / hero.offsetHeight, 1);
    const scrollScaleReduction = 0.2 * scrollProgress;
    const finalScale = loadScale - scrollScaleReduction;

    heroMedia.style.transform = `scale(${finalScale})`;
  }

  function updateHeader() {
    if (!header) return;

    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  function handleScroll() {
    updateHeader();
    updateHeroScale();
  }

  requestAnimationFrame(animateLoad);
  updateHeader();
  updateHeroScale();

  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", handleScroll);
});

const galleryImages = Array.from(document.querySelectorAll(".lightbox-image"));
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let currentImageIndex = 0;

function openLightbox(index) {
  currentImageIndex = index;
  const img = galleryImages[currentImageIndex];

  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCaption.textContent = img.alt;

  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
}

function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  openLightbox(currentImageIndex);
}

function showPrevImage() {
  currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  openLightbox(currentImageIndex);
}

galleryImages.forEach((img, index) => {
  img.addEventListener("click", () => openLightbox(index));
});

lightboxClose.addEventListener("click", closeLightbox);
lightboxNext.addEventListener("click", showNextImage);
lightboxPrev.addEventListener("click", showPrevImage);

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;

  if (e.key === "Escape") {
    closeLightbox();
  } else if (e.key === "ArrowRight") {
    showNextImage();
  } else if (e.key === "ArrowLeft") {
    showPrevImage();
  }
});