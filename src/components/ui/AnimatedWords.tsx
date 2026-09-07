import { Fragment, type CSSProperties } from "react";

/**
 * Renders text with each word in an inline-block span that fades and rises into
 * place on mount, in a short left-to-right stagger. One-time load flourish for
 * page headings. Respects reduced motion via the global animation override in
 * index.css (words simply appear). Falls back to plain text with no JS.
 */
export function AnimatedWords({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={`animate-words ${className}`.trim()}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span style={{ "--word-delay": `${Math.min(i * 45, 400)}ms` } as CSSProperties}>{word}</span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
