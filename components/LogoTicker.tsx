import Image from "next/image";

type Logo = { name: string; src: string };

type LogoTickerProps = {
  logos: Logo[];
};

/**
 * One row of client icons sliding left, after the Big Desk Energy landing
 * page: linear loop, 80px gaps, pause on hover. Icons only, no names, so the
 * row reads as a strip of marks. The track repeats the set six times and the
 * -50% keyframe lands exactly on the fourth copy, which keeps a 2,560px
 * screen covered at every point in the loop.
 *
 * Pure CSS, so it costs nothing to hydrate. The moving copies are hidden from
 * screen readers and the names are listed once for them instead. Under
 * prefers-reduced-motion the global rule in globals.css stops the animation.
 */
export function LogoTicker({ logos }: LogoTickerProps) {
  return (
    <div className="logo-ticker">
      <ul className="sr-only">
        {logos.map((logo) => (
          <li key={logo.name}>{logo.name}</li>
        ))}
      </ul>
      <div aria-hidden="true" className="flex w-full overflow-hidden">
        <div className="logo-ticker-track">
          {Array.from({ length: 6 }, () => logos)
            .flat()
            .map((logo, i) => (
              <Image
                key={`${logo.name}-${i}`}
                src={logo.src}
                alt=""
                width={64}
                height={64}
                className="h-14 w-14 shrink-0 rounded-xl ring-1 ring-paper/20 sm:h-16 sm:w-16"
              />
            ))}
        </div>
      </div>
    </div>
  );
}
