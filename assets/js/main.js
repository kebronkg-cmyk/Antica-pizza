/* Antica · Caffè Pizza Bar — alles, was sich bewegt */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var ruhig = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Öffnungszeiten: einzige Quelle für Status, Tabelle und Tagesbogen ──
     0 = Sonntag … 6 = Samstag, null = Ruhetag */
  var ZEITEN = { 0: null, 1: [14, 23], 2: [14, 23], 3: [14, 23], 4: [14, 23], 5: [14, 23], 6: [14, 23] };
  var TAGE = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

  // Uhrzeit in München, egal wo der Gast gerade ist
  function jetztMuenchen() {
    try {
      var t = {};
      new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Berlin', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false })
        .formatToParts(new Date()).forEach(function (p) { t[p.type] = p.value; });
      return { tag: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(t.weekday), std: (+t.hour % 24) + (+t.minute) / 60 };
    } catch (e) {
      var d = new Date();
      return { tag: d.getDay(), std: d.getHours() + d.getMinutes() / 60 };
    }
  }

  function status() {
    var j = jetztMuenchen(), z = ZEITEN[j.tag], kurz, lang, zustand = 'zu';
    if (z && j.std >= z[0] && j.std < z[1]) {
      zustand = z[1] - j.std <= 0.75 ? 'bald' : 'offen';
      kurz = 'Geöffnet bis ' + z[1] + ' Uhr';
      lang = zustand === 'bald' ? 'Noch kurz geöffnet, bis ' + z[1] + ' Uhr' : 'Jetzt geöffnet, bis ' + z[1] + ' Uhr';
    } else if (z && j.std < z[0]) {
      kurz = lang = 'Heute ab ' + z[0] + ' Uhr geöffnet';
    } else {
      for (var i = 1; i <= 7; i++) {
        var d = (j.tag + i) % 7;
        if (ZEITEN[d]) { kurz = lang = 'Geschlossen · ' + (i === 1 ? 'morgen' : TAGE[d]) + ' ab ' + ZEITEN[d][0] + ' Uhr'; break; }
      }
    }
    $$('[data-status]').forEach(function (el) {
      el.textContent = el.getAttribute('data-status') === 'lang' ? lang : kurz;
      el.setAttribute('data-zustand', zustand);
    });
    $$('#zeiten tr').forEach(function (r) { r.classList.toggle('is-heute', +r.getAttribute('data-tag') === j.tag); });
    tagesbogen(j, z);
  }

  /* ── Tagesbogen: Sonne bzw. Mond wandert über Caffè, Pizza, Bar ── */
  var bogen = $('[data-bogen]'), gestirn = $('[data-gestirn]');
  function tagesbogen(j, z) {
    var offen = z && j.std >= z[0] && j.std < z[1];
    $$('.drei-teil').forEach(function (t) {
      t.classList.toggle('is-jetzt', !!offen && j.std >= +t.dataset.von && j.std < +t.dataset.bis);
    });
    if (!bogen || !gestirn) return;
    var svg = bogen.ownerSVGElement, box = svg.getBoundingClientRect();
    if (!box.width) return;
    // 14 Uhr links, 23 Uhr rechts; außerhalb der Zeiten parkt der Mond am Rand
    var f = offen ? (j.std - 14) / 9 : (j.std < 14 ? 0 : 1);
    var p = bogen.getPointAtLength(bogen.getTotalLength() * Math.min(1, Math.max(0, f)));
    var vb = svg.viewBox.baseVal;
    gestirn.style.left = (p.x / vb.width * box.width) + 'px';
    gestirn.style.top = (p.y / vb.height * box.height) + 'px';
    gestirn.classList.toggle('is-mond', !offen || j.std >= 20);
    gestirn.title = offen ? 'Jetzt in Haidhausen' : 'Gerade geschlossen';
  }
  status();
  setInterval(status, 60 * 1000);
  window.addEventListener('resize', function () { var j = jetztMuenchen(); tagesbogen(j, ZEITEN[j.tag]); });

  /* ── Kopf: fest nach der Bühne, beim Runterscrollen kurz weg ── */
  var kopf = $('[data-kopf]'), buehne = $('[data-buehne]'), leiste = $('[data-leiste]');
  var letzteY = 0;
  function beimScrollen() {
    var y = window.scrollY, h = 40;
    if (kopf && buehne) {
      kopf.classList.toggle('is-fest', y > h);
      kopf.classList.toggle('is-weg', y > (buehne.offsetHeight) && y > letzteY + 2 && !menuOffen());
      if (y < letzteY - 2 || y < buehne.offsetHeight) kopf.classList.remove('is-weg');
    }
    if (leiste) leiste.classList.toggle('is-da', y > window.innerHeight * 0.7);
    letzteY = y;
  }
  window.addEventListener('scroll', beimScrollen, { passive: true });
  beimScrollen();

  /* ── Menü auf dem Handy ── */
  var menuKnopf = $('[data-menu]'), menu = $('[data-menu-flaeche]');
  function menuOffen() { return menu && menu.classList.contains('is-offen'); }
  function menuSetzen(auf) {
    menuKnopf.setAttribute('aria-expanded', String(auf));
    menu.classList.toggle('is-offen', auf);
    document.body.style.overflow = auf ? 'hidden' : '';
  }
  if (menuKnopf && menu) {
    menuKnopf.addEventListener('click', function () { menuSetzen(!menuOffen()); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) menuSetzen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menuOffen()) { menuSetzen(false); menuKnopf.focus(); } });
  }

  /* ── Aktiver Navi-Punkt ── */
  var navLinks = $$('.kopf-nav a');
  if ('IntersectionObserver' in window && navLinks.length) {
    var navObs = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) navLinks.forEach(function (l) { l.classList.toggle('is-aktiv', l.getAttribute('href') === '#' + e.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    navLinks.forEach(function (l) { var s = $(l.getAttribute('href')); if (s) navObs.observe(s); });
  }

  /* ═══ Die Bühne ═══ */
  var PIZZEN = [
    { name: 'Margherita', bild: 'margherita', farbe: '#1d5641', preis: '10,00', veg: true,
      satz: 'Tomate, Mozzarella, Oregano. Mehr braucht es nicht, und genau deshalb fängt hier jeder an.', zusatz: 'der Klassiker' },
    { name: 'Sucuk', bild: 'salame', farbe: '#1f6b70', preis: '12,50',
      satz: 'Würzige Knoblauchwurst und Zwiebeln. Die Pizza, für die Stammgäste extra vorbeikommen.', zusatz: 'kräftig' },
    { name: 'Quattro Formaggi', bild: 'formaggi', farbe: '#171311', preis: '13,90', veg: true,
      satz: 'Edamer, Mozzarella, Feta und Gorgonzola. Vier Käse, ein goldener Rand.', zusatz: 'für Käseliebhaber' },
    { name: 'Tonno', bild: 'tonno', farbe: '#b04512', preis: '12,50',
      satz: 'Thunfisch und rote Zwiebeln, großzügig verteilt bis an den Rand.', zusatz: 'einfach gut' },
    { name: 'Vegetarisch', bild: 'verdure', farbe: '#a82c1c', preis: '13,90', veg: true,
      satz: 'Gegrillte Aubergine, Zucchini und Paprika mit Feta und Champignons.', zusatz: 'bunt wie die Stühle draußen' }
  ];

  var feld = $('[data-feld]'), tafel = $('[data-tafel]'), teller = $('[data-teller]'), kranz = $('[data-kranz]');
  var gerichtEl = $('[data-gericht]'), waehler = $('[data-waehler]'), hinweis = $('[data-hinweis]');
  var themaFarbe = $('meta[name="theme-color"]');

  if (buehne && teller && waehler) {
    var bildSrc = function (b, w) { return 'assets/img/pizza/' + b + '-' + w + '.webp'; };
    var srcset = function (b) { return bildSrc(b, 480) + ' 480w, ' + bildSrc(b, 800) + ' 800w'; };

    // Restliche Pizzen auf den Teller legen (die erste steht schon im HTML)
    PIZZEN.forEach(function (p, i) {
      if (i === 0) return;
      var d = document.createElement('div');
      d.className = 'pizza';
      d.setAttribute('data-pizza', i);
      ['pizza-rest', 'pizza-stueck'].forEach(function (k) {
        var img = new Image(800, 800);
        img.className = k; img.alt = ''; img.decoding = 'async'; img.draggable = false;
        img.sizes = '(max-width: 900px) 82vw, 42vw'; img.srcset = srcset(p.bild); img.src = bildSrc(p.bild, 800);
        d.appendChild(img);
      });
      teller.appendChild(d);
    });
    var pizzen = $$('.pizza', teller);
    // Jede Pizza bekommt ein anderes Stück, das sich anheben lässt
    var STUECKE = [[104, 146], [196, 238], [32, 74], [286, 328], [150, 192]];
    pizzen.forEach(function (el, i) {
      var s = STUECKE[i], mitte = (s[0] + s[1]) / 2 * Math.PI / 180;
      el.style.setProperty('--von', s[0] + 'deg');
      el.style.setProperty('--bis', s[1] + 'deg');
      var st = $('.pizza-stueck', el);
      st.style.setProperty('--dx', (Math.sin(mitte) * 6.2).toFixed(2) + '%');
      st.style.setProperty('--dy', (-Math.cos(mitte) * 6.2).toFixed(2) + '%');
    });

    // Wähler
    waehler.innerHTML = PIZZEN.map(function (p, i) {
      return '<button type="button" class="waehler-tab" role="tab" id="w-' + p.bild + '" aria-controls="gericht-text" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '" data-i="' + i + '">' +
        '<img src="' + bildSrc(p.bild, 160) + '" alt="" width="160" height="160" decoding="async"><span>' + p.name + '</span></button>';
    }).join('');
    var tabs = $$('.waehler-tab', waehler);
    gerichtEl.id = 'gericht-text';
    gerichtEl.setAttribute('role', 'tabpanel');
    gerichtEl.setAttribute('aria-labelledby', tabs[0].id);

    var blatt = '<svg aria-hidden="true"><use href="#i-blatt"/></svg>';
    var gerichtHTML = function (p) {
      return '<div class="gericht-kopf"><h2 class="gericht-name">' + p.name + '</h2>' + (p.veg ? '<span class="gericht-marke">' + blatt + 'veggie</span>' : '') + '</div>' +
        '<p class="gericht-satz">' + p.satz + '</p>' +
        '<div class="gericht-handeln"><span class="gericht-preis">' + p.preis + '<small>€</small></span><span class="gericht-zusatz">' + p.zusatz + '</span></div>';
    };

    var akt = 0, laeuft = false, warte = null, gewechselt = false, dreh = 0;
    gerichtEl.innerHTML = gerichtHTML(PIZZEN[0]);
    feld.style.background = PIZZEN[0].farbe;

    var zeige = function (neu, von, richtung) {
      neu = (neu + PIZZEN.length) % PIZZEN.length;
      if (neu === akt) return;
      if (laeuft) { warte = [neu, von, richtung]; return; }
      var alt = akt, p = PIZZEN[neu];
      akt = neu;
      richtung = richtung || (neu > alt ? 1 : -1);
      if (!gewechselt) { gewechselt = true; if (hinweis) hinweis.classList.add('is-weg'); }

      tabs.forEach(function (t, i) { t.setAttribute('aria-selected', String(i === neu)); t.tabIndex = i === neu ? 0 : -1; });
      gerichtEl.setAttribute('aria-labelledby', tabs[neu].id);
      if (themaFarbe) themaFarbe.setAttribute('content', p.farbe);
      dreh -= 50 * richtung;
      if (kranz) kranz.style.setProperty('--dreh', dreh + 'deg');

      var altP = pizzen[alt], neuP = pizzen[neu];
      if (ruhig || !Element.prototype.animate) {
        altP.classList.remove('is-aktiv'); neuP.classList.add('is-aktiv');
        feld.style.background = p.farbe; gerichtEl.innerHTML = gerichtHTML(p);
        return;
      }
      laeuft = true;

      // Neue Farbe wächst als Kreis von dort, wo getippt wurde
      var r = buehne.getBoundingClientRect();
      var x = (von ? von.x : r.left + r.width * 0.72) - r.left;
      var y = (von ? von.y : r.top + r.height / 2) - r.top;
      var R = Math.hypot(Math.max(x, r.width - x), Math.max(y, r.height - y)) + 4;
      var flut = document.createElement('div');
      flut.className = 'buehne-feld-neu';
      flut.style.background = p.farbe;
      feld.after(flut);
      flut.animate([{ clipPath: 'circle(0px at ' + x + 'px ' + y + 'px)' }, { clipPath: 'circle(' + R + 'px at ' + x + 'px ' + y + 'px)' }],
        { duration: 850, easing: 'cubic-bezier(.65,0,.35,1)', fill: 'forwards' });

      // Alte Pizza rollt in Laufrichtung raus, neue rollt von der anderen Seite rein
      var raus = altP.animate([
        { transform: 'none', opacity: 1 },
        { transform: 'translateX(' + (-24 * richtung) + '%) rotate(' + (-80 * richtung) + 'deg) scale(.78)', opacity: 0 }
      ], { duration: 480, easing: 'cubic-bezier(.5,0,.75,0)', fill: 'forwards' });
      neuP.classList.add('is-aktiv');
      var rein = neuP.animate([
        { transform: 'translateX(' + (28 * richtung) + '%) rotate(' + (100 * richtung) + 'deg) scale(.8)', opacity: 0 },
        { transform: 'none', opacity: 1 }
      ], { duration: 1000, delay: 260, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' });

      // Text: alter geht nach oben, neuer kommt von unten
      var zeilen = Array.prototype.slice.call(gerichtEl.children);
      zeilen.forEach(function (z, i) {
        z.animate([{ transform: 'none', opacity: 1 }, { transform: 'translateY(-14px)', opacity: 0 }], { duration: 240, delay: i * 30, easing: 'ease-in', fill: 'forwards' });
      });
      setTimeout(function () {
        gerichtEl.innerHTML = gerichtHTML(p);
        Array.prototype.slice.call(gerichtEl.children).forEach(function (z, i) {
          z.animate([{ transform: 'translateY(18px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 650, delay: i * 55, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' });
        });
      }, 360);

      Promise.all([raus.finished, rein.finished]).then(function () {
        feld.style.background = p.farbe;
        flut.remove();
        altP.classList.remove('is-aktiv');
        raus.cancel();
        laeuft = false;
        if (warte) { var w = warte; warte = null; zeige(w[0], w[1], w[2]); }
      });
    };

    var mitteVon = function (el) { var b = el.getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.top + b.height / 2 }; };

    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { zeige(i, mitteVon(t)); });
      t.addEventListener('keydown', function (e) {
        var n = null;
        if (e.key === 'ArrowRight') n = (i + 1) % tabs.length;
        if (e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
        if (e.key === 'Home') n = 0;
        if (e.key === 'End') n = tabs.length - 1;
        if (n !== null) { e.preventDefault(); tabs[n].focus(); zeige(n, mitteVon(tabs[n]), n > i ? 1 : -1); }
      });
    });
    $$('[data-schritt]', buehne).forEach(function (b) {
      b.addEventListener('click', function () { var s = +b.dataset.schritt; zeige(akt + s, mitteVon(b), s); });
    });

    // Wischen: die Pizza folgt dem Finger ein Stück, dreht sich mit
    var start = null;
    tafel.addEventListener('pointerdown', function (e) {
      if (e.target.closest('button') || laeuft) return;
      start = { x: e.clientX, y: e.clientY, id: e.pointerId, dx: 0 };
    });
    tafel.addEventListener('pointermove', function (e) {
      if (!start || e.pointerId !== start.id) return;
      start.dx = e.clientX - start.x;
      if (Math.abs(start.dx) > 6 && !tafel.classList.contains('is-zieht')) {
        tafel.classList.add('is-zieht');
        try { tafel.setPointerCapture(e.pointerId); } catch (_) {}
      }
      if (tafel.classList.contains('is-zieht') && !ruhig) {
        pizzen[akt].style.transform = 'translateX(' + start.dx * 0.35 + 'px) rotate(' + start.dx * 0.18 + 'deg)';
      }
    });
    var loslassen = function (e) {
      if (!start || (e && e.pointerId !== start.id)) return;
      var dx = start.dx, p = pizzen[akt];
      start = null;
      tafel.classList.remove('is-zieht');
      if (Math.abs(dx) > 55) {
        p.style.transform = '';
        zeige(akt + (dx < 0 ? 1 : -1), e ? { x: e.clientX, y: e.clientY } : null, dx < 0 ? 1 : -1);
      } else if (p.style.transform) {
        var jetzt = p.style.transform;
        p.style.transform = '';
        if (!ruhig) p.animate([{ transform: jetzt }, { transform: 'none' }], { duration: 600, easing: 'cubic-bezier(.34,1.56,.64,1)' });
      }
    };
    tafel.addEventListener('pointerup', loslassen);
    tafel.addEventListener('pointercancel', loslassen);

    document.addEventListener('keydown', function (e) {
      if (e.target.closest('input, textarea, [role="tablist"]')) return;
      var b = buehne.getBoundingClientRect();
      if (b.bottom < 100 || b.top > window.innerHeight - 100) return;
      if (e.key === 'ArrowRight') zeige(akt + 1, null, 1);
      if (e.key === 'ArrowLeft') zeige(akt - 1, null, -1);
    });
  }

  /* ── Speisekarte: Reiter und Veggie-Filter ── */
  var reiter = $$('.reiter-tab'), nurVeg = $('#nur-veg'), leer = $('[data-karte-leer]');
  function karteLeer() {
    if (!leer) return;
    var teil = $('.karte-teil:not([hidden])');
    var sichtbar = teil && $$('.speise', teil).some(function (s) { return !s.classList.contains('is-weg'); });
    leer.hidden = !teil || sichtbar || !nurVeg.checked;
  }
  function reiterWaehlen(t, fokus) {
    reiter.forEach(function (r) {
      var an = r === t;
      r.setAttribute('aria-selected', String(an));
      r.tabIndex = an ? 0 : -1;
      document.getElementById(r.getAttribute('aria-controls')).hidden = !an;
    });
    if (fokus) t.focus();
    karteLeer();
  }
  reiter.forEach(function (t, i) {
    t.addEventListener('click', function () { reiterWaehlen(t); });
    t.addEventListener('keydown', function (e) {
      var n = null;
      if (e.key === 'ArrowRight') n = reiter[(i + 1) % reiter.length];
      if (e.key === 'ArrowLeft') n = reiter[(i - 1 + reiter.length) % reiter.length];
      if (e.key === 'Home') n = reiter[0];
      if (e.key === 'End') n = reiter[reiter.length - 1];
      if (n) { e.preventDefault(); reiterWaehlen(n, true); }
    });
  });
  if (nurVeg) {
    nurVeg.addEventListener('change', function () {
      $$('.speise').forEach(function (s) { s.classList.toggle('is-weg', nurVeg.checked && !s.hasAttribute('data-veg')); });
      karteLeer();
    });
  }

  /* ── Pizza am Kartenrand dreht sich beim Scrollen ── */
  var randPizza = $('[data-rand-pizza]');
  if (randPizza && !ruhig) {
    var randLaeuft = false;
    window.addEventListener('scroll', function () {
      if (randLaeuft) return;
      randLaeuft = true;
      requestAnimationFrame(function () {
        var b = randPizza.getBoundingClientRect();
        randPizza.style.setProperty('--rad', ((window.innerHeight - b.top) * 0.18).toFixed(1) + 'deg');
        randLaeuft = false;
      });
    }, { passive: true });
  }

  /* ── Auftritte beim Scrollen und das Schild, das sich selbst malt ── */
  $$('[data-malen] .schild-zug path').forEach(function (p, i) { p.style.setProperty('--i', i); });
  var auf = $$('[data-auf]'), malen = $$('[data-malen]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add(e.target.hasAttribute('data-malen') ? 'is-gemalt' : 'is-da');
        if (e.target.hasAttribute('data-malen')) e.target.closest('.fuss-schild').classList.add('is-gemalt');
        io.unobserve(e.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    auf.forEach(function (el) {
      var geschwister = Array.prototype.indexOf.call(el.parentNode.children, el);
      el.style.transitionDelay = Math.min(geschwister, 4) * 80 + 'ms';
      io.observe(el);
    });
    malen.forEach(function (el) { io.observe(el); });
  } else {
    auf.forEach(function (el) { el.classList.add('is-da'); });
    malen.forEach(function (el) { el.classList.add('is-gemalt'); el.closest('.fuss-schild').classList.add('is-gemalt'); });
  }

  /* ── Karte erst nach Klick laden (vorher keine Verbindung zu Dritten) ── */
  var karteLaden = $('#karte-laden');
  if (karteLaden) {
    karteLaden.addEventListener('click', function () {
      var lat = 48.12855, lon = 11.59901, d = 0.006;
      var f = document.createElement('iframe');
      f.title = 'Karte: Antica, Weißenburger Straße 27, München';
      f.src = 'https://www.openstreetmap.org/export/embed.html?bbox=' + (lon - d) + ',' + (lat - d / 2) + ',' + (lon + d) + ',' + (lat + d / 2) + '&layer=mapnik&marker=' + lat + ',' + lon;
      var m = $('#map');
      m.innerHTML = '';
      m.appendChild(f);
    });
  }

  var jahr = $('[data-jahr]');
  if (jahr) jahr.textContent = new Date().getFullYear();
})();
