// Theme toggle
(function () {
  const toggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  const saved = localStorage.getItem('theme');
  if (saved) {
    html.setAttribute('data-theme', saved);
  }

  toggle.addEventListener('click', function () {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
})();

// Typewriter effect
(function () {
  const el = document.querySelector('.typewriter');
  if (!el) return;

  const texts = JSON.parse(el.dataset.texts || '["一个热爱编程的开发者", "全栈工程师 & 开源爱好者"]');
  let i = 0;
  let j = 0;
  let forward = true;
  let timer;

  function tick() {
    const current = texts[i];

    if (forward) {
      j++;
      if (j > current.length) {
        forward = false;
        timer = setTimeout(tick, 1500);
        return;
      }
    } else {
      j--;
      if (j === 0) {
        forward = true;
        i = (i + 1) % texts.length;
        timer = setTimeout(tick, 300);
        return;
      }
    }

    el.textContent = current.slice(0, j);
    timer = setTimeout(tick, forward ? 80 : 40);
  }

  tick();
})();

// Scroll reveal (Intersection Observer)
(function () {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('section').forEach(function (section) {
    section.classList.add('reveal');

    var h2 = section.querySelector('h2');
    if (h2) h2.classList.add('reveal');

    var cards = section.querySelectorAll('.project-card, .skill-tag');
    cards.forEach(function (card, idx) {
      card.classList.add('reveal');
      card.style.transitionDelay = (idx * 0.05) + 's';
    });

    var paragraphs = section.querySelectorAll('p');
    paragraphs.forEach(function (p) {
      p.classList.add('reveal');
    });

    observer.observe(section);
  });
})();
