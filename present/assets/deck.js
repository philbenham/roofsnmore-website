(function () {
  'use strict';
  var C = window.REVITALIZE_CONFIG;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var STEP_NAMES = { 5: 'Company Credibility', 6: 'Product Demo', 7: 'Cost vs. Value', 8: 'Final Bridge', 9: 'Close', 10: 'Cool Down' };
  var slides = $$('.slide');
  var cur = 0;
  var fmt = function (n) { return '$' + Math.round(n).toLocaleString('en-US'); };
  var fmt2 = function (n) { return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }); };

  // ---------------- state ----------------
  var S = {
    brand: null, color: '', pkg: 'Premier', pkgChosen: false,
    squares: 30, stories: Object.keys(C.STORIES)[0], shape: Object.keys(C.SHAPE)[0], ply: 0,
    disc: {}, promo: {}, revealed: false, house: 'now',
    roofStep: 0, roofTie: false, shownTotal: null
  };

  // ---------------- pricing (mirrors RehashHero funnel computeRange) ----------------
  function round(v) { var b = C.ROUND_TO || 100; return v <= 0 ? 0 : Math.round(v / b) * b; }
  function price() {
    var P = C.PACKAGES[S.pkg];
    var sq = Math.max(0, +S.squares || 0) * (1 + (C.WASTE_PCT || 0));
    var rate = C.RATE_POINT === 'high' ? P.materialsHighPerSq : P.materialsLowPerSq;
    var shape = C.SHAPE[S.shape] || 1, stories = C.STORIES[S.stories] || 1;
    var mat = round(sq * rate * shape), lab = round(sq * C.LABOR_PER_SQ * stories * shape);
    var base = Math.max(C.MINIMUM_PRICE || 0, mat + lab);
    var ply = Math.max(0, S.ply | 0) * C.PLYWOOD_PER_SHEET;
    var disc = 0, discLines = [];
    Object.keys(C.DISCOUNTS).forEach(function (k) { if (S.disc[k]) { disc += C.DISCOUNTS[k].amount; discLines.push([C.DISCOUNTS[k].label + ' discount', -C.DISCOUNTS[k].amount, C.DISCOUNTS[k].placeholder]); } });
    var promo = 0, promoLines = [];
    ['initialVisit', 'marketing'].forEach(function (k) { if (S.promo[k]) { promo += C.PROMOS[k].amount; promoLines.push([C.PROMOS[k].label, -C.PROMOS[k].amount, C.PROMOS[k].placeholder]); } });
    var total = Math.max(0, base + ply - disc - promo);
    return { base: base, ply: ply, disc: disc, promo: promo, total: total, preTotal: Math.max(0, base + ply - disc), monthly: monthly(total), discLines: discLines, promoLines: promoLines, sqEff: sq };
  }
  function monthly(p) { var r = C.FINANCE.aprPct / 100 / 12, n = C.FINANCE.months; if (p <= 0) return 0; return r === 0 ? p / n : p * r / (1 - Math.pow(1 + r, -n)); }

  var animRaf = 0;
  function animateTo(target) {
    var from = S.shownTotal == null ? target : S.shownTotal; var t0 = performance.now(), dur = Math.min(1600, 400 + Math.abs(target - from) / 4);
    cancelAnimationFrame(animRaf);
    (function tick(t) {
      var k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3), v = from + (target - from) * e;
      S.shownTotal = v;
      var txt = fmt(v), mtxt = fmt2(Math.round(monthly(v)));
      $('#pTotal').textContent = txt; $('#pMonthly').textContent = mtxt;
      $$('.pTotalMirror').forEach(function (el) { el.textContent = txt; }); $$('.pMonthlyMirror').forEach(function (el) { el.textContent = mtxt; });
      if (k < 1) animRaf = requestAnimationFrame(tick);
    })(t0);
  }
  var ptcTag = '<span class="ptc">placeholder · PHIL TO CONFIRM</span>';
  function renderPrice(animate) {
    var p = price();
    var rows = [['Roof system · ' + S.pkg + ' (' + (+S.squares || 0) + ' sq + ' + Math.round(C.WASTE_PCT * 100) + '% waste)', p.base]];
    if (p.ply) rows.push(['Extra plywood · ' + S.ply + ' × $' + C.PLYWOOD_PER_SHEET + ' installed', p.ply]);
    p.discLines.concat(p.promoLines).forEach(function (l) { rows.push([l[0] + (l[2] ? ' ' + ptcTag : ''), l[1]]); });
    $('#pBreak').innerHTML = rows.map(function (r) { return '<span>' + r[0] + '</span><b class="' + (r[1] < 0 ? 'neg' : '') + '">' + (r[1] < 0 ? '−' + fmt(-r[1]) : fmt(r[1])) + '</b>'; }).join('');
    $('#pFin').textContent = 'Monthly shown on ' + C.FINANCE.plan + ' · ' + C.FINANCE.aprPct + '% APR · ' + C.FINANCE.months + ' months, subject to credit approval.';
    $('#plyNote').textContent = S.pkg + ' includes ' + C.PACKAGES[S.pkg].plywoodIncluded + ' sheets. Extra sheets beyond that are $' + C.PLYWOOD_PER_SHEET + ' installed per sheet.';
    if (animate === false || S.shownTotal == null) { S.shownTotal = p.total; animateTo(p.total); } else animateTo(p.total);
    $('#pr1Was').textContent = S.promo.initialVisit ? fmt(p.preTotal) : '';
    $('#pr2Was').textContent = S.promo.marketing ? fmt(p.preTotal - (S.promo.initialVisit ? C.PROMOS.initialVisit.amount : 0)) : '';
    $$('[data-promoamt]').forEach(function (el) { var k = el.getAttribute('data-promoamt'), pr = C.PROMOS[k]; el.innerHTML = S.promo[k] ? (pr.label + ': −' + fmt(pr.amount) + (pr.placeholder ? ' ' + ptcTag : '')) : ''; });
    $$('.apply').forEach(function (b) { var k = b.getAttribute('data-promo'); b.hidden = !(C.PROMOS[k].amount > 0) && !S.promo[k]; b.disabled = !!S.promo[k]; b.textContent = S.promo[k] ? '✓ ' + C.PROMOS[k].label + ' applied' : 'Apply ' + C.PROMOS[k].label; });
    // CvV
    var cvv = +($('#cvvCost').value || 0);
    var per = cvv ? cvv / C.CVV.typicalSquares : 0;
    $('#cvvPerSq').textContent = per ? fmt(per) : '$—';
    $('#cvvTheirs').textContent = per ? fmt(per * (+S.squares || 0)) : '$—';
    $('#cvvRemind').textContent = per ? fmt(per * (+S.squares || 0)) : '$—';
    $('#cvvPtc').style.display = cvv ? 'none' : '';
    renderIncluded();
  }

  // ---------------- binds ----------------
  function bindAll() {
    var map = {
      brand: S.brand || '[Brand]', color: S.color || '[Color]', pkg: S.pkg + (S.pkgChosen ? '' : ''),
      brandColor: (S.brand || '[Brand]') + ' · ' + (S.color || '[color]'),
      day1: C.INSTALL_DAYS[0], day2: C.INSTALL_DAYS[1], cvvEdition: C.CVV.edition, cvvTypical: C.CVV.typicalSquares
    };
    $$('[data-bind]').forEach(function (el) { var k = el.getAttribute('data-bind'); if (map[k] != null) el.textContent = map[k]; });
    $$('#pkgCards .pkg, #pPkg button').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-pkg') === S.pkg); });
    $$('#shingleCards .sh').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-brand') === S.brand); });
  }
  var INCLUDED = {
    Elite: ['Full tear-off down to the decking, inspected piece by piece', '20 sheets of plywood included', '4” drip edge all the way around', 'Ice & water in all valleys', 'Upgraded synthetic underlayment', 'Thicker upgraded starter shingles', 'Class 4 impact-rated shingles', 'Class 4 hip & ridge shingles', 'Metal lifetime accessories', 'Ventilation balanced & tested · deck air intakes if needed', 'Clean-up with magnetic nail sweep · PM walkthrough'],
    Premier: ['Full tear-off down to the decking, inspected piece by piece', '10 sheets of decking included', '4” drip edge all the way around', 'Ice & water around all valleys and accessories', 'Standard synthetic underlayment', 'Wind-warranted starter shingles', 'Your Class 3 shingles', 'Proper Class 3 hip & ridge shingles', 'Lifetime metal accessories', 'Ventilation optimized', 'Clean-up with magnetic nail sweep · PM walkthrough'],
    Essential: ['Full tear-off down to the decking, inspected piece by piece', '5 sheets of plywood, if needed', '2” drip edge all the way around', 'Ice & water in the valleys', 'Brand-new synthetic underlayment over the whole roof', 'Starter shingles', 'Your Class 3 shingles', 'Proper hip & ridge shingles', 'All brand-new accessories', 'Ridge vent included', 'Clean-up with magnetic nail sweep · PM walkthrough']
  };
  function renderIncluded() {
    var items = INCLUDED[S.pkg].slice();
    if (S.brand) items.splice(6, 1, (S.pkg === 'Elite' ? 'Class 4 ' : '') + S.brand + (S.color ? ' in ' + S.color : '') + ' shingles');
    if (S.ply) items.push('Extra plywood: ' + S.ply + ' sheets');
    Object.keys(C.DISCOUNTS).forEach(function (k) { if (S.disc[k]) items.push(C.DISCOUNTS[k].label + ' discount'); });
    $('#includedList').innerHTML = items.map(function (t) { return '<li>' + t + '</li>'; }).join('');
  }

  // ---------------- slide navigation ----------------
  var handlers = {};
  function go(i, dir) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    var prev = slides[cur];
    if (prev && prev !== slides[i]) { prev.classList.remove('active'); prev.classList.toggle('left', i > cur); leave(prev); }
    cur = i; var s = slides[i];
    s.classList.remove('left'); s.classList.add('active');
    s.scrollTop = 0;
    $('#stepchip').textContent = 'Step ' + s.dataset.step + ' · ' + STEP_NAMES[s.dataset.step];
    $('#counter').textContent = (i + 1) + ' / ' + slides.length;
    $('#progressBar').style.width = ((i + 1) / slides.length * 100) + '%';
    if (history.replaceState) history.replaceState(null, '', '#' + (i + 1));
    var n = $('.notes', s); var np = $('#notesPanel');
    np.innerHTML = '<b>Rep notes · ' + s.dataset.title + '</b>' + (n ? n.innerHTML : 'No extra notes for this slide.');
    $$('.menu button').forEach(function (b, k) { b.classList.toggle('on', k === i); });
    enter(s);
  }
  function next() { var h = handlers[slides[cur].id]; if (h && h.next && h.next()) return; go(cur + 1, 1); }
  function prev() { var h = handlers[slides[cur].id]; if (h && h.prev && h.prev()) return; go(cur - 1, -1); }

  function enter(s) {
    if (s.id === 'roofSlide') { ensure3D($('#roofHost'), function () { window.Roof3D.setStep(S.roofStep, false); if (S.roofTie) showRoofTie(true); updateRoofPanel(); }); }
    if (s.classList.contains('pk')) { ensure3D($('#roofHostMini'), function () { window.Roof3D.setPackage(S.pkg); }); }
    if (s.id === 'priceSlide') { $('#priceCard').classList.toggle('shown', S.revealed); }
    renderPrice(false);
  }
  function leave(s) { if ((s.id === 'roofSlide' || s.classList.contains('pk')) && window.Roof3D && window.Roof3D.isReady()) window.Roof3D.pause(); }
  function ensure3D(host, cb) {
    if (!window.Roof3D) return;
    var l = $('.loading', host);
    setTimeout(function () {
      try { window.Roof3D.attach(host); window.Roof3D.resume(); if (l) l.remove(); cb && cb(); }
      catch (e) { host.innerHTML = '<div class="loading">3D view needs WebGL — ' + e.message + '</div>'; }
    }, 30);
  }

  // ---------------- 3D roof slide ----------------
  function updateRoofPanel() {
    var R = window.Roof3D, st = R.STEPS[S.roofStep];
    $('#rStepNum').textContent = S.roofStep; $('#rStepTot').textContent = R.STEPS.length - 1;
    $('#rTitle').textContent = st.title;
    $('#rSay').innerHTML = st.say.map(function (t) { return '<p>' + t + '</p>'; }).join('');
    $('#rPrev').disabled = S.roofStep === 0 && !S.roofTie;
    $('#rNext').textContent = S.roofTie ? 'Continue ›' : (S.roofStep === R.STEPS.length - 1 ? 'Finish ›' : (S.roofStep === 0 ? 'Start building ›' : 'Next layer ›'));
    $('#rDots').innerHTML = R.STEPS.map(function (_, k) { return '<i class="' + (k < S.roofStep ? 'on' : k === S.roofStep ? 'cur' : '') + '" data-k="' + k + '"></i>'; }).join('');
    $('#rPkg').hidden = !S.roofTie;
  }
  function showRoofTie(on) { S.roofTie = on; $('#roofTie').classList.toggle('show', on); }
  handlers.roofSlide = {
    next: function () {
      var R = window.Roof3D; if (!R || !R.isReady()) return false;
      if (S.roofTie) return false;
      if (S.roofStep < R.STEPS.length - 1) { S.roofStep = R.setStep(S.roofStep + 1, true); }
      else { showRoofTie(true); }
      updateRoofPanel(); return true;
    },
    prev: function () {
      var R = window.Roof3D; if (!R || !R.isReady()) return false;
      if (S.roofTie) { showRoofTie(false); R.setPackage(null); R.setStep(S.roofStep, false); $$('#rPkg button').forEach(function (b) { b.classList.remove('on'); }); updateRoofPanel(); return true; }
      if (S.roofStep > 0) { S.roofStep = R.setStep(S.roofStep - 1, false); updateRoofPanel(); return true; }
      return false;
    }
  };
  $('#rNext').addEventListener('click', function () { if (!handlers.roofSlide.next()) go(cur + 1); });
  $('#rPrev').addEventListener('click', function () { handlers.roofSlide.prev(); });
  $('#rDots').addEventListener('click', function (e) { var k = e.target.getAttribute('data-k'); if (k == null) return; showRoofTie(false); S.roofStep = window.Roof3D.setStep(+k, false); updateRoofPanel(); });
  $('#rPkg').addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; var p = b.getAttribute('data-pkg'); $$('#rPkg button').forEach(function (x) { x.classList.toggle('on', x === b); }); if (p) window.Roof3D.setPackage(p); else { window.Roof3D.setPackage(null); window.Roof3D.setStep(window.Roof3D.STEPS.length - 1, false); } });

  // ---------------- price reveal & promos ----------------
  handlers.priceSlide = {
    next: function () { if (!S.revealed) { reveal(); return true; } return false; },
    prev: function () { if (S.revealed && !S.promo.initialVisit) { S.revealed = false; $('#priceCard').classList.remove('shown'); return true; } return false; }
  };
  function reveal() { S.revealed = true; S.shownTotal = 0; $('#priceCard').classList.add('shown'); renderPrice(true); }
  $('#revealBtn').addEventListener('click', reveal);
  function applyPromo(k) { if (S.promo[k] || !(C.PROMOS[k].amount > 0)) return false; S.promo[k] = true; renderPrice(true); return true; }
  function unapplyPromo(k) { if (!S.promo[k]) return false; S.promo[k] = false; renderPrice(true); return true; }
  handlers.promo1 = { next: function () { return applyPromo('initialVisit'); }, prev: function () { return unapplyPromo('initialVisit'); } };
  handlers.promo2 = { next: function () { return applyPromo('marketing'); }, prev: function () { return unapplyPromo('marketing'); } };
  $$('.repamt').forEach(function (inp) { ['input','change'].forEach(function (ev) { inp.addEventListener(ev, function () { var k = inp.getAttribute('data-repamt'), v = Math.max(0, Math.round(+inp.value || 0)); C.PROMOS[k].amount = v; if (!v) S.promo[k] = false; renderPrice(false); }); }); inp.addEventListener('keydown', function (e) { e.stopPropagation(); if (e.key === 'Enter') inp.blur(); }); });
  $$('.apply').forEach(function (b) { b.addEventListener('click', function () { applyPromo(b.getAttribute('data-promo')); }); });

  // ---------------- inputs ----------------
  function setSquares(v) { v = Math.max(0, Math.min(200, +v || 0)); S.squares = v; $$('.sqInput').forEach(function (i) { if (+i.value !== v) i.value = v; }); renderPrice(true); }
  $$('.sqInput').forEach(function (i) { i.addEventListener('input', function () { setSquares(i.value); }); });
  $('#pPly').addEventListener('input', function () { S.ply = Math.max(0, +this.value | 0); renderPrice(true); });
  $$('.stepper button').forEach(function (b) {
    b.addEventListener('click', function () {
      var d = +b.getAttribute('data-d'), t = b.getAttribute('data-t');
      if (t === 'sq') setSquares((+S.squares || 0) + d);
      else { S.ply = Math.max(0, (S.ply | 0) + d); $('#pPly').value = S.ply; renderPrice(true); }
    });
  });
  function fillSelect(sel, obj, val) { sel.innerHTML = Object.keys(obj).map(function (k) { return '<option' + (k === val ? ' selected' : '') + '>' + k + '</option>'; }).join(''); }
  fillSelect($('#pStories'), C.STORIES, S.stories); fillSelect($('#pShape'), C.SHAPE, S.shape);
  $('#pStories').addEventListener('change', function () { S.stories = this.value; renderPrice(true); });
  $('#pShape').addEventListener('change', function () { S.shape = this.value; renderPrice(true); });
  function choosePkg(p) { S.pkg = p; S.pkgChosen = true; bindAll(); renderPrice(true); if (slides[cur].classList.contains('pk') && window.Roof3D && window.Roof3D.isReady()) window.Roof3D.setPackage(p); }
  $$('#pkgCards .pkg, #pPkg button').forEach(function (b) { b.addEventListener('click', function () { choosePkg(b.getAttribute('data-pkg')); }); });
  $$('#shingleCards .sh').forEach(function (b) { b.addEventListener('click', function () { S.brand = b.getAttribute('data-brand'); bindAll(); renderIncluded(); }); });
  $('#colorIn').addEventListener('input', function () { S.color = this.value.trim(); bindAll(); renderIncluded(); });
  if (C.CVV.houstonRoofCost) $('#cvvCost').value = C.CVV.houstonRoofCost;
  $('#cvvCost').addEventListener('input', function () { renderPrice(false); });
  if (C.CVV.resaleRecoupPct != null) $('#recoupPct').textContent = C.CVV.resaleRecoupPct + '%';
  $$('#houseToggle button').forEach(function (b) { b.addEventListener('click', function () { S.house = b.getAttribute('data-h'); $$('#houseToggle button').forEach(function (x) { x.classList.toggle('on', x === b); }); $('.house-now').hidden = S.house !== 'now'; $('.house-forever').hidden = S.house !== 'forever'; }); });
  // discounts
  function discHtml(mini) {
    return Object.keys(C.DISCOUNTS).map(function (k) { var d = C.DISCOUNTS[k]; return '<button data-disc="' + k + '" class="' + (S.disc[k] ? 'on' : '') + '"><b>' + d.label + '</b><span>' + (S.disc[k] ? '✓ ' : '') + '−' + fmt(d.amount) + (d.placeholder && !mini ? '</span><span class="ptc">placeholder · PHIL TO CONFIRM</span>' : '</span>') + '</button>'; }).join('');
  }
  function renderDisc() { $('#discToggles').innerHTML = discHtml(false); $('#discMini').innerHTML = discHtml(true); }
  document.addEventListener('click', function (e) { var b = e.target.closest('[data-disc]'); if (!b) return; var k = b.getAttribute('data-disc'); S.disc[k] = !S.disc[k]; renderDisc(); renderPrice(true); });
  $('#holdBanner').textContent = 'This price is honored for ' + C.PRICE_HOLD_DAYS + ' days';

  // ---------------- chrome: keys, swipe, buttons, menu, notes ----------------
  $('#nextBtn').addEventListener('click', next); $('#prevBtn').addEventListener('click', prev);
  document.addEventListener('keydown', function (e) {
    if (/input|select|textarea/i.test(e.target.tagName)) return;
    if (['ArrowRight', 'PageDown', ' ', 'Enter'].indexOf(e.key) >= 0) { e.preventDefault(); next(); }
    else if (['ArrowLeft', 'PageUp', 'Backspace'].indexOf(e.key) >= 0) { e.preventDefault(); prev(); }
    else if (e.key === 'n' || e.key === 'N') toggleNotes();
    else if (e.key === 'm' || e.key === 'M') toggleMenu();
    else if (e.key === 'Home') go(0); else if (e.key === 'End') go(slides.length - 1);
  });
  var tx = null, ty = 0, tt = 0;
  document.addEventListener('touchstart', function (e) { if (e.touches.length !== 1 || e.target.closest('.no-swipe, input, select, textarea, .menu, .notesPanel')) { tx = null; return; } tx = e.touches[0].clientX; ty = e.touches[0].clientY; tt = Date.now(); }, { passive: true });
  document.addEventListener('touchend', function (e) {
    if (tx == null) return; var t = e.changedTouches[0], dx = t.clientX - tx, dy = t.clientY - ty; tx = null;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4 && Date.now() - tt < 800) { dx < 0 ? next() : prev(); }
  }, { passive: true });
  function toggleNotes() { var p = $('#notesPanel'); p.hidden = !p.hidden; $('#notesBtn').classList.toggle('on', !p.hidden); }
  function toggleMenu() { var m = $('#menu'); m.hidden = !m.hidden; $('#menuBtn').classList.toggle('on', !m.hidden); }
  $('#notesBtn').addEventListener('click', toggleNotes); $('#menuBtn').addEventListener('click', toggleMenu);
  (function buildMenu() {
    var html = '', last = null;
    slides.forEach(function (s, i) { if (s.dataset.step !== last) { last = s.dataset.step; html += '<h4>Step ' + last + ' · ' + STEP_NAMES[last] + '</h4>'; } html += '<button data-i="' + i + '"><i>' + (i + 1) + '</i>' + s.dataset.title + '</button>'; });
    $('#menu').innerHTML = html;
    $('#menu').addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; go(+b.getAttribute('data-i')); toggleMenu(); });
  })();

  // ---------------- boot ----------------
  renderDisc(); bindAll();
  var start = parseInt((location.hash || '').slice(1), 10);
  go(isNaN(start) ? 0 : start - 1);
  window.__deck = { go: go, next: next, prev: prev, S: S, price: price };
})();

(function(){var p=document.getElementById('installPick');if(!p)return;
function f(dt){return dt.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'});}
function u(){var i=document.getElementById('installDate'),dl=document.getElementById('deliverDate');
if(!p.value){i.textContent='________';dl.textContent='';return;}
var a=p.value.split('-'),dt=new Date(+a[0],a[1]-1,+a[2],12),pr=new Date(dt);pr.setDate(pr.getDate()-1);
i.textContent=f(dt);dl.textContent=': '+f(pr);}
p.addEventListener('input',u);p.addEventListener('change',u);
p.addEventListener('keydown',function(e){e.stopPropagation();});u();})();
