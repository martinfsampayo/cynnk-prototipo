/* Cynnk · prototipo navegable: escala, pistas de zonas clicables y dock */
(function () {
  var body = document.body;
  var W = +body.dataset.w, H = +body.dataset.h;
  var app = body.classList.contains('mode-app');
  var device = document.querySelector('.device');

  function fit() {
    var vw = window.innerWidth, vh = window.innerHeight, s;
    if (app) {
      var full = vw <= 520;
      body.classList.toggle('full', full);
      if (full) {
        s = vw / 390;
        device.style.setProperty('--dev-h', Math.ceil(vh / s) + 'px');
      } else {
        s = Math.min(1, (vh - 64) / 844);
        device.style.setProperty('--dev-h', '844px');
      }
    } else {
      s = document.documentElement.clientWidth / W;
    }
    document.documentElement.style.setProperty('--s', s.toFixed(4));
  }
  fit();
  window.addEventListener('resize', fit);

  // Igual que Figma: al hacer clic fuera de un enlace se resaltan las zonas clicables
  var stuck = false, timer;
  function flash() {
    if (stuck) return;
    body.classList.add('hinting');
    clearTimeout(timer);
    timer = setTimeout(function () { body.classList.remove('hinting'); }, 700);
  }
  document.querySelector('.viewport').addEventListener('click', function (e) {
    if (!e.target.closest('.hs')) flash();
  });

  // Dock
  var toggle = document.querySelector('.dock-toggle');
  var panel = document.getElementById('dock-panel');
  toggle.addEventListener('click', function () {
    var open = panel.hidden;
    panel.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    if (open) { var on = panel.querySelector('a.on'); if (on) on.scrollIntoView({ block: 'nearest' }); }
  });
  document.addEventListener('click', function (e) {
    if (!panel.hidden && !e.target.closest('.dock')) { panel.hidden = true; toggle.setAttribute('aria-expanded', 'false'); }
  });
  var hintBtn = document.querySelector('.dock-hints');
  function setStuck(v) {
    stuck = v;
    body.classList.toggle('hinting', v);
    hintBtn.setAttribute('aria-pressed', String(v));
    hintBtn.textContent = v ? 'Ocultar zonas clicables' : 'Mostrar zonas clicables';
    try { sessionStorage.setItem('cynnk-hints', v ? '1' : ''); } catch (e) {}
  }
  hintBtn.addEventListener('click', function () { setStuck(!stuck); });
  try { if (sessionStorage.getItem('cynnk-hints')) setStuck(true); } catch (e) {}
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { panel.hidden = true; toggle.setAttribute('aria-expanded', 'false'); }
    if ((e.key === 'h' || e.key === 'H') && !e.metaKey && !e.ctrlKey) setStuck(!stuck);
  });
})();
