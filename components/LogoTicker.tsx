import Image from "next/image";

type Logo = { name: string; src: string; width: number; height: number };

type LogoTickerProps = {
  logos: Logo[];
};

/**
 * One row of client wordmarks sliding left, after the Big Desk Energy landing
 * page: linear loop, 80px gaps, pause on hover, every mark flattened to white
 * so a set of mismatched brand colours reads as one strip. Width and height
 * per logo come from content/newsletter.json, because wordmarks differ in
 * shape and a single height makes the squat ones look tiny.
 *
 * The track repeats the set four times and the -50% keyframe lands exactly
 * on the third copy, which keeps a 2,560px screen covered at every point in
 * the loop. Pure CSS, so it costs nothing to hydrate. The moving copies are
 * hidden from screen readers and the names are listed once for them instead.
 * Under prefers-reduced-motion the global rule in globals.css stops it.
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
          {Array.from({ length: 4 }, () => logos)
            .flat()
            .map((logo, i) => (
              <Image
                key={`${logo.name}-${i}`}
                src={logo.src}
                alt=""
                width={logo.width}
                height={logo.height}
                className="shrink-0 brightness-0 invert"
                style={{ width: logo.width, height: logo.height }}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
