(() => {
  const phone = '593992760751';
  document.querySelectorAll('[data-wa]').forEach((link) => {
    const message = link.dataset.wa || 'Hola, quisiera información sobre los servicios de Cyber Sin Límite.';
    link.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  });

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
      nav.classList.toggle('is-open', !isOpen);
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menú');
      nav.classList.remove('is-open');
    }));
  }
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();

  const visitCount = document.querySelector('#visit-count');
  if (visitCount) {
    try {
      const storageKey = 'cyber-sinlimite-visits';
      const visits = Number.parseInt(localStorage.getItem(storageKey) || '0', 10) + 1;
      localStorage.setItem(storageKey, String(visits));
      visitCount.textContent = new Intl.NumberFormat('es-EC').format(visits);
    } catch {
      visitCount.textContent = '—';
    }
  }
})();
