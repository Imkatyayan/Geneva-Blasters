/* =========================================================
   THEME TOGGLE
========================================================= */

const html = document.documentElement;
const toggle = document.getElementById("themeToggle");

/* SAVED THEME */
const savedTheme = localStorage.getItem("gb-theme");

/* DEFAULT THEME */
if(savedTheme) {
  html.setAttribute("data-theme", savedTheme);
} else {
  html.setAttribute("data-theme", "dark");
}

/* TOGGLE */
toggle.addEventListener("click", () => {
  const current = html.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", next);
  localStorage.setItem("gb-theme", next);
});

/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach(el => revealObserver.observe(el));

/* =========================================================
   COUNTER ANIMATION
========================================================= */

function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  let current = 0;
  const increment = target / 80;

  const timer = setInterval(() => {
    current += increment;
    if(current >= target){
      current = target;
      clearInterval(timer);
    }
    el.innerText = Math.floor(current);
  }, 20);
}

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

counters.forEach(counter => counterObserver.observe(counter));

/* =========================================================
   JOIN FORM
========================================================= */

function handleJoin(button) {
  const input = button.previousElementSibling;
  const email = input.value.trim();

  if(!email.includes("@")){
    input.focus();
    return;
  }

  button.innerText = "✓ You're on the list!";
  input.value = "";

  setTimeout(() => {
    button.innerText = "Join Now";
  }, 3000);
}

/* =========================================================
   MOBILE MENU
========================================================= */

const mobileBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.querySelector(".nav-links");

mobileBtn.addEventListener("click", () => {
  navLinks.classList.toggle("mobile-open");
});

/* =========================================================
   SCROLL TO TOP BUTTON
========================================================= */

const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  // Show the button if the user scrolls down more than 300px
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

scrollTopBtn.addEventListener("click", () => {
  // Smoothly scroll back to the top
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});