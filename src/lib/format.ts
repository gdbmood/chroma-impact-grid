/** Formatting + color helpers shared by the impact cards. */

/** Clamp a number to the [min, max] range. */
export function clamp(value: number, min = 0, max = 100): number {
  return Math.min(max, Math.max(min, value));
}

/**
 * it-IT integer formatting → dot thousands separators (e.g. 20000 → "20.000",
 * 2355 → "2.355"). Done manually rather than via Intl.NumberFormat because the
 * it-IT locale omits grouping for 4-digit values, and the `useGrouping:"always"`
 * option isn't typed under older TS libs — this keeps the wanted formatting
 * without a locale/type dependency.
 */
export function formatItNumber(value: number): string {
  const n = Math.round(Math.abs(value));
  const grouped = n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return value < 0 ? `-${grouped}` : grouped;
}

/** Money in it-IT with a currency glyph prefix (default "€"). */
export function formatMoney(value: number, currency = "€"): string {
  return `${currency}${formatItNumber(value)}`;
}

/** raised/goal (or joined/needed) as a clamped 0–100 percentage. */
export function toPercent(current: number, target: number): number {
  if (!target || target <= 0) return 0;
  return clamp((current / target) * 100, 0, 100);
}

/**
 * Parse a #hex color into an "r, g, b" triplet string, usable inside
 * `rgba(var(--accent-rgb), a)`. Falls back to a neutral emerald on bad input.
 */
export function hexToRgbTriplet(hex: string): string {
  let h = hex.trim().replace(/^#/, "");
  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return "16, 185, 129"; // emerald-500
  const int = parseInt(h, 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `${r}, ${g}, ${b}`;
}
