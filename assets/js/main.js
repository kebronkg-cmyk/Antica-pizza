/* Antica · Caffè Pizza Bar — interactions */
(function () {
  'use strict';

  /* ---- Opening hours (single source of truth for the live badge) ----
     0 = Sonntag … 6 = Samstag. null = Ruhetag. Format [open, close] in "HH:MM". */
  var HOURS = {
    0: null,
    1: ['14:00', '23:00'],
    2: ['14:00', '23:00'],
    3: ['14:00', '23:00'],
    4: ['14:00', '23:00'],
    5: ['14:00', '23:00'],
    6: ['14:00', '23:00']
  };
  var DAYS = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

  function toMin(t) { var p = t.split(':'); return +p[0] * 60 + +p[1]; }

  // Current time in Munich, independent of the visitor's timezone
  function munichNow() {
    try {
      var parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Berlin', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false
      }).formatToParts(new Date());
      var map = {};
      parts.forEach(function (p) { map[p.type] = p.value; });
      var wd = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(map.weekday);
      return { day: wd, min: (+map.hour % 24) * 60 + +map.minute };
    } catch (e) {
      var d = new Date();
      return { day: d.getDay(), min: d.getHours() * 60 + d.getMinutes() };
    }
  }

  function updateStatus() {
    var el = document.getElementById('status');
    var txt = document.getElementById('status-text');
    if (!el || !txt) return;
    var now = munichNow();
    var today = HOURS[now.day];
    var state, label;

    if (today && now.min >= toMin(today[0]) && now.min < toMin(today[1])) {
      state = 'open';
      label = 'Jetzt geöffnet · bis ' + today[1] + ' Uhr';
    } else if (today && now.min < toMin(today[0])) {
      state = 'closed';
      label = 'Heute ab ' + today[0] + ' Uhr geöffnet';
    } else {
      // find next opening day
      for (var i = 1; i <= 7; i++) {
        var d = (now.day + i) % 7;
        if (HOURS[d]) {
          label = 'Geschlossen · ' + (i === 1 ? 'morgen' : DAYS[d]) + ' ab ' + HOURS[d][0] + ' Uhr';
          break;
        }
      }
      state = 'closed';
    }
    el.setAttribute('data-state', state);
    txt.textContent = label;

    var rows = document.querySelectorAll('#hours tr');
    rows.forEach(function (r) { r.classList.toggle('is-today', +r.getAttribute('data-day') === now.day); });
  }
  updateStatus();
  setInterval(updateStatus, 60 * 1000);

  /* ---- Header on scroll + mobile action bar ---- */
  var header = document.querySelector('.header');
  var actionbar = document.querySelector('.actionbar');
  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle('is-scrolled', y > 40);
    if (actionbar) actionbar.classList.toggle('is-visible', y > window.innerHeight * 0.6);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile nav ---- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  function setNav(open) {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    nav.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (burger && nav) {
    burger.addEventListener('click', function () { setNav(burger.getAttribute('aria-expanded') !== 'true'); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setNav(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('is-open')) setNav(false); });
  }

  /* ---- Active nav link ---- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  if ('IntersectionObserver' in window && links.length) {
    var secObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (l) { l.classList.toggle('is-active', l.getAttribute('href') === '#' + en.target.id); });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(function (l) {
      var s = document.querySelector(l.getAttribute('href'));
      if (s) secObs.observe(s);
    });
  }

  /* ---- Reveal on scroll ---- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 70 + 'ms';
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---- Menu tabs (WAI-ARIA tabs pattern) ---- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab'));
  function selectTab(tab, focus) {
    tabs.forEach(function (t) {
      var sel = t === tab;
      t.setAttribute('aria-selected', String(sel));
      t.tabIndex = sel ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !sel;
    });
    if (focus) tab.focus();
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { selectTab(t); });
    t.addEventListener('keydown', function (e) {
      var n = null;
      if (e.key === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
      if (e.key === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
      if (e.key === 'Home') n = tabs[0];
      if (e.key === 'End') n = tabs[tabs.length - 1];
      if (n) { e.preventDefault(); selectTab(n, true); }
    });
  });

  /* ---- Vegetarian filter ---- */
  var veg = document.getElementById('veg-only');
  if (veg) {
    veg.addEventListener('change', function () {
      document.querySelectorAll('.dish').forEach(function (d) {
        d.classList.toggle('is-hidden', veg.checked && !d.hasAttribute('data-veg'));
      });
    });
  }

  /* ---- Lightbox ---- */
  var lb = document.getElementById('lightbox');
  var items = Array.prototype.slice.call(document.querySelectorAll('.m-item'));
  var lbImg = document.getElementById('lb-img');
  var lbCap = document.getElementById('lb-cap');
  var current = 0;
  function show(i) {
    current = (i + items.length) % items.length;
    var it = items[current];
    var img = it.querySelector('img');
    lbImg.src = it.getAttribute('data-full');
    lbImg.alt = img.alt;
    lbCap.textContent = img.alt;
  }
  if (lb && typeof lb.showModal === 'function') {
    items.forEach(function (it, i) {
      it.addEventListener('click', function () { show(i); lb.showModal(); });
    });
    document.getElementById('lb-close').addEventListener('click', function () { lb.close(); });
    document.getElementById('lb-prev').addEventListener('click', function () { show(current - 1); });
    document.getElementById('lb-next').addEventListener('click', function () { show(current + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
    lb.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') show(current + 1);
      if (e.key === 'ArrowLeft') show(current - 1);
    });
    var sx = null;
    lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
      sx = null;
    });
  }

  /* ---- Click-to-load map (no third-party request before consent) ---- */
  var loadMap = document.getElementById('load-map');
  if (loadMap) {
    loadMap.addEventListener('click', function () {
      var lat = 48.12855, lon = 11.59901, d = 0.006;
      var f = document.createElement('iframe');
      f.title = 'Karte: Antica, Weißenburger Straße 27, München';
      f.loading = 'lazy';
      f.src = 'https://www.openstreetmap.org/export/embed.html?bbox=' +
        (lon - d) + ',' + (lat - d / 2) + ',' + (lon + d) + ',' + (lat + d / 2) +
        '&layer=mapnik&marker=' + lat + ',' + lon;
      var map = document.getElementById('map');
      map.innerHTML = '';
      map.appendChild(f);
    });
  }

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
