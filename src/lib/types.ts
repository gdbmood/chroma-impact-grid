/** Shared prop types for the impact cards. */

export interface Organization {
  name: string;
  avatarUrl: string;
}

/** Props common to both DonationCard and VolunteerCard. */
export interface BaseCardProps {
  /** Hero image URL. */
  image: string;
  /** Card heading (clamped to 2 lines). */
  title: string;
  /** Accent color as a hex string, e.g. "#10b981". Drives border + glow. */
  accent?: string;
  /** Owning organization (name + avatar). */
  organization: Organization;
  /** Human-readable location, e.g. "Napoli, Italy". */
  location: string;
  /** Whether the card is currently bookmarked. */
  isSaved?: boolean;
  /** Fired when the bookmark button is pressed. */
  onToggleSave?: () => void;
  /** Optional destination — renders the card as an anchor when set. */
  href?: string;
  /** Optional alt text override for the hero image. */
  imageAlt?: string;
}
