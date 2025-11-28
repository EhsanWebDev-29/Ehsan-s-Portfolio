// =====================hamburger=========================

(() => {
  const menuBtn = document.querySelector(".menu-btn");
  const navbar = document.querySelector("#site-nav");
  if (!menuBtn || !navbar) return; // safety check

  function disableSlider() {
    navbar.dataset.visible = "false";
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.classList.remove("open");
  }

  function enableSlider() {
    navbar.dataset.visible = "true";
    menuBtn.setAttribute("aria-expanded", "true");
    menuBtn.classList.add("open");
  }

  menuBtn.addEventListener("click", () => {
    const isVisible = navbar.dataset.visible === "true";
    isVisible ? disableSlider() : enableSlider();
  });

  document.querySelectorAll(".primary-navigation a").forEach((link) => {
    link.addEventListener("click", disableSlider);
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") disableSlider();
  });

  document.querySelector("main").addEventListener("click", () => {
    disableSlider();
  });
})();

// ==========================theme-switch==========================

(() => {
  const themeSwitch = document.querySelector(".theme-switch");
  if (!themeSwitch) return;

  const darkMode = localStorage.getItem("dark-mode");

  function enableDarkMode() {
    document.body.classList.add("dark-mode");
    localStorage.setItem("dark-mode", "enabled");
  }

  function disableDarkMode() {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("dark-mode", "disabled");
  }

  // saving system prefrence
  if (
    darkMode === "enabled" ||
    (darkMode === null &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    enableDarkMode();
  }

  themeSwitch.addEventListener("click", () => {
    if (document.body.classList.contains("dark-mode")) {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
  });
})();

// ======================carousel==============================

const carouselTrack = document.querySelector(".carousel-track");

const slides = Array.from(document.querySelectorAll(".carousel-item"));
console.log(slides.length);

const indicators = Array.from(document.querySelectorAll(".indicator"));

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let index = 0;
let interval;

function updateSlides(i) {
  carouselTrack.style.transition = "transform 0.5s ease";
  carouselTrack.style.transform = `translateX(-${i * 100}%)`;
}

function updateIndicators(i) {
  indicators.forEach((indicator) => {
    indicator.classList.remove("active");
  });
  indicators[i].classList.add("active");
}

function startSliding() {
  stopSliding();
  interval = setInterval(() => {
    index++;

    if (index >= slides.length) {
      
      carouselTrack.style.transition = "none";
      carouselTrack.style.transform = "translateX(0)";
      index = 0;
      void carouselTrack.offsetWidth;
      carouselTrack.style.transition = "transform 0.5s ease";
    }

    updateIndicators(index);
    updateSlides(index);
  }, 4000);
}


function stopSliding() {
  clearInterval(interval);
}

function nextSlide() {
  nextBtn.addEventListener("click",()=>{
    if (index === slides.length-1) {
      index = 0;
    }else{
      index++;
    }

    updateIndicators(index);
    updateSlides(index);
  })
}

nextSlide();

function prevSlide() {
  prevBtn.addEventListener("click",()=>{
    if (index === 0) {
      index = slides.length -1;
    }else {
      index--;
    }

    updateIndicators(index);
    updateSlides(index);
  })
}

prevSlide();

startSliding();

carouselTrack.addEventListener("mouseenter", stopSliding);
carouselTrack.addEventListener("mouseleave", startSliding);

// ========================contact-form===============

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.querySelector("#fullname-input").value;
  const email = document.querySelector("#email-input").value;
  const phone = document.querySelector("#mobile-number-input").value;
  const message = document.querySelector("#message-input").value;

  const finalMessage = `
  Name: ${name}
  Email: ${email}
  Phone: ${phone}
  Message: ${message}
  `;

  const whatsappURL =
    "https://wa.me/917070002518?text=" + encodeURIComponent(finalMessage);

  window.open(whatsappURL, "_blank");
});
