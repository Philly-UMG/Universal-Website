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