/**
 * VolunteerCard — a volunteering card whose data row reads
 * "{joined} volontari partecipano" with "/ {needed}" muted, and whose progress
 * bar reflects filled spots. Same shell as DonationCard, cool accent by default.
 */
import { formatItNumber, toPercent } from "../lib/format";
import type { BaseCardProps } from "../lib/types";
import { ChromaCard } from "./ChromaCard";
import { LocationRow, OrgRow, ProgressBar } from "./CardChrome";

export interface VolunteerCardProps extends BaseCardProps {
  /** Volunteers who have joined, e.g. 0. */
  volunteersJoined: number;
  /** Volunteers needed, e.g. 10. */
  volunteersNeeded: number;
}

export function VolunteerCard({
  image,
  imageAlt,
  title,
  accent = "#6366f1", // indigo-500
  organization,
  location,
  volunteersJoined,
  volunteersNeeded,
  isSaved,
  onToggleSave,
  href,
}: VolunteerCardProps) {
  const percent = toPercent(volunteersJoined, volunteersNeeded);

  return (
    <ChromaCard
      image={image}
      imageAlt={imageAlt}
      title={title}
      accent={accent}
      category="Volontariato"
      href={href}
      isSaved={isSaved}
      onToggleSave={onToggleSave}
    >
      <h3 className="chroma-card__title line-clamp-2 text-[17px] font-bold leading-snug text-white">
        {title}
      </h3>

      <LocationRow location={location} />

      {/* Data row: joined (large) + needed (muted). */}
      <div className="flex items-end justify-between gap-2">
        <span className="text-base font-bold text-white">
          {formatItNumber(volunteersJoined)} volontari partecipano
        </span>
        <span className="pb-0.5 whitespace-nowrap text-sm text-white/50">
          / {formatItNumber(volunteersNeeded)}
        </span>
      </div>

      <ProgressBar
        value={percent}
        label={`${formatItNumber(volunteersJoined)} volontari su ${formatItNumber(
          volunteersNeeded
        )}`}
      />

      <OrgRow name={organization.name} avatarUrl={organization.avatarUrl} />
    </ChromaCard>
  );
}
