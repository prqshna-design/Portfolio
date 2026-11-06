
// Dark and light mode
const themeButton = document.getElementById("themeToggle");

themeButton.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");

  themeButton.textContent = isDark ? "☀" : "☾";

  themeButton.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );

  localStorage.setItem("portfolioTheme", isDark ? "dark" : "light");
});

// Remember the selected theme
const savedTheme = localStorage.getItem("portfolioTheme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeButton.textContent = "☀";
  themeButton.setAttribute("aria-label", "Switch to light mode");
}

// Reveal sections while scrolling
const revealItems = document.querySelectorAll(
  ".hero-text, .camera-area, .content-section"
);

revealItems.forEach(function (item) {
  item.classList.add("reveal");
});

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

revealItems.forEach(function (item) {
  observer.observe(item);
});

// Automatic current year
document.getElementById("year").textContent =
  new Date().getFullYear();
