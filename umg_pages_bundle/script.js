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

  if (heroMedia) {
    requestAnimationFrame(animateLoad);
  }

  updateHeader();
  updateHeroScale();

  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", handleScroll);

  const galleryImages = Array.from(document.querySelectorAll(".lightbox-image"));
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");

  if (
    galleryImages.length &&
    lightbox &&
    lightboxImg &&
    lightboxClose &&
    lightboxPrev &&
    lightboxNext
  ) {
    let currentImageIndex = 0;

    function openLightbox(index) {
      currentImageIndex = index;
      const img = galleryImages[currentImageIndex];

      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;

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
      currentImageIndex =
        (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
      openLightbox(currentImageIndex);
    }

    galleryImages.forEach((img, index) => {
      img.addEventListener("click", () => openLightbox(index));
      img.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openLightbox(index);
        }
      });
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
  }

  const filterPills = document.querySelectorAll(".filter-pill");
  const productSections = document.querySelectorAll(".product-section[data-group]");

  if (filterPills.length && productSections.length) {
    filterPills.forEach((pill) => {
      pill.addEventListener("click", () => {
        const selectedFilter = pill.dataset.filter;

        filterPills.forEach((item) => item.classList.remove("active"));
        pill.classList.add("active");

        productSections.forEach((section) => {
          const sectionGroup = section.dataset.group;
          const shouldShow =
            selectedFilter === "all" || sectionGroup === selectedFilter;

          section.classList.toggle("is-hidden", !shouldShow);
        });

        const firstVisibleSection = document.querySelector(
          ".product-section[data-group]:not(.is-hidden)"
        );

        if (firstVisibleSection) {
          const headerOffset = 110;
          const sectionTop =
            firstVisibleSection.getBoundingClientRect().top +
            window.pageYOffset -
            headerOffset;

          window.scrollTo({
            top: sectionTop,
            behavior: "smooth"
          });
        }
      });
    });
  }

  // ===== Slab gallery "View More" expand =====
  const slabToggle = document.getElementById("slabToggle");
  const slabGrid = document.getElementById("slabGrid");
  if (slabToggle && slabGrid) {
    slabToggle.addEventListener("click", () => {
      const expanded = slabGrid.classList.toggle("is-expanded");
      slabToggle.setAttribute("aria-expanded", expanded ? "true" : "false");
      const label = slabToggle.querySelector(".slab-toggle-label");
      if (label) label.textContent = expanded ? "View Fewer Slabs" : "View More Slabs";
      // When collapsing, scroll back to the gallery so user doesn't lose context
      if (!expanded) {
        const gallery = document.getElementById("slab-gallery");
        if (gallery) gallery.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  // ===== Vessel sink thumb → feature image swap =====
  const vesselFeature = document.getElementById("vesselFeatureImg");
  const vesselThumbs = document.querySelectorAll(".vessel-thumb-btn");
  if (vesselFeature && vesselThumbs.length) {
    vesselThumbs.forEach((btn) => {
      btn.addEventListener("click", () => {
        const src = btn.dataset.feature;
        if (!src) return;
        vesselFeature.src = src;
        const labelEl = btn.querySelector(".vessel-thumb-label");
        if (labelEl) vesselFeature.alt = labelEl.textContent.trim() + " vessel sink collection";
        vesselThumbs.forEach((b) => b.classList.toggle("is-active", b === btn));
      });
    });
  }

  // ===== Sale carousel (granite + vessel sinks) =====
  const saleCarousel = document.querySelector(".sale-carousel");
  const saleTrack = document.getElementById("saleTrack");
  if (saleCarousel && saleTrack) {
    const slides = saleTrack.querySelectorAll(".sale-slide");
    const dots = saleCarousel.querySelectorAll(".sale-dot");
    const prevBtn = saleCarousel.querySelector(".sale-prev");
    const nextBtn = saleCarousel.querySelector(".sale-next");
    const total = slides.length;
    const AUTOPLAY_MS = 8000;
    let current = 0;
    let timer = null;
    let paused = false;

    function update(idx) {
      current = (idx + total) % total;
      saleTrack.style.transform = `translateX(-${current * 100}%)`;
      slides.forEach((s, i) => s.classList.toggle("is-active", i === current));
      dots.forEach((d, i) => {
        d.classList.toggle("is-active", i === current);
        d.setAttribute("aria-selected", i === current ? "true" : "false");
      });
    }
    function next() { update(current + 1); }
    function prev() { update(current - 1); }
    function restartAutoplay() {
      if (timer) clearInterval(timer);
      if (!paused) timer = setInterval(next, AUTOPLAY_MS);
    }

    prevBtn?.addEventListener("click", () => { prev(); restartAutoplay(); });
    nextBtn?.addEventListener("click", () => { next(); restartAutoplay(); });
    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => { update(i); restartAutoplay(); });
    });

    // Pause on hover / focus within carousel
    saleCarousel.addEventListener("mouseenter", () => { paused = true; if (timer) clearInterval(timer); });
    saleCarousel.addEventListener("mouseleave", () => { paused = false; restartAutoplay(); });
    saleCarousel.addEventListener("focusin", () => { paused = true; if (timer) clearInterval(timer); });
    saleCarousel.addEventListener("focusout", (e) => {
      if (!saleCarousel.contains(e.relatedTarget)) {
        paused = false;
        restartAutoplay();
      }
    });

    // Keyboard arrows when carousel has focus
    saleCarousel.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { next(); restartAutoplay(); }
      else if (e.key === "ArrowLeft") { prev(); restartAutoplay(); }
    });

    // Respect prefers-reduced-motion: disable autoplay
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion) restartAutoplay();
  }

  // ===== Promo bar: pin header to top once user scrolls past =====
  const promoBar = document.querySelector(".promo-bar");
  if (promoBar) {
    const updatePromo = () => {
      const promoH = promoBar.offsetHeight;
      if (window.scrollY > promoH - 4) {
        document.body.classList.add("promo-hidden");
      } else {
        document.body.classList.remove("promo-hidden");
      }
    };
    window.addEventListener("scroll", updatePromo, { passive: true });
    window.addEventListener("resize", updatePromo);
    updatePromo();
  }

  // ===== Granite-sale swatch hover/focus preview =====
  const swatchChips = document.querySelectorAll(".swatch-chip");
  const swatchPreview = document.getElementById("swatchPreview");
  const swatchPreviewImg = document.getElementById("swatchPreviewImg");
  const swatchPreviewLabel = document.getElementById("swatchPreviewLabel");
  const graniteContent = document.querySelector(".granite-sale-content");

  if (swatchChips.length && swatchPreview && swatchPreviewImg && graniteContent) {
    const isMobile = () => window.matchMedia("(max-width: 720px)").matches;

    function openPreview(chip) {
      const src = chip.dataset.swatch;
      if (!src) return;
      // Build a clean label from the chip text (strip count badge)
      const labelText = chip.cloneNode(true);
      const badge = labelText.querySelector("span");
      if (badge) badge.remove();
      const label = labelText.textContent.trim();

      swatchPreviewImg.src = src;
      swatchPreviewImg.alt = label + " granite swatch";
      swatchPreviewLabel.textContent = label;
      swatchPreview.classList.add("is-open");
      swatchPreview.setAttribute("aria-hidden", "false");
      chip.classList.add("is-active");

      if (!isMobile()) {
        // Position relative to .granite-sale-content (the chip's positioning ancestor)
        const containerRect = graniteContent.getBoundingClientRect();
        const chipRect = chip.getBoundingClientRect();
        const previewW = swatchPreview.offsetWidth;
        const previewH = swatchPreview.offsetHeight;
        const containerW = graniteContent.offsetWidth;

        // Center under the chip; clamp to container
        let left = (chipRect.left - containerRect.left) + (chip.offsetWidth / 2) - (previewW / 2);
        left = Math.max(0, Math.min(left, containerW - previewW));

        const top = (chipRect.bottom - containerRect.top) + 12;
        swatchPreview.style.left = left + "px";
        swatchPreview.style.top = top + "px";
      } else {
        swatchPreview.style.left = "";
        swatchPreview.style.top = "";
      }
    }

    function closePreview(chip) {
      swatchPreview.classList.remove("is-open");
      swatchPreview.setAttribute("aria-hidden", "true");
      if (chip) chip.classList.remove("is-active");
    }

    swatchChips.forEach((chip) => {
      // Desktop hover
      chip.addEventListener("mouseenter", () => openPreview(chip));
      chip.addEventListener("mouseleave", () => closePreview(chip));
      // Keyboard focus
      chip.addEventListener("focus", () => openPreview(chip));
      chip.addEventListener("blur", () => closePreview(chip));
      // Touch / click toggle (mobile)
      chip.addEventListener("click", () => {
        if (chip.classList.contains("is-active")) {
          closePreview(chip);
        } else {
          // Close any other open chip first
          document.querySelectorAll(".swatch-chip.is-active").forEach((c) => closePreview(c));
          openPreview(chip);
        }
      });
    });

    // Tap outside preview to dismiss on mobile
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".swatch-chip") && !e.target.closest(".swatch-preview")) {
        document.querySelectorAll(".swatch-chip.is-active").forEach((c) => closePreview(c));
      }
    });

    // Recompute on resize while open
    window.addEventListener("resize", () => {
      const active = document.querySelector(".swatch-chip.is-active");
      if (active) openPreview(active);
    });
  }
});