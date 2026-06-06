// Sticky nav toggle and mobile menu
const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav-toggle');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Smooth scroll for internal links
document.addEventListener('click', (e) => {
  const target = e.target;
  if (target instanceof Element && target.matches('a[href^="#"]')) {
    const id = target.getAttribute('href');
    if (!id || id === '#') return;
    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
});

// Intersection-based reveal animations
const revealEls = document.querySelectorAll('.reveal-up');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const delay = entry.target.getAttribute('style')?.match(/--reveal-delay:\s*(\d+)ms/);
    if (entry.isIntersecting) {
      const ms = delay ? Number(delay[1]) : 0;
      setTimeout(() => entry.target.classList.add('is-visible'), ms);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach((el) => io.observe(el));

// Testimonials carousel
function initCarousel(root) {
  const track = root.querySelector('[data-carousel-track]');
  const slides = Array.from(track.children);
  const prev = root.querySelector('.prev');
  const next = root.querySelector('.next');
  const dotsRoot = root.querySelector('[data-carousel-dots]');
  let index = 0;
  let timer;

  function update() {
    const width = root.clientWidth;
    track.style.transform = `translateX(-${index * width}px)`;
    dotsRoot.querySelectorAll('button').forEach((b, i) => b.setAttribute('aria-current', String(i === index)));
  }

  function go(to) {
    index = (to + slides.length) % slides.length;
    update();
  }

  function autoplay() {
    clearInterval(timer);
    timer = setInterval(() => go(index + 1), 5000);
  }

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.addEventListener('click', () => { go(i); autoplay(); });
    dotsRoot.appendChild(dot);
  });

  prev.addEventListener('click', () => { go(index - 1); autoplay(); });
  next.addEventListener('click', () => { go(index + 1); autoplay(); });

  window.addEventListener('resize', update);
  update();
  autoplay();
}

document.querySelectorAll('[data-carousel]').forEach(initCarousel);

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear().toString();

// Basic contact form validation and UX (mock submission)
const form = document.querySelector('[data-contact]');
if (form) {
  const status = form.querySelector('.form-status');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = (formData.get('name') || '').toString().trim();
    const email = (formData.get('email') || '').toString().trim();
    const message = (formData.get('message') || '').toString().trim();

    if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      status.textContent = 'Please provide a valid name, email, and message.';
      return;
    }
    status.textContent = 'Sending…';
    await new Promise((r) => setTimeout(r, 900));
    status.textContent = 'Thanks! Your message has been sent.';
    form.reset();
  });
}


