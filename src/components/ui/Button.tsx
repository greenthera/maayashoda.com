import { Link } from "react-router-dom";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline" | "outline-invert" | "text";

const base = "inline-flex items-center justify-center gap-2.5 rounded-xl font-semibold transition-colors";

const variants: Record<Variant, string> = {
  primary: "min-h-[54px] px-6 bg-brand text-paper text-[15.5px] hover:bg-brand-hover hover:-translate-y-px",
  outline:
    "min-h-[50px] px-[22px] bg-paper text-ink border border-border-strong text-[15px] hover:border-ink",
  "outline-invert":
    "min-h-[52px] px-6 bg-transparent text-paper border border-paper/30 text-[15.5px] hover:border-paper",
  text: "text-brand text-[15px] font-semibold hover:text-brand-hover",
};

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to?: string;
  variant?: Variant;
  arrow?: boolean;
  children: ReactNode;
}

export function Button({ to, href, variant = "primary", arrow, children, className = "", ...rest }: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`.trim();
  const content = (
    <>
      {children}
      {arrow ? <span aria-hidden="true">→</span> : null}
    </>
  );
  if (to) {
    return (
      <Link to={to} className={classes} {...(rest as any)}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} className={classes} {...rest}>
      {content}
    </a>
  );
}
