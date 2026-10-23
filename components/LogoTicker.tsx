import Image from "next/image";

type Logo = { name: string; icon: string };

type LogoTickerProps = {
  logos: Logo[];
};

/**
 * One row of client logos sliding left: each one the brand's own colour icon
 * with its name beside it in paper, after the Fired to Acquired landing page.
 * Linear loop, pause on hover.
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
              <span key={`${logo.name}-${i}`} className="flex shrink-0 items-center gap-3">
                <Image
                  src={logo.icon}
                  alt=""
                  width={44}
                  height={44}
                  className="h-10 w-10 rounded-[22%] ring-1 ring-paper/15 sm:h-11 sm:w-11"
                />
                <span className="whitespace-nowrap text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
                  {logo.name}
                </span>
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}
