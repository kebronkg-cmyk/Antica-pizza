# Antica · Caffè Pizza Bar · Website

Statische One-Page-Website für **Antica Caffè Pizza Bar**, Weißenburger Str. 27, 81667 München-Haidhausen.
Reines HTML, CSS und JS. Kein Build-Schritt, keine Abhängigkeiten, keine Cookies und keine externen Requests beim Laden.

## Starten

```bash
# einfach index.html öffnen – oder lokal servieren:
python3 -m http.server 8000   # → http://localhost:8000
```

Deployen geht überall, wo statische Dateien laufen: GitHub Pages, Netlify, Cloudflare Pages oder ein Webspace.

## Struktur

```
index.html            One-Pager: Hero, Intro, Speisekarte, Bar & Theke, Galerie, Gäste, Besuch
impressum.html        Vorlage – Platzhalter [gelb markiert] ausfüllen!
datenschutz.html      Vorlage – Platzhalter ausfüllen und prüfen lassen!
favicon.svg
assets/css/style.css  Design-Tokens oben in :root (Farben, Schriften)
assets/js/main.js     Live-Öffnungsstatus, Tabs, Veggie-Filter, Lightbox, Karte per Klick
assets/fonts/         Fraunces, Manrope, Caveat (selbst gehostet, DSGVO-freundlich)
assets/img/           Fotos (siehe Bildrechte unten!)
```

## Designentscheidungen

- **Farben vom Ladenschild:** Schwarz (`--nero`) und Gold (`--oro`) wie die Fassade, Tomatenrot (`--pomodoro`) für Aktionen, Schirm-Grün (`--verde`) für „vegetarisch“, dazu ein warmer Creme-Ton als Papier.
- **Schrift:** *Fraunces* (weiche Serife mit Charakter, kursiv wie der Schriftzug auf dem Schild), *Manrope* für den Fließtext und *Caveat* als Kreide-Handschrift. Die Handschrift greift die Tafel „Stück Pizza“ vor dem Laden auf.
- **Aufbau:** Die drei Säulen vom Schild (Caffè · Pizza · Bar) strukturieren die Seite. Die Speisekarte hat Tabs (Pizza, Pide, Pasta, Getränke) und einen Veggie-Filter.
- **Praktisch:** Ein Live-Badge „Jetzt geöffnet“ läuft auf Münchner Zeit, der heutige Tag ist hervorgehoben. Auf dem Handy gibt es eine Leiste mit Anrufen, Karte und Route. Dazu kommen Schema.org-Daten für Google und `prefers-reduced-motion`.
- **DSGVO:** Die Schriften liegen lokal. Die OpenStreetMap-Karte lädt erst nach einem Klick (Zwei-Klick-Lösung).

## Inhalte pflegen

| Was | Wo |
|---|---|
| Öffnungszeiten | `index.html` (Tabelle `#hours`, Footer, JSON-LD) **und** `assets/js/main.js` (`HOURS`) |
| Preise / Gerichte | `index.html`, Abschnitt `#karte`. Für vegetarische Gerichte `data-veg` am `<li>` setzen |
| Telefonnummer | Suchen & Ersetzen von `44142500` / `441 425 00` |
| Farben | `assets/css/style.css` → `:root` |

## Quellen der Inhalte (Recherche Okt. 2026)

- Speisekarte & Preise (Stand 25.10.2025), Öffnungszeiten, Services: speisekarte.de – https://www.speisekarte.de/m%C3%BCnchen/restaurant/antica_pizza_bar
- Gästebewertungen (Zitate), Google-Rating 4,6, Fotos: Restaurant Guru – https://de.restaurantguru.com/Antica-Pizza-Bar-Munich
- Rating 4,3 / 84 Bewertungen, Merkmale (Terrasse, NFC, Lieferung …): Intravel – https://intravel.net/munich/restaurants-cafes/antica-pizza-bar
- Fassadenfoto, Anfahrt/ÖPNV-Entfernungen: mux.de – https://www.mux.de/Antica-Weissenburger-Str
- Koordinaten: OpenStreetMap / Nominatim

### ⚠️ Vor dem Livegang prüfen

1. **Öffnungszeiten:** Die Quellen widersprechen sich. speisekarte.de nennt Mo–Sa 14–23 Uhr und So Ruhetag, Intravel täglich 14–23 Uhr, Restaurant Guru ca. 11–22 Uhr. Übernommen ist die neueste Angabe (speisekarte.de). Bitte mit dem Inhaber abgleichen.
2. **Preise** sind vom Oktober 2025. Bar-Getränke (Caffè, Bier, Wein, Aperol) stehen ohne Preise auf der Seite, weil online keine zu finden waren.
3. **Bildrechte:** Die Fotos unter `assets/img/` sind Gäste- und Verzeichnis-Fotos von Restaurant Guru und mux.de. Sie wurden nur zugeschnitten, um Wasserzeichen-Grafiken zu entfernen. **Für eine öffentliche Website braucht ihr die Rechte daran.** Am besten ersetzt ihr sie durch eigene Fotos mit gleichem Dateinamen. Hochformat und Querformat dürfen gemischt sein. Höhere Auflösung (≥ 1600 px) sieht deutlich besser aus.
4. **Impressum & Datenschutz** ausfüllen (gelbe Platzhalter). Im Münchner Stadtbranchenbuch steht unter dieser Straße die Firma „L´antica Bella Italia GmbH“, mit dem Inhaber abklären.
5. Domain: Verzeichnisse nennen `antica-muenchen.de`, die Domain war aber nicht erreichbar.

### Bildliste

| Datei | Motiv | Quelle |
|---|---|---|
| fassade.jpg | Ladenfront mit Schirmen | mux.de |
| fassade-gaeste.jpg, pizzaiolo.jpg, panini.jpg | Fassade, Ofen, Vitrine | Restaurant Guru (Gästefoto) |
| pizza-*.jpg, pasta-tomate.jpg, linguine-meeresfruechte.jpg, antipasti.jpg | Gerichte | Restaurant Guru (Gästefotos) |
| theke.jpg, vitrine.jpg | Theke & Vitrine | Restaurant Guru |
| espresso.jpg, cappuccino.jpg, grappa-kaffee.jpg, aperitivo.jpg, weissbier.jpg, schanigarten.jpg | Bar & Terrasse | Restaurant Guru |
