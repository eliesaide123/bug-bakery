import { useEffect, useState } from 'react';
import Loader from '@/components/ui/3d-box-loader-animation';

// One full 3s loader cycle, plus a small buffer so the
// "boxes fall away" finale is fully visible before fading.
const FADE_START_MS = 3100;
const FADE_DURATION_MS = 600;
const UNMOUNT_AT_MS = FADE_START_MS + FADE_DURATION_MS;

const LoadingScreen = () => {
  // Skip on SSR/prerender so the static HTML doesn't ship a fixed overlay
  // covering the page content. Flips true on client mount.
  const [mounted, setMounted] = useState(false);
  const [fading, setFading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setMounted(true);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    let fadeTimer = 0;
    let doneTimer = 0;

    // Start the timers only after the first frame has painted, so the
    // timeline lines up with when the loader's CSS animation actually
    // begins (avoids cold-boot eating into playtime).
    const rafId = requestAnimationFrame(() => {
      fadeTimer = window.setTimeout(() => {
        setFading(true);
        document.body.style.overflow = originalOverflow;
      }, FADE_START_MS);

      doneTimer = window.setTimeout(() => {
        setDone(true);
      }, UNMOUNT_AT_MS);
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (fadeTimer) window.clearTimeout(fadeTimer);
      if (doneTimer) window.clearTimeout(doneTimer);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (!mounted) return null;
  if (done) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-200 ${
        fading ? 'opacity-0 pointer-events-none loader-paused' : 'opacity-100'
      }`}
      style={{
        transition: `opacity ${FADE_DURATION_MS}ms ease`,
      }}
    >
      <Loader />
    </div>
  );
};

export default LoadingScreen;
