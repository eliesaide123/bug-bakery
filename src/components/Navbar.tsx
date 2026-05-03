import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import ScrollProgress from '@/components/ui/ScrollProgress';

const links = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#blog', label: 'Blog' },
  { href: '#contact', label: 'Contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let rafId = 0;
    let last: boolean | null = null;

    const update = () => {
      rafId = 0;
      const scrolled = window.scrollY > 8;
      if (scrolled !== last) {
        last = scrolled;
        headerRef.current?.classList.toggle('is-scrolled', scrolled);
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
    <header
      ref={headerRef}
      className="nav-header fixed top-0 inset-x-0 z-40"
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">
        <a
          href="#home"
          className="flex items-baseline gap-2 font-bold text-lg tracking-tight"
        >
          <span className="inline-block w-2 h-2 bg-black rounded-sm" />
          Bug<span className="opacity-50">Bakery</span>
        </a>
        <ul className="hidden lg:flex items-center gap-10 text-sm">
          {links.map((l, i) => (
            <li key={l.href} className="flex items-center gap-3">
              <span className="opacity-30 text-xs section-num">
                0{i + 1}
              </span>
              <a
                href={l.href}
                className="hover:opacity-60 transition-opacity"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="hidden lg:inline-flex items-center gap-2 px-5 py-2 bg-black text-white text-xs uppercase tracking-widest rounded-full hover:opacity-80 transition-opacity"
        >
          Start a project
        </a>
        <button
          className="lg:hidden p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-black/10 bg-gray-200">
          <ul className="px-6 py-4 flex flex-col gap-1 text-sm">
            {links.map((l, i) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 py-2"
                >
                  <span className="opacity-30 text-xs section-num">
                    0{i + 1}
                  </span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <ScrollProgress />
    </header>
  );
};

export default Navbar;
