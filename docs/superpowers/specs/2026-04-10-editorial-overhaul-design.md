# Editoriale Overhaul — Design Spec

**Datum:** 2026-04-10  
**Project:** Akin Visuals  
**Aanpak:** Aanpak 2 — Editoriale Overhaul  
**Doel:** Site-breed de "AI-template" patronen verwijderen terwijl het donker-paarse kleurpalet behouden blijft.

---

## Probleemstelling

De huidige site heeft vier patronen die hem generiek doen aanvoelen:

1. **Paarse floating blobs** — `hero-blob-1/2/3` in de hero, overal gebruikt in AI-gegenereerde sites
2. **Glassmorphism cards** — `backdrop-filter: blur` + transparante achtergronden op alle `.glass-card` componenten
3. **Symmetrische grids** — elke sectie gebruikt `grid-cols-3` of `grid-cols-2` met gelijke kolommen
4. **Gradient headline tekst** — `gradient-text` class op elke `h1`, paars→blauw verloop

---

## Wat niet verandert

- Kleurpalet (donker paars, `#e0b6ff`, `#bdc2ff`, `#0a0a0f`)
- Custom cursor (cursor-dot + cursor-ring — al aanwezig)
- GSAP animaties (tilt, fade-up, scroll)
- Fonts (`var(--font-headline)`, `var(--font-body)`, `var(--font-label)`)
- YouTube/TikTok mockup functionaliteit in Portfolio
- Contactformulier
- i18n structuur (next-intl)

---

## Globale wijzigingen

### 1. Grain texture (site-breed)

Elke `<section>` krijgt een grain texture via een CSS `::before` pseudo-element. Geen extra afbeeldingen nodig — SVG `feTurbulence` filter inline als data-URI.

```css
.section-grain::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: url("data:image/svg+xml,...feTurbulence baseFrequency='0.88' numOctaves='4'...");
  opacity: 0.55;
  z-index: 0;
}
```

Alle sectie-content krijgt `position: relative; z-index: 1` zodat het boven de grain valt.

### 2. Typografie systeem

Gradient headlines vervangen door gewicht + kleuraccent op één woord:

| Was | Wordt |
|-----|-------|
| `<span class="gradient-text">content</span>` | `font-weight: 900` wit + één woord in `color: #e0b6ff` + italic |
| Alle koppen zelfde grootte | Mix: XL woord (font-size groot) / normaal / italic klein |
| Symmetrisch label/titel/subtitle patroon | Eyebrow in monospace (`font-family: 'Courier New'`) |

### 3. Cards — geen glassmorphism

Alle `.glass-card` instanties vervangen door solid dark cards:

```css
/* Was */
.glass-card {
  background: rgba(255,255,255,0.04);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.08);
}

/* Wordt */
.solid-card {
  background: #0c0c18;
  border: 1px solid rgba(255,255,255,0.1);
}
```

---

## Sectie-specifieke wijzigingen

### Hero (`components/sections/Hero.tsx`)

**Grid:** van `grid-cols-1 lg:grid-cols-2` (50/50) naar `grid-cols-1 lg:grid-cols-[5fr_4fr]`

**Achtergrond:** `hero-blob-1`, `hero-blob-2`, `hero-blob-3` verwijderen. Vervangen door één `radial-gradient` op de sectie zelf + grain texture.

**Koptekst `h1`:** `gradient-text` span verwijderen. Nieuwe structuur:
```jsx
<h1>
  <span style={{ fontSize: 'clamp(3.5rem,6vw,5.5rem)', fontWeight: 900 }}>Visuals</span>
  <span style={{ fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 400, fontStyle: 'italic', color: 'rgba(225,226,231,0.55)' }}>die mensen</span>
  <span style={{ fontSize: 'clamp(3rem,5.5vw,4.8rem)', fontWeight: 900, color: '#e0b6ff' }}>bewegen.</span>
</h1>
```

**Eyebrow:** monospace font toevoegen (`font-family: 'Courier New', monospace`).

**Scheidingslijn:** `2px` horizontale `#e0b6ff` lijn tussen kop en subtitel.

### Services (`components/sections/Services.tsx`)

**Layout:** van `grid-cols-1 md:grid-cols-3` naar verticale genummerde lijst.

**Structuur per dienst:**
```
[01]  Long-form Video          Vraag prijs
      YouTube · Cinematic

[02]  Content Systeem          Aanbevolen   ← paars accent
      Full-service · Planning

[03]  Short-form Content       Vraag prijs
      TikTok · Reels
```

**Material icons** (`movie`, `hub`, `smartphone`) verwijderen. Nummers (`01`, `02`, `03`) in monospace als visueel element.

**Aanbevolen dienst:** grotere `font-size` + `color: #e0b6ff` op titel en label. Geen externe badge meer.

### About (`components/sections/About.tsx`)

**Grid:** van `lg:grid-cols-12` (7/5) naar `grid-cols-[4fr_3fr]`

**Foto (links, 4fr):** neemt meer ruimte in. BTS-caption onderaan in monospace.

**Zijbalk (rechts, 3fr):** tekst bovenaan, statistieken onderaan als verticale lijst met `border-top` dividers — niet meer als 3 gelijke kolommen.

```
Statistieken (verticaal):
─────────────────
120+   Projecten
─────────────────
3 jr   Ervaring
─────────────────
4K     Kwaliteit
```

### Portfolio (`components/sections/Portfolio.tsx`)

**Platform cards** (`.platform-card`): `glass-card` stijl vervangen door solid dark card.  
**YT/TikTok mockup functionaliteit:** ongewijzigd.

### Testimonials, Contact, Footer

Alleen grain texture toevoegen + `.glass-card` vervangen door solid variant. Structuur en content ongewijzigd.

---

## Implementatievolgorde

1. **Globaal eerst:** grain texture CSS utility + typografie-aanpassingen in `globals.css`
2. **Hero** — grootste visuele impact, meteen zichtbaar
3. **Services** — structurele herwrite (van grid naar lijst)
4. **About** — grid aanpassen + stats herstructureren
5. **Portfolio, Testimonials, Contact, Footer** — card-stijl + grain texture

---

## Succescriteria

- Geen enkele `hero-blob` class meer zichtbaar in de DOM
- Geen `gradient-text` class op koppen
- Geen `backdrop-filter: blur` op cards
- Elke sectie heeft grain texture
- Elke `h1` gebruikt gewicht/italic contrast in plaats van kleurverloop
- Site voelt als een bewuste designkeuze, niet als een AI-template
