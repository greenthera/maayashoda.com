interface ImageSlotProps {
  label: string;
  src?: string;
  alt?: string;
  shape?: "rect" | "rounded" | "circle";
  fit?: "cover" | "contain";
  /** Icon-only placeholder with no label — for small logo-sized slots where
   * the caption text wouldn't fit (and is usually shown next to the slot anyway). */
  compact?: boolean;
  className?: string;
}

/**
 * Placeholder for a photograph or logo that has not yet been supplied.
 * Once real assets are available, pass `src`/`alt` and it renders a normal image.
 */
export function ImageSlot({ label, src, alt, shape = "rounded", fit = "cover", compact = false, className = "" }: ImageSlotProps) {
  const radius = shape === "circle" ? "rounded-full" : shape === "rect" ? "rounded-none" : "rounded-2xl";

  if (src) {
    return (
      <img
        src={src}
        alt={alt ?? label}
        className={`h-full w-full ${radius} ${fit === "contain" ? "object-contain" : "object-cover"} ${className}`}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={label}
      className={`flex h-full w-full flex-col items-center justify-center bg-surface-2 ${compact ? "gap-0 p-2" : "gap-2"} ${radius} ${className}`}
    >
      <svg
        width={compact ? "18" : "28"}
        height={compact ? "18" : "28"}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-border-strong"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <circle cx="8.5" cy="9.5" r="1.5" />
        <path d="M21 15l-5-5-9 9" />
      </svg>
      {!compact ? <span className="text-faint px-4 text-center text-xs font-medium leading-snug">{label}</span> : null}
    </div>
  );
}
