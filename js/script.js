/* =====================================================
   MUHAMMAD DAFFA — PORTFOLIO SCRIPT
===================================================== */

/* ---------- PRELOADER ---------- */
const preloader = document.getElementById("preloader");
window.addEventListener("load", () => {
    setTimeout(() => preloader.classList.add("hide"), 450);
});
// jaring pengaman kalau load tidak pernah selesai
setTimeout(() => preloader.classList.add("hide"), 3500);

/* ---------- HEADER / MENU ---------- */
const menuIcon = document.getElementById("menu-icon");
const navbar   = document.getElementById("navbar");
const header   = document.getElementById("header");

menuIcon.addEventListener("click", () => {
    navbar.classList.toggle("active");
    menuIcon.classList.toggle("fa-xmark");
    menuIcon.classList.toggle("fa-bars");
});

navbar.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navbar.classList.remove("active");
        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");
    });
});

/* ---------- SCROLL: header, progress, to-top, active nav ---------- */
const scrollProgress = document.getElementById("scroll-progress");
const toTop           = document.getElementById("to-top");
const navLinks        = [...navbar.querySelectorAll("a")];
const sections        = navLinks
    .map(a => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

function onScroll() {
    const y = window.scrollY;

    // header
    header.classList.toggle("scrolled", y > 30);

    // progress bar
    const max = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";

    // to top
    toTop.classList.toggle("show", y > 550);

    // active nav
    let current = "";
    sections.forEach(sec => {
        if (y >= sec.offsetTop - 160) current = sec.id;
    });
    navLinks.forEach(a => {
        a.classList.toggle("active", a.getAttribute("href") === "#" + current);
    });
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- SCROLL REVEAL ---------- */
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.14, rootMargin: "0px 0px -60px 0px" });

    revealEls.forEach((el, i) => {
        // jeda kecil antar elemen biar tidak muncul serentak
        el.style.transitionDelay = (i % 4) * 90 + "ms";
        revealObserver.observe(el);
    });
} else {
    revealEls.forEach(el => el.classList.add("in"));
}

/* ---------- SKILL BAR ---------- */
const progressBars = document.querySelectorAll(".progress");

if ("IntersectionObserver" in window) {
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                bar.style.width = bar.dataset.width + "%";
                barObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => barObserver.observe(bar));
} else {
    progressBars.forEach(bar => bar.style.width = bar.dataset.width + "%");
}

/* ---------- COUNTER ---------- */
const counters = document.querySelectorAll(".counter");

function runCounter(el) {
    const target = +el.dataset.target;
    const dur    = 1600;
    const start  = performance.now();

    function tick(now) {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
        el.textContent = Math.round(target * eased);
        if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

if ("IntersectionObserver" in window) {
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runCounter(entry.target);
                countObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });

    counters.forEach(c => countObserver.observe(c));
} else {
    counters.forEach(c => (c.textContent = c.dataset.target));
}

/* ---------- TYPING EFFECT ---------- */
const typedEl = document.getElementById("typed");
const words = [
    "Graphic Designer",
    "Internet Technician",
    "Freelancer",
    "Web Developer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
    const word = words[wordIndex];

    typedEl.textContent = deleting
        ? word.slice(0, --charIndex)
        : word.slice(0, ++charIndex);

    let delay = deleting ? 45 : 95;

    if (!deleting && charIndex === word.length) {
        delay = 1900;          // tahan sejenak
        deleting = true;
    } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 320;
    }

    setTimeout(type, delay);
}

const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (prefersReduced) {
    typedEl.textContent = words[0];
} else {
    type();
}

/* ---------- FOOTER YEAR ---------- */
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- EMAILJS CONTACT FORM ---------- */
try {
    emailjs.init("SJ70N4sQOA7hLTaYO");
} catch (e) {
    console.log("EmailJS init:", e);
}

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const btn = this.querySelector(".submit-btn");
    const original = btn.innerHTML;
    btn.classList.add("loading");
    btn.innerHTML = '<span>Mengirim...</span><i class="fa-solid fa-circle-notch fa-spin"></i>';

    emailjs
        .sendForm("service_7lm9mti", "template_3x52nec", this)
        .then(() => {
            alert("Pesan berhasil dikirim! Terima kasih.");
            contactForm.reset();
        })
        .catch((error) => {
            console.log(error);
            alert(error.text || error.message || JSON.stringify(error));
        })
        .finally(() => {
            btn.classList.remove("loading");
            btn.innerHTML = original;
        });
});
