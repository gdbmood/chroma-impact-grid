/**
 * DonationCard — a fundraising card with a raised/goal money row and a slim
 * accent progress bar. Drop it into a <ChromaGrid> for the spotlight effect,
 * or use it standalone on any dark surface.
 */
import { formatItNumber, formatMoney, toPercent } from "../lib/format";
import type { BaseCardProps } from "../lib/types";
import { ChromaCard } from "./ChromaCard";
import { LocationRow, OrgRow, ProgressBar } from "./CardChrome";

export interface DonationCardProps extends BaseCardProps {
  /** Amount raised so far, e.g. 2355. */
  raised: number;
  /** Fundraising goal, e.g. 20000. */
  goal: number;
  /** Currency glyph, default "€". */
  currency?: string;
}

export function DonationCard({
  image,
  imageAlt,
  title,
  accent = "#10b981", // emerald-500
  organization,
  location,
  raised,
  goal,
  currency = "€",
  isSaved,
  onToggleSave,
  href,
}: DonationCardProps) {
  const percent = toPercent(raised, goal);

  return (
    <ChromaCard
      image={image}
      imageAlt={imageAlt}
      title={title}
      accent={accent}
      category="Donazione"
      href={href}
      isSaved={isSaved}
      onToggleSave={onToggleSave}
    >
      <h3 className="chroma-card__title line-clamp-2 text-[17px] font-bold leading-snug text-white">
        {title}
      </h3>

      <LocationRow location={location} />

      {/* Money row: raised (large) + goal (muted). */}
      <div className="flex items-end justify-between gap-2">
        <span className="text-xl font-extrabold text-white">
          {formatMoney(raised, currency)}
        </span>
        <span className="pb-0.5 text-sm text-white/50">
          su {currency}
          {formatItNumber(goal)}
        </span>
      </div>

      <ProgressBar
        value={percent}
        label={`Raccolti ${formatMoney(raised, currency)} su ${formatMoney(
          goal,
          currency
        )}`}
      />

      <OrgRow name={organization.name} avatarUrl={organization.avatarUrl} />
    </ChromaCard>
  );
}
