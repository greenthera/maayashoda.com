import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface Props {
  images: { src: string; label: string }[];
  index: number;
  onChange: (index: number) => void;
  onClose: () => void;
}

/** A top-layer dialog avoids the animated sections' transformed containing blocks. */
export function GalleryLightbox({ images, index, onChange, onClose }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const move = (delta: number) => onChange((index + delta + images.length) % images.length);

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const element = dialog.current!;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);

  return createPortal(
    <dialog ref={dialog} aria-labelledby="gallery-caption" className="m-auto h-[100dvh] max-h-none w-screen max-w-none bg-[#100d24] p-3 text-white backdrop:bg-[#100d24] sm:p-6"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
      onKeyDown={(event) => {
        if (event.key === "Tab") {
          const buttons = event.currentTarget.querySelectorAll<HTMLButtonElement>("button");
          const first = buttons[0];
          const last = buttons[buttons.length - 1];
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        }
        if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
        if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
      }}>
      <div className="pointer-events-none mx-auto flex h-full max-w-6xl flex-col justify-center gap-4">
        <div className="pointer-events-auto flex items-center justify-between gap-4">
          <p className="text-sm tabular-nums text-white/70">{index + 1} / {images.length}</p>
          <button autoFocus type="button" onClick={onClose} aria-label="Close gallery" className="grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-white/10 text-2xl hover:bg-white/20">×</button>
        </div>
        <img src={images[index].src} alt={images[index].label} width={1536} height={1024}
          className="pointer-events-auto min-h-0 w-full flex-1 rounded-xl object-contain"
          onTouchStart={(event) => { touch.current = { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY }; }}
          onTouchEnd={(event) => {
            if (!touch.current) return;
            const dx = event.changedTouches[0].clientX - touch.current.x;
            const dy = event.changedTouches[0].clientY - touch.current.y;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1);
            touch.current = null;
          }} />
        <div className="pointer-events-auto flex items-center justify-between gap-3 pb-2">
          <button type="button" onClick={() => move(-1)} aria-label="Previous image" className="grid h-12 w-12 flex-none place-items-center rounded-full border border-white/30 bg-white/10 text-2xl hover:bg-white/20">←</button>
          <p id="gallery-caption" aria-live="polite" className="text-center text-sm font-medium sm:text-base">{images[index].label}</p>
          <button type="button" onClick={() => move(1)} aria-label="Next image" className="grid h-12 w-12 flex-none place-items-center rounded-full border border-white/30 bg-white/10 text-2xl hover:bg-white/20">→</button>
        </div>
      </div>
    </dialog>, document.body,
  );
}
