/**
 * Shared chrome for the impact cards: the glass category pill, the circular
 * glass bookmark toggle, the accent progress bar, and the organization row.
 * These are intentionally small and presentational so DonationCard and
 * VolunteerCard can compose them without duplication.
 */
import { BookmarkIcon, PinIcon } from "./icons";

/** Small frosted "category" pill (e.g. "Donazione" / "Volontariato"). */
export function CategoryPill({ label }: { label: string }) {
  return (
    <span className="pointer-events-none inline-flex items-center rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs font-semibold tracking-wide text-white/90 shadow-sm backdrop-blur-md">
      {label}
    </span>
  );
}

/** Circular glass bookmark button — toggles filled/outline. */
export function BookmarkButton({
  isSaved = false,
  onToggle,
}: {
  isSaved?: boolean;
  onToggle?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        // Don't let the click bubble to a wrapping anchor.
        e.preventDefault();
        e.stopPropagation();
        onToggle?.();
      }}
      aria-pressed={isSaved}
      aria-label={isSaved ? "Rimosso dai salvati" : "Salva"}
      title={isSaved ? "Rimosso dai salvati" : "Salva"}
      className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-black/40 text-white/90 shadow-sm backdrop-blur-md outline-none transition hover:bg-black/60 hover:text-white focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
    >
      <BookmarkIcon filled={isSaved} className="h-[18px] w-[18px]" />
    </button>
  );
}

/** Location row with a pin icon. */
export function LocationRow({ location }: { location: string }) {
  return (
    <div className="flex items-center gap-1.5 text-sm text-white/80">
      <PinIcon className="h-4 w-4 shrink-0 text-white/70" />
      <span className="truncate">{location}</span>
    </div>
  );
}

/**
 * Slim accent progress bar. `value` is a clamped 0–100 percentage. The fill
 * uses the card accent (via the --accent-rgb CSS var) with a faint glow.
 */
export function ProgressBar({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="h-1.5 w-full overflow-hidden rounded-full bg-black/30"
    >
      <div
        className="h-full rounded-full"
        style={{
          width: `${value}%`,
          background: "rgba(255, 255, 255, 0.95)",
          boxShadow: "0 0 10px 0 rgba(255, 255, 255, 0.55)",
        }}
      />
    </div>
  );
}

/** Organization avatar + name row. */
export function OrgRow({
  name,
  avatarUrl,
}: {
  name: string;
  avatarUrl: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <img
        src={avatarUrl}
        alt=""
        loading="lazy"
        className="h-6 w-6 rounded-full border border-white/15 object-cover"
      />
      <span className="truncate text-sm font-medium text-white/90">{name}</span>
    </div>
  );
}
