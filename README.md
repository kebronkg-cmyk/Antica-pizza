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
assets/fonts/         Bodoni Moda, Instrument Serif, DM Serif Display, Bricolage Grotesque, Caveat
assets/img/pizza/     Freigestellte Pizzen
assets/img/           Mandala-Teller, Maske, gastraum + innen-lampe, kuhfell.webp, Fassade
archiv/               Frühere Stände, komplett lauffähig
```

## Designentscheidungen

- **Schriftzug 1:1 vom Schild:** aus dem Fassadenfoto vektorisiert, zeichnet sich beim Öffnen selbst; im Fuß als goldenes Neon.
- **Bühne:** fünf Pizzen von der Karte, jede mit eigener Farbe, die sich vom Tipp-Punkt aus ausbreitet: Margherita Schwarz (tiefes Schwarz ohne Grauschleier), Salami Ferrari-Rot, Tonno Gelb, Verdure Grün, zum Schluss 4 Formaggi auf sauberem Kuhfell. Teller: der Majolika-Teller aus dem Laden.
- **Überschriften:** DM Serif Display, elegant und etwas kräftiger als die feine Bodoni.
- **Caffè · Pizza · Bar:** drei Bögen wie Ladenfenster, in Schwarz, Rot und Gold.
- **Drinnen:** großes Foto vom Gastraum, die venezianische Maske hängt an der Bildecke; zweites Foto mit Tischlampe; Hinweis auf Fußball live mit drei ausfahrbaren Fernsehern.
- **Google:** Navigation und eigener Abschnitt mit Lorbeer-Medaille.
- **DSGVO:** Schriften lokal, keine Cookies; OpenStreetMap lädt erst nach Klick.

## Archiv & Zurückholen

Frühere Stände liegen komplett lauffähig unter `archiv/` (online z. B. `/archiv/stand-2-schwarz-gold/`). Wie man sie zurückholt, steht in `archiv/README.md`.

## Inhalte pflegen

| Was | Wo |
|---|---|
| Öffnungszeiten | `index.html` (Tabelle `#zeiten`, Fuß, JSON-LD) **und** `assets/js/main.js` (`ZEITEN`, z. B. `21.5` = 21:30) |
| Pizzen auf der Bühne | `assets/js/main.js` (`PIZZEN`: Name, Farbe, Preis, Text) und Bilder in `assets/img/pizza/` |
| Preise / Gerichte | `index.html`, Abschnitt `#karte`. Für vegetarische Gerichte `data-veg` am `<li>` setzen |
| Telefonnummer | Suchen & Ersetzen von `44142500` / `441 425 00` |
| Farben | `assets/css/style.css` → `:root` |

## Quellen der Inhalte

- **Speisekarte, Getränke, Preise, Öffnungszeiten:** Fotos der Karte am Laden (Oktober 2026). Diese Karte gilt; die ältere Karte auf speisekarte.de ist überholt.
- Gästestimmen, Bewertungen: Restaurant Guru, Intravel. Fassadenfoto: mux.de.

### ⚠️ Offen

1. **Caffè-Preise:** Der obere Teil der Getränkekarte (Espresso usw.) war auf dem Foto abgeschnitten, die Kaffees stehen deshalb ohne Preis auf der Seite.
2. **Sonntag:** Auf dem Foto ist nach „Mo.–Sa. 14.00–21.30 Uhr“ der Rest abgeschnitten; die Seite nimmt Sonntag als Ruhetag an.
3. **Allergene:** Die Kennbuchstaben (a, g, …) stehen auf der Karte im Laden; die Legende fehlt auf dem Foto, deshalb sind sie online nicht übernommen.
4. **Bildrechte:** `fassade.jpg` stammt von mux.de. Die Pizzen sind aus dem gelieferten Bild freigestellt.
5. **Impressum & Datenschutz** ausfüllen (gelbe Platzhalter).

### Bildliste

| Datei | Motiv | Quelle |
|---|---|---|
| pizza/*.webp | Margherita, Sucuk, Quattro Formaggi, Tonno, Vegetarisch (freigestellt) | vom Auftraggeber geliefertes Bild |
| fassade.jpg | Ladenfront mit Schirmen | mux.de |
| teller-mandala-*, maske-*, gastraum-*, innen-lampe | Teller, Maske, Regal, Innenraum | eigene Fotos des Auftraggebers |
