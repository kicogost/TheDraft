import Image from "next/image";

type Logo = { name: string; src: string };

type LogoTickerProps = {
  logos: Logo[];
};

/**
 * Two rows of client marks sliding in opposite directions, measured off the
 * Big Desk Energy landing page: 20s linear loop, 80px gaps, pause on hover.
 * Each half of a track repeats the set twice so a 2,500px screen never sees
 * the end of it, and the -50% keyframe lands exactly on the second half.
 *
 * Pure CSS, so it costs nothing to hydrate. The moving copies are hidden from
 * screen readers and the names are listed once for them instead. Under
 * prefers-reduced-motion the global rule in globals.css stops the animation.
 */
export function LogoTicker({ logos }: LogoTickerProps) {
  const rows = [logos, [...logos].reverse()];

  return (
    <div className="logo-ticker">
      <ul className="sr-only">
        {logos.map((logo) => (
          <li key={logo.name}>{logo.name}</li>
        ))}
      </ul>
      {rows.map((row, index) => (
        <div key={index} aria-hidden="true" className="flex w-full overflow-hidden">
          <div className={`logo-ticker-track ${index === 1 ? "logo-ticker-reverse" : ""}`}>
            {[...row, ...row, ...row, ...row].map((logo, i) => (
              <span key={`${logo.name}-${i}`} className="flex shrink-0 items-center gap-3">
                <Image
                  src={logo.src}
                  alt=""
                  width={28}
                  height={28}
                  className="h-7 w-7 rounded-md"
                />
                <span className="whitespace-nowrap text-lg font-semibold text-paper">
                  {logo.name}
                </span>
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
