
// Shared interactions for the lavender digital-camera portfolio.
const toast = (message) => {
  let node = document.querySelector('.toast');
  if (!node) { node = document.createElement('div'); node.className = 'toast'; document.body.appendChild(node); }
  node.textContent = message; node.classList.add('show');
  clearTimeout(window.toastTimer); window.toastTimer = setTimeout(() => node.classList.remove('show'), 2200);
};

// Reveal cards as they enter the screen.
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Typing animation on the home page.
const typing = document.querySelector('[data-typing]');
if (typing) {
  const words = ['Computer Engineering Student', 'Future Developer', 'Creative Problem Solver'];
  let word = 0, letter = 0, deleting = false;
  const type = () => {
    const current = words[word];
    typing.textContent = current.slice(0, letter);
    if (!deleting && letter < current.length) letter++;
    else if (deleting && letter > 0) letter--;
    else { deleting = !deleting; if (!deleting) word = (word + 1) % words.length; }
    setTimeout(type, deleting ? 45 : 85);
  };
  type();
}

// Camera shutter flash effect.
document.querySelectorAll('[data-shutter]').forEach(button => button.addEventListener('click', () => {
  const flash = document.querySelector('.flash');
  if (flash) { flash.classList.remove('active'); void flash.offsetWidth; flash.classList.add('active'); }
  toast('📸 Click! A new memory captured.');
}));

// Animate skill bars only when visible.
const skillSection = document.querySelector('[data-skills]');
if (skillSection) {
  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillSection.querySelectorAll('.bar span').forEach(bar => bar.style.width = bar.dataset.level + '%');
        skillObserver.disconnect();
      }
    });
  }, { threshold: .2 });
  skillObserver.observe(skillSection);
}

// Project gallery category filters.
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
  button.classList.add('active');
  const filter = button.dataset.filter;
  document.querySelectorAll('[data-category]').forEach(card => {
    card.hidden = filter !== 'all' && card.dataset.category !== filter;
  });
}));

// Simple project detail popups.
document.querySelectorAll('[data-details]').forEach(button => button.addEventListener('click', () => {
  const card = button.closest('.project-card');
  const title = card.querySelector('h3')?.textContent || 'Project';
  const description = card.querySelector('[data-description]')?.textContent || 'A university project in my learning journey.';
  toast(title + ': ' + description);
}));

// Contact form: client-side validation and mail app handoff.
const contactForm = document.querySelector('#contact-form');
if (contactForm) contactForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;
  const name = contactForm.elements.name.value.trim();
  const email = contactForm.elements.email.value.trim();
  const message = contactForm.elements.message.value.trim();
  const subject = encodeURIComponent('Portfolio message from ' + name);
  const body = encodeURIComponent('From: ' + name + ' (' + email + ')\\n\\n' + message);
  toast('Opening your email app…');
  window.location.href = `mailto:YOUR_EMAIL@example.com?subject=${subject}&body=${body}`;
});

// Current year.
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
