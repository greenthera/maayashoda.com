import { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";

/**
 * Thin progress bar at the very top of the viewport while a lazy-loaded
 * route chunk is being fetched, so a slow/cold navigation reads as
 * "loading" rather than "stuck".
 */
export function LoadingBar() {
  const navigation = useNavigation();
  const isLoading = navigation.state !== "idle";
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      setVisible(true);
      setProgress(15);
      const grow = window.setTimeout(() => setProgress(72), 180);
      return () => window.clearTimeout(grow);
    }

    setProgress((p) => (p > 0 ? 100 : 0));
    const hide = window.setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 260);
    return () => window.clearTimeout(hide);
  }, [isLoading]);

  if (!visible) return null;

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[200] h-[3px] bg-transparent">
      <div className="bg-brand h-full transition-[width] duration-300 ease-out" style={{ width: `${progress}%` }} />
    </div>
  );
}
