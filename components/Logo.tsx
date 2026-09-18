type LogoMarkProps = {
  className?: string;
};

/**
 * The envelope mark from the brand logo, traced from the source PNG so it can
 * be recoloured per surface and used at favicon sizes. Geometry: a rectangle
 * with a V notch cut from the top edge, apex at 49.9% across and 56.4% down.
 */
export function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 470 331"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M0 0 L235 187 L470 0 L470 331 L0 331 Z" />
    </svg>
  );
}

type LogoProps = {
  /** Tile fill and mark colour. The nav uses accent, the footer uses paper. */
  tone?: "accent" | "paper";
  size?: "sm" | "lg";
  name: string;
};

export function Logo({ tone = "accent", size = "sm", name }: LogoProps) {
  const tile =
    tone === "accent" ? "bg-accent text-paper" : "bg-paper text-accent";
  const box = size === "lg" ? "h-11 w-11" : "h-9 w-9";
  const mark = size === "lg" ? "w-6" : "w-5";
  const word = size === "lg" ? "text-3xl" : "text-xl";

  return (
    <span className="flex items-center gap-3">
      <span className={`grid shrink-0 place-items-center ${box} ${tile}`}>
        <LogoMark className={mark} />
      </span>
      <span className={`font-display uppercase leading-none tracking-wide ${word}`}>
        {name}
      </span>
    </span>
  );
}
