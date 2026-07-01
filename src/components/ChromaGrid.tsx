/**
 * ChromaGrid — a responsive grid that tracks the pointer and paints a
 * spotlight over its children (ReactBits "ChromaGrid" style).
 *
 * The container exposes --x / --y / --r CSS vars. A single overlay layer sits
 * above the cards with a grayscale + dim backdrop-filter, masked by a radial
 * gradient centred on the pointer: outside the spotlight radius the cards read
 * desaturated and dimmed, inside they snap to full colour with a feathered
 * edge. On mouse-leave the radius eases to 0 so the whole grid fades to gray.
 *
 * Pointer smoothing uses GSAP (tween a proxy → write px vars), which sidesteps
 * the unit ambiguity of animating CSS vars directly. With `spotlight={false}`
 * no overlay renders — cards stay full colour and only hover glow/lift react,
 * so the same cards work on a plain page.
 */
import {
  useEffect,
  useRef,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { gsap } from "gsap";

export interface ChromaGridProps {
  children: ReactNode;
  /** Enable the pointer-tracked spotlight (default true). */
  spotlight?: boolean;
  /** Spotlight radius in px (default 320). */
  radius?: number;
  /** Extra classes for the inner grid element. */
  className?: string;
}

const DEFAULT_GRID =
  "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

export function ChromaGrid({
  children,
  spotlight = true,
  radius = 320,
  className,
}: ChromaGridProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const proxy = useRef({ x: 0, y: 0, r: 0 });

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const writeVars = () => {
    const el = rootRef.current;
    if (!el) return;
    el.style.setProperty("--x", `${proxy.current.x}px`);
    el.style.setProperty("--y", `${proxy.current.y}px`);
    el.style.setProperty("--r", `${proxy.current.r}px`);
  };

  // Keep the spotlight in sync if it's toggled off while tweens are queued.
  useEffect(() => {
    if (!spotlight) {
      gsap.killTweensOf(proxy.current);
      proxy.current.r = 0;
      writeVars();
    }
  }, [spotlight]);

  const handleMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!spotlight) return;
    const el = rootRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const duration = reduceMotion ? 0 : 0.3;
    gsap.to(proxy.current, {
      x,
      y,
      r: radius,
      duration,
      ease: "power3.out",
      overwrite: "auto",
      onUpdate: writeVars,
    });
  };

  const handleLeave = () => {
    if (!spotlight) return;
    gsap.to(proxy.current, {
      r: 0,
      duration: reduceMotion ? 0 : 0.45,
      ease: "power2.out",
      overwrite: "auto",
      onUpdate: writeVars,
    });
  };

  const style: CSSProperties = {
    ["--x" as string]: "50%",
    ["--y" as string]: "50%",
    ["--r" as string]: "0px",
  };

  return (
    <div
      ref={rootRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="relative"
      style={style}
    >
      <div className={className ?? DEFAULT_GRID}>{children}</div>

      {spotlight && (
        <div aria-hidden className="chroma-spotlight pointer-events-none" />
      )}
    </div>
  );
}
