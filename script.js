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

  // Vuelo de bienvenida de una sola pasada. La capa no captura clics.
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reducedMotion) {
    const layer = document.createElement('div');
    layer.className = 'bat-flight-layer';
    layer.setAttribute('aria-hidden', 'true');
    document.body.append(layer);

    const batShape = '<svg viewBox="0 0 64 42" aria-hidden="true"><path fill="currentColor" d="M32 12c-5-9-14-11-23-10l4 11C7 8 3 8 0 9l5 18 12-5c3 8 8 13 15 16 7-3 12-8 15-16l12 5 5-18c-3-1-7-1-13 4l4-11c-9-1-18 1-23 10Z"/></svg>';
    const starts = [
      {x:-7,y:18,dx:70,dy:48}, {x:105,y:16,dx:-72,dy:58},
      {x:-6,y:58,dx:66,dy:-34}, {x:104,y:67,dx:-68,dy:-45},
      {x:48,y:-8,dx:-30,dy:82}, {x:57,y:105,dx:32,dy:-88},
      {x:2,y:38,dx:88,dy:5}, {x:98,y:44,dx:-86,dy:-10}
    ];
    starts.forEach((flight, index) => {
      const bat = document.createElement('span');
      bat.className = 'welcome-bat';
      bat.innerHTML = batShape;
      bat.style.left = `${flight.x}vw`;
      bat.style.top = `${flight.y}vh`;
      bat.style.setProperty('--dx', `${flight.dx}vw`);
      bat.style.setProperty('--dy', `${flight.dy}vh`);
      bat.style.setProperty('--turn', `${index % 2 ? -24 : 24}deg`);
      bat.style.setProperty('--duration', `${4.1 + (index % 3) * .45}s`);
      bat.style.animationDelay = `${index * .12}s`;
      layer.append(bat);
    });
    window.setTimeout(() => layer.remove(), 6500);
  }
})();
