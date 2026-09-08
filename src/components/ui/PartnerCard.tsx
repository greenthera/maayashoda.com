/** Partner logo card used in the home hero strip and the "Together for every tiny life" marquee. */
export function PartnerCard({ logo, name }: { logo: string; name: string }) {
  return (
    <div className="border-border flex w-64 flex-none flex-col overflow-hidden rounded-[20px] border bg-white shadow-[0_10px_30px_-10px_rgba(32,24,89,0.22)]">
      <div className="flex h-18.5 items-center justify-center px-6">
        <img src={logo} alt="" loading="lazy" className="max-h-14 w-auto max-w-50 object-contain" />
      </div>
      <span className="text-ink border-border flex min-h-13 flex-1 items-center justify-center border-t bg-surface-1 px-3 py-2.5 text-center text-[12.5px] font-semibold leading-snug">
        {name}
      </span>
    </div>
  );
}
