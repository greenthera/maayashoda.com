import { useInView } from "../../hooks/useInView";

/**
 * The Human Milk Bank Van sitting directly on the page: a transparent-background
 * cutout with a CSS `drop-shadow` so the shadow follows the van's shape and it
 * reads as resting on the page. On the homepage (`animate`) it rolls in from the
 * left when scrolled into view, then keeps a very subtle idle bob; elsewhere it
 * renders static. The bob is `motion-safe`; the roll-in collapses under the
 * global reduced-motion transition override.
 */
export function VanScene({ animate = false, className = "" }: { animate?: boolean; className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const rolledIn = !animate || inView;

  return (
    <div ref={ref} className={`flex items-center justify-center ${className}`}>
      <div
        className={`w-full max-w-[520px] transition-all duration-[900ms] ease-out ${
          rolledIn ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
        }`}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/project/van-cutout.webp`}
          alt="The Yashoda Maa Human Milk Bank Van"
          width={1175}
          height={534}
          className={`block h-auto w-full object-contain drop-shadow-[0_18px_14px_rgba(15,12,40,0.34)] ${
            animate && inView ? "motion-safe:animate-van-bob" : ""
          }`}
          style={animate ? { animationDelay: "0.9s" } : undefined}
        />
      </div>
    </div>
  );
}
