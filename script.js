document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("nav a[href^='#']");
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  const sections = document.querySelectorAll("section");
  const options = {
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const link = document.querySelector(`nav a[href="#${id}"]`);
      if (entry.isIntersecting) {
        navLinks.forEach((l) => l.classList.remove("active"));
        if (link) link.classList.add("active");
      }
    });
  }, options);

  sections.forEach((section) => {
    observer.observe(section);
  });

  const animatedSections = document.querySelectorAll("section");
  animatedSections.forEach((section) => {
    section.style.opacity = 0;
    section.style.transform = "translateY(40px)";
  });

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.transition = "opacity 1s ease, transform 1s ease";
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.2 }
  );

  animatedSections.forEach((section) => {
    fadeObserver.observe(section);
  });

  document.querySelectorAll(".fade-in").forEach((el) => {
    el.classList.remove("visible"); // Ensure not visible on load
  });

  const fadeEls = document.querySelectorAll(".fade-in");
  const fadeInObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          fadeInObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  fadeEls.forEach((el) => fadeInObserver.observe(el));

  // Typing effect for headline
  const headline = document.getElementById("typed-headline");
  if (headline) {
    const text = "HelloWorld();// I'm Tanatswa";
    headline.textContent = "";
    let i = 0;
    function type() {
      if (i < text.length) {
        headline.textContent += text.charAt(i);
        i++;
        setTimeout(type, 80); // Adjust speed as desired
      }
    }
    type();
  }
});

document.querySelectorAll(".accordion-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    // Close all other accordions
    document.querySelectorAll(".accordion-btn").forEach((otherBtn) => {
      if (otherBtn !== btn) {
        otherBtn.classList.remove("active");
        const otherPanel = otherBtn.nextElementSibling;
        if (otherPanel) otherPanel.classList.remove("open");
      }
    });

    btn.classList.toggle("active");
    const panel = btn.nextElementSibling;
    if (panel) panel.classList.toggle("open");
  });
});
