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
index.html            One-Pager: Pizza-Bühne, Laufband, Tageszeiten, Speisekarte, Gäste, Besuch
impressum.html        Vorlage – Platzhalter [gelb markiert] ausfüllen!
datenschutz.html      Vorlage – Platzhalter ausfüllen und prüfen lassen!
favicon.svg
assets/css/style.css  Design-Tokens oben in :root (Farben, Schriften)
assets/js/main.js     Pizza-Bühne, Live-Öffnungsstatus, Tagesbogen, Karte-Reiter, Veggie-Filter
assets/fonts/         Bodoni Moda, Bricolage Grotesque, Caveat (selbst gehostet, DSGVO-freundlich)
assets/img/pizza/     Freigestellte Pizzen (WebP, 160/480/800 px)
assets/img/fassade.jpg
```

## Designentscheidungen

- **Schriftzug vom Ladenschild:** Das „ANTICA“ im Kopf und im Fuß ist ein eigenes SVG, nachgezeichnet nach dem handgemalten Schild. Blattgold-Verlauf und eine Pinselkante (SVG-Filter) machen es lebendig. Im Fuß malt es sich beim Hinscrollen Strich für Strich selbst.
- **Farben vom Laden:** Schild schwarz-gold, die grünen Ayinger-Schirme, die türkisen Stühle, die orange Wand neben der Tür und die Trikolore unter dem Schriftzug. Jede Pizza auf der Bühne hat eine dieser Farben.
- **Pizza-Bühne:** Fünf freigestellte Pizzen zum Antippen, Wischen oder per Pfeiltaste. Die neue Farbe wächst als Kreis von der Stelle, an der getippt wurde, die Pizza rollt herein. Mit der Maus über der Pizza hebt sich ein Stück an.
- **Schrift:** *Bodoni Moda* (die Bodoni stammt aus Parma) für Überschriften, *Bricolage Grotesque* für Text, *Caveat* als Kreide-Handschrift wie auf der Tafel vor dem Laden.
- **Details:** Ein Sonne-/Mond-Bogen zeigt live, ob gerade Caffè-, Pizza- oder Bar-Zeit ist. Tafel „Stück Pizza to go“, Postkarte mit Stempel, Gäste-Zettel mit Klebeband.
- **Fotos:** Nur Bilder in brauchbarer Qualität. Die kleinen Gästefotos sind raus. Bessere eigene Fotos können später dazukommen.
- **DSGVO:** Schriften lokal, keine Cookies, OpenStreetMap lädt erst nach Klick.

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
