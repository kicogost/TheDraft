import Image from "next/image";

type Logo = { name: string; icon: string };

type LogoTickerProps = {
  logos: Logo[];
};

/**
 * One row of client logos sliding left: each one the brand's own colour icon
 * on a white tile with its name beside it in paper, matching the Fired to
 * Acquired landing page. The tile evens out icons that mix transparent and
 * solid backgrounds.
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
              <span key={`${logo.name}-${i}`} className="flex shrink-0 items-center gap-[13px]">
                <Image
                  src={logo.icon}
                  alt=""
                  width={38}
                  height={38}
                  className="h-6 w-6 rounded-[9px] bg-white object-contain p-1 sm:h-[38px] sm:w-[38px]"
                />
                <span className="whitespace-nowrap text-lg font-bold tracking-[-0.03em] text-paper/90 sm:text-[30px]">
                  {logo.name}
                </span>
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}
