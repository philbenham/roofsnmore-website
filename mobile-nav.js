(function () {
  var toggle = document.querySelector('.rnm-nav-toggle');
  var nav = document.querySelector('.rnm-nav');
  var svcDropdown = document.getElementById('svc-dropdown');
  var svcPanel = document.getElementById('svc-panel');
  var svcTrigger = document.getElementById('svc-trigger');

  if (!toggle || !nav) return;

  // Hamburger open/close
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? '\u2715' : '\u2630';
    if (!open && svcDropdown) svcDropdown.classList.remove('open');
  });

  // Services dropdown: click to toggle on mobile, leave hover for desktop
  if (svcTrigger && svcPanel && svcDropdown) {
    svcTrigger.addEventListener('click', function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        var open = svcDropdown.classList.toggle('open');
        svcPanel.style.display = open ? 'block' : 'none';
      }
    });
  }

  // Close nav when a link is clicked (except the services toggle)
  nav.addEventListener('click', function (e) {
    var link = e.target.closest('a');
    if (link && link !== svcTrigger) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '\u2630';
    }
  });
})();
