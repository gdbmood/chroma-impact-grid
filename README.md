# Chroma Impact Grid

Dark, glassy `DonationCard` + `VolunteerCard` for an Italian impact / nonprofit
platform, plus a pointer-tracked `ChromaGrid` spotlight wrapper — inspired by
[ReactBits ChromaGrid](https://www.reactbits.dev/components/chroma-grid).

Each card carries its own `accent` hex which drives a gradient border and outer
glow. Inside a `ChromaGrid` cards sit desaturated + dimmed, snapping to full
colour under the cursor spotlight. A frosted-glass footer holds the text.

**Stack:** React + TypeScript, Tailwind CSS v3, GSAP (pointer smoothing).

## Run the demo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
```

The demo page is [`src/ChromaImpactGrid.tsx`](src/ChromaImpactGrid.tsx).

## Files

| File | Purpose |
| --- | --- |
| `src/components/DonationCard.tsx` | Fundraising card (raised/goal + progress) |
| `src/components/VolunteerCard.tsx` | Volunteering card (joined/needed + progress) |
| `src/components/ChromaCard.tsx` | Shared shell: gradient border, image, glass footer |
| `src/components/ChromaGrid.tsx` | Responsive grid + GSAP spotlight wrapper |
| `src/components/CardChrome.tsx` | Glass pill, bookmark button, progress bar, org row |
| `src/components/icons.tsx` | Inline pin + bookmark icons |
| `src/lib/format.ts` | it-IT number/money formatting, hex→rgb, clamp |
| `src/lib/types.ts` | Shared prop types |
| `src/index.css` | Accent-driven CSS (border, glass footer, spotlight) |

## Drop into an existing app

1. Copy `src/components/`, `src/lib/`, and the `@layer components` block from
   `src/index.css` into your project (Tailwind v3 + the `line-clamp` utility).
2. Add GSAP: `npm i gsap`.
3. Render cards inside the grid:

```tsx
import { ChromaGrid, DonationCard, VolunteerCard } from "./components";

<ChromaGrid /* spotlight={false} on a plain light page */>
  <DonationCard
    image="/hero.jpg"
    title="Rural Education"
    accent="#10b981"
    organization={{ name: "VEGA", avatarUrl: "/vega.svg" }}
    location="Napoli, Italy"
    raised={2355}
    goal={20000}
    isSaved={saved}
    onToggleSave={() => setSaved((s) => !s)}
    href="/campaigns/rural-education"
  />
  <VolunteerCard
    image="/hero2.jpg"
    title="Lettori ad alta voce in ospedale"
    accent="#8b5cf6"
    organization={{ name: "Voce per Tutti", avatarUrl: "/vpt.svg" }}
    location="Napoli, Italy"
    volunteersJoined={0}
    volunteersNeeded={15}
  />
</ChromaGrid>
```

### Notes

- **Controlled bookmark:** pass `isSaved` + `onToggleSave`. The button carries
  `aria-pressed` and an Italian aria-label ("Salva" / "Rimosso dai salvati").
- **`spotlight` prop** (default `true`): set `false` to keep images in full
  colour on a plain page — only hover glow/lift react.
- **Accessibility:** anchor/button semantics, keyboard focus rings, image alt
  text, and `role="progressbar"` with `aria-valuenow/min/max`.
- **Reduced motion:** hover lift, image zoom, and spotlight easing are disabled
  under `prefers-reduced-motion`.
- **No storage:** components are self-contained; saved state lives in React.
- **UI copy** is Italian but isolated to the components for easy swapping.
