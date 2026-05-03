import type { ReactNode } from 'react';
import { useReveal } from '@/hooks/useReveal';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: 'up' | 'left' | 'right' | 'fade';
};

const variantClass: Record<NonNullable<Props['variant']>, string> = {
  up: 'reveal-up',
  left: 'reveal-left',
  right: 'reveal-right',
  fade: 'reveal-fade',
};

const Reveal = ({
  children,
  className = '',
  delay = 0,
  variant = 'up',
}: Props) => {
  const { ref, revealed } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${variantClass[variant]} ${revealed ? 'is-revealed' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default Reveal;
