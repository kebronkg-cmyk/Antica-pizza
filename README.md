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
index.html            One-Pager: Bühne, Laufband, Tageszeiten, Drinnen, Karte, Google-Stimmen, Besuch
assets/css/style.css  Design-Tokens oben in :root, Bühnenfarben unter html[data-farbe=…]
assets/js/main.js     Bühne, Farbwahl, Öffnungsstatus + Neon, Tagesbogen, Karte, Stimmen
assets/fonts/         Bodoni Moda, Instrument Serif, Bricolage Grotesque, Caveat, Rye (Western)
assets/img/pizza/     Freigestellte Pizzen
assets/img/           Mandala-Teller, Maske, Innenraumfotos, kuhfell.webp, Fassade
archiv/               Frühere Stände, komplett lauffähig
```

## Designentscheidungen

- **Schriftzug 1:1 vom Schild:** „ANTICA – CAFFE PIZZA BAR“ ist direkt aus dem Fassadenfoto vektorisiert. Er zeichnet sich beim Öffnen selbst; im Fuß leuchtet er als goldenes Neon.
- **Bühne:** Vier Pizzen von der Karte, jede bringt ihre Farbe mit, die sich beim Wechsel vom Tipp-Punkt aus über die ganze Fläche ausbreitet: Margherita in Ferrari-Rot (Lack mit Glanz), Tonno in Azzurro, Vegetarisch in Giallo, zum Schluss die Empfehlung Quattro Formaggi auf Kuhfell. Die Pizzen liegen auf dem Majolika-Teller aus dem Laden.
- **Kuhfell:** nur noch auf der Bühne bei der letzten Pizza; als fertiges Bild (`kuhfell.webp`), das per GPU wandert, damit nichts ruckelt.
- **Drinnen:** zwei große Fotos aus dem Laden in feinen Goldrahmen, dazu die freigestellte venezianische Maske.
- **Google:** in der Navigation und als eigener Abschnitt mit Lorbeer-Medaille und Link.
- **Neon:** „aperto/chiuso“ an der Pizza (live nach Öffnungszeit), „Aperitivo“, Öffnungszeiten, Schriftzug im Fuß.
- **DSGVO:** Schriften lokal, keine Cookies; OpenStreetMap lädt erst nach Klick.

## Archiv & Zurückholen

Frühere Stände liegen komplett lauffähig unter `archiv/` (online z. B. `/archiv/stand-2-schwarz-gold/`). Wie man sie zurückholt, steht in `archiv/README.md`.

## Inhalte pflegen

| Was | Wo |
|---|---|
| Öffnungszeiten | `index.html` (Tabelle `#zeiten`, Fuß, JSON-LD) **und** `assets/js/main.js` (`ZEITEN`) |
| Pizzen auf der Bühne | `assets/js/main.js` (`PIZZEN`: Name, Farbe, Preis, Text) und Bilder in `assets/img/pizza/` |
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
3. **Bildrechte:** `fassade.jpg` stammt von mux.de. Dafür braucht ihr die Rechte, oder ihr ersetzt es durch ein eigenes Foto mit gleichem Dateinamen. Die Pizzen sind aus dem gelieferten Bild freigestellt. Sollen sie echte Antica-Pizzen zeigen, einfach neue Freisteller mit gleichem Namen ablegen.
4. **Impressum & Datenschutz** ausfüllen (gelbe Platzhalter). Im Münchner Stadtbranchenbuch steht unter dieser Straße die Firma „L´antica Bella Italia GmbH“, mit dem Inhaber abklären.
5. Domain: Verzeichnisse nennen `antica-muenchen.de`, die Domain war aber nicht erreichbar.

### Bildliste

| Datei | Motiv | Quelle |
|---|---|---|
| pizza/*.webp | Margherita, Sucuk, Quattro Formaggi, Tonno, Vegetarisch (freigestellt) | vom Auftraggeber geliefertes Bild |
| fassade.jpg | Ladenfront mit Schirmen | mux.de |
| teller-mandala-*, maske-*, innen-* | Teller, Maske, Regal, Innenraum | eigene Fotos des Auftraggebers |
