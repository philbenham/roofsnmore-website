(function () {
  var toggle = document.querySelector('.rnm-nav-toggle');
  var nav = document.querySelector('.rnm-nav');
  if (!toggle || !nav) return;
  var dropdowns = Array.prototype.slice.call(nav.querySelectorAll('.nav-dropdown'));

  // Hamburger open/close
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? '✕' : '☰';
    if (!open) {
      dropdowns.forEach(function (d) {
        d.classList.remove('open');
        var p = d.querySelector('.dropdown-panel');
        if (p) p.style.display = 'none';
      });
    }
  });

  // Each dropdown: hover on desktop, click to toggle on mobile
  var triggers = [];
  dropdowns.forEach(function (dd) {
    var trigger = dd.querySelector(':scope > a');
    var panel = dd.querySelector('.dropdown-panel');
    if (!trigger || !panel) return;
    triggers.push(trigger);

    var timer;
    function show() { clearTimeout(timer); panel.style.display = 'block'; }
    function hide() { timer = setTimeout(function () { panel.style.display = 'none'; }, 80); }
    dd.addEventListener('mouseenter', show);
    dd.addEventListener('mouseleave', hide);
    panel.addEventListener('mouseenter', show);
    panel.addEventListener('mouseleave', hide);

    trigger.addEventListener('click', function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        var open = dd.classList.toggle('open');
        panel.style.display = open ? 'block' : 'none';
      } else if (trigger.getAttribute('href') === '#') {
        e.preventDefault();
      }
    });
  });

  // Close nav when a non-trigger link is clicked
  nav.addEventListener('click', function (e) {
    var link = e.target.closest('a');
    if (link && triggers.indexOf(link) === -1) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
    }
  });
})();
