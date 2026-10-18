const topbar = document.querySelector("[data-topbar]");
const menuButton = document.querySelector("[data-menu-button]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const menuClose = document.querySelector("[data-menu-close]");

if (topbar) {
  const updateTopbar = () => {
    topbar.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  updateTopbar();
  window.addEventListener("scroll", updateTopbar, { passive: true });
}

if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", () => mobileMenu.classList.add("open"));
}

if (menuClose && mobileMenu) {
  menuClose.addEventListener("click", () => mobileMenu.classList.remove("open"));
}

document.querySelectorAll("[data-mobile-menu] a").forEach((link) => {
  link.addEventListener("click", () => mobileMenu?.classList.remove("open"));
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 78;
    window.scrollTo({ top, behavior: "smooth" });
  });
});

document.querySelectorAll("[data-gallery]").forEach((gallery) => {
  const buttons = gallery.querySelectorAll("[data-filter]");
  const items = gallery.querySelectorAll("[data-category]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      buttons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      items.forEach((item) => {
        item.classList.toggle("is-hidden", filter !== "all" && item.dataset.category !== filter);
      });
    });
  });
});

const today = new Date().toISOString().split("T")[0];
document.querySelectorAll('input[type="date"]').forEach((input) => {
  input.min = today;
});

document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    if (!button) return;
    const originalText = button.textContent;
    button.textContent = "Request sent";
    button.disabled = true;
    form.reset();

    window.setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, 2400);
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
);

document.querySelectorAll(".fade-up, .reveal-img").forEach((element) => observer.observe(element));
