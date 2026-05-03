import { useEffect, useRef } from 'react';

const ScrollProgress = () => {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId = 0;

    const update = () => {
      rafId = 0;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const ratio = max > 0 ? h.scrollTop / max : 0;
      const clamped = Math.min(1, Math.max(0, ratio));
      if (fillRef.current) {
        fillRef.current.style.transform = `scaleX(${clamped})`;
      }
    };

    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="absolute bottom-0 left-0 right-0 h-px bg-black/10">
      <div
        ref={fillRef}
        className="h-full bg-black origin-left"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
};

export default ScrollProgress;
