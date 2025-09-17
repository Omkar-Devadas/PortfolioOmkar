// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  });
});

// ===== Mobile Navbar Toggle =====
const nav = document.querySelector(".nav-links");
const hamburger = document.createElement("div");
hamburger.classList.add("hamburger");
hamburger.setAttribute("aria-label", "Toggle navigation");
hamburger.setAttribute("role", "button");
hamburger.setAttribute("tabindex", "0");
hamburger.innerHTML = "☰";
document.querySelector(".navbar").appendChild(hamburger);

const toggleMenu = () => nav.classList.toggle("active");
hamburger.addEventListener("click", toggleMenu);
hamburger.addEventListener("keypress", (e) => { if (e.key === "Enter") toggleMenu(); });

// ===== Header scrolled style =====
const header = document.querySelector('header');
const updateHeader = () => {
  if (window.scrollY > 10) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
};
window.addEventListener('scroll', updateHeader);
updateHeader();

// ===== Active link highlighting =====
const sections = Array.from(document.querySelectorAll('section[id]'));
const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
const setActiveLink = () => {
  const scrollPos = window.scrollY + 120;
  let currentId = '';
  for (const sec of sections) {
    if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
      currentId = sec.id; break;
    }
  }
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${currentId}`));
};
window.addEventListener('scroll', setActiveLink);
setActiveLink();

// ===== Theme Toggle (with persistence) =====
const themeToggle = document.getElementById("theme-toggle");
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');

const applyTheme = (theme) => {
  document.body.setAttribute('data-theme', theme);
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
};

applyTheme(savedTheme ? savedTheme : (prefersDark ? 'dark' : 'light'));

themeToggle.addEventListener('click', () => {
  const next = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('theme', next);
});

// ===== Reveal on Scroll =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
