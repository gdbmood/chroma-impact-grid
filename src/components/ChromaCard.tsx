/**
 * ChromaCard — the shared visual shell for the impact cards.
 *
 * Renders: an accent gradient border, a clipped hero image that scales on
 * hover, the glass category pill (top-left) + bookmark button (top-right),
 * and a frosted-glass footer (children) sitting over a bottom-up accent wash.
 *
 * Colour is driven entirely by the `--accent-rgb` CSS var set on the root, so
 * every instance can carry its own hue. Renders as an <a> when `href` is set,
 * otherwise a plain <article>.
 */
import type { ReactNode } from "react";
import { hexToRgbTriplet } from "../lib/format";
import { BookmarkButton, CategoryPill } from "./CardChrome";

export interface ChromaCardProps {
  image: string;
  imageAlt?: string;
  title: string;
  accent: string;
  category: string;
  href?: string;
  isSaved?: boolean;
  onToggleSave?: () => void;
  /** Footer content (title, meta, progress, org…). */
  children: ReactNode;
}

export function ChromaCard({
  image,
  imageAlt,
  title,
  accent,
  category,
  href,
  isSaved,
  onToggleSave,
  children,
}: ChromaCardProps) {
  const rgb = hexToRgbTriplet(accent);

  const inner = (
    <>
      {/* Hero image fills the whole card; the footer frosts over its lower half. */}
      <img
        src={image}
        alt={imageAlt ?? title}
        loading="lazy"
        className="chroma-card__img absolute inset-0 h-full w-full object-cover"
      />
      {/* Scrim so the pill/bookmark stay legible over bright images. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/45 to-transparent"
      />

      {/* Top overlay row: category pill + bookmark. */}
      <div className="absolute inset-x-0 top-0 z-20 flex items-start justify-between p-3.5">
        <CategoryPill label={category} />
        <BookmarkButton isSaved={isSaved} onToggle={onToggleSave} />
      </div>

      {/* Accent bleed rising into the image above the footer. */}
      <div
        aria-hidden
        className="chroma-card__wash pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-56"
      />

      {/* Frosted colored footer. */}
      <div className="chroma-card__footer absolute inset-x-0 bottom-0 z-10 flex flex-col gap-3 p-4 pt-5">
        {children}
      </div>
    </>
  );

  const sharedInner = (
    <span className="chroma-card__frame block h-full">
      <span className="chroma-card__inner relative block h-full min-h-[380px]">
        {inner}
      </span>
    </span>
  );

  const style = { ["--accent-rgb" as string]: rgb } as React.CSSProperties;

  if (href) {
    return (
      <a
        href={href}
        aria-label={title}
        className="chroma-card group relative block outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        style={style}
      >
        {sharedInner}
      </a>
    );
  }

  return (
    <article
      className="chroma-card group relative block"
      style={style}
    >
      {sharedInner}
    </article>
  );
}
