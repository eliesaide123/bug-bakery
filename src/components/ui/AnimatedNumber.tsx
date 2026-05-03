import { useEffect, useState } from 'react';
import { useReveal } from '@/hooks/useReveal';

type Props = {
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
};

const AnimatedNumber = ({
  to,
  duration = 1600,
  suffix = '',
  className = '',
}: Props) => {
  const { ref, revealed } = useReveal<HTMLSpanElement>();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!revealed) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(to * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [revealed, to, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
};

export default AnimatedNumber;
