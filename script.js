// ─── Navbar Scroll Effect ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ─── Mobile Navigation ───
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const mobileNavClose = document.getElementById('mobileNavClose');

menuToggle.addEventListener('click', () => mobileNav.classList.add('open'));
mobileNavClose.addEventListener('click', () => mobileNav.classList.remove('open'));
function closeMobileNav() { mobileNav.classList.remove('open'); }

// ─── Gallery Filter ───
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    galleryItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = 'block';
        setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 50);
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        setTimeout(() => { item.style.display = 'none'; }, 400);
      }
    });
  });
});

// ─── Scroll Animations ───
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ─── Smooth Scroll for anchor links ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const pos = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    }
  });
});

// ─── Booking Form Handler ───
function handleBooking(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = 'Sending...';
  btn.style.opacity = '0.7';
  setTimeout(() => {
    btn.textContent = '✓ Request Sent!';
    btn.style.opacity = '1';
    btn.style.background = '#4a7c59';
    btn.style.color = '#fff';
    form.reset();
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.style.color = '';
    }, 3000);
  }, 1500);
}

// ─── Set minimum booking date to today ───
const dateInput = document.getElementById('bkDate');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
}
