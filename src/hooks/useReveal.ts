import { useEffect, useRef, useState } from 'react';

let sharedObserver: IntersectionObserver | null = null;
const subscribers = new Map<Element, () => void>();

const ensureObserver = (): IntersectionObserver | null => {
  if (typeof IntersectionObserver === 'undefined') return null;
  if (sharedObserver) return sharedObserver;

  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const cb = subscribers.get(entry.target);
        if (cb) {
          cb();
          subscribers.delete(entry.target);
          sharedObserver!.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
  );

  return sharedObserver;
};

export const useReveal = <T extends HTMLElement = HTMLDivElement>() => {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const obs = ensureObserver();
    if (!obs) {
      setRevealed(true);
      return;
    }

    subscribers.set(node, () => setRevealed(true));
    obs.observe(node);

    return () => {
      subscribers.delete(node);
      obs.unobserve(node);
    };
  }, []);

  return { ref, revealed };
};
