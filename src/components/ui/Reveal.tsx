import { Children, cloneElement, isValidElement, type CSSProperties, type ElementType, type ReactNode } from "react";
import { useInView } from "../../hooks/useInView";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Element to render as the container (e.g. "ul", "ol"). Defaults to "div". */
  as?: ElementType;
  /** Delay between consecutive children, in ms. */
  step?: number;
  /** Vertical travel, in px. */
  y?: number;
}

/**
 * Container that fades and lifts its direct children into place in a short
 * stagger the first time it scrolls into view. Mirrors the reveal behaviour of
 * `Section`: content is visible by default and only animates when it starts
 * below the fold, so slow JS or reduced motion never leaves boxes hidden.
 */
export function Reveal({ children, className = "", as: Tag = "div", step = 60, y = 10 }: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <Tag ref={ref} className={className}>
      {Children.map(children, (child, i) => {
        if (!isValidElement(child)) return child;
        const el = child as React.ReactElement<{ style?: CSSProperties }>;
        return cloneElement(el, {
          style: {
            ...el.props.style,
            opacity: inView ? 1 : 0,
            translate: inView ? undefined : `0 ${y}px`,
            // Inline so it always wins over any `transition-*` utility on the child.
            transitionProperty: "opacity, translate, transform",
            transitionDuration: "500ms",
            transitionTimingFunction: "cubic-bezier(0.22, 0.7, 0.2, 1)",
            transitionDelay: inView ? `${i * step}ms` : "0ms",
          },
        });
      })}
    </Tag>
  );
}
