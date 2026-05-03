import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

const cols = [
  {
    title: 'Studio',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Process', href: '#process' },
      { label: 'Work', href: '#work' },
      { label: 'Blog', href: '#blog' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Web Development', href: '#services' },
      { label: 'Mobile Apps', href: '#services' },
      { label: 'Desktop Software', href: '#services' },
      { label: 'AI & LLM Apps', href: '#services' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Email', href: 'mailto:contact@bug-bakery.com' },
      { label: 'LinkedIn', href: '#' },
      { label: 'Twitter / X', href: '#' },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-10">
        <Reveal variant="up">
          <div className="grid lg:grid-cols-12 gap-12 pb-20 border-b border-white/15">
            <div className="lg:col-span-6">
              <h3 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.95]">
                Bake with
                <br />
                <span className="italic font-light">us.</span>
              </h3>
              <a
                href="#contact"
                className="group mt-10 inline-flex items-center gap-2 px-7 py-4 bg-white text-black text-sm rounded-full hover:opacity-90 transition-opacity"
              >
                Start a project
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-10">
              {cols.map((c) => (
                <div key={c.title}>
                  <p className="text-xs uppercase tracking-[0.3em] opacity-50 mb-5">
                    {c.title}
                  </p>
                  <ul className="space-y-3">
                    {c.links.map((l) => (
                      <li key={l.label}>
                        <a
                          href={l.href}
                          className="text-sm hover:opacity-60 transition-opacity"
                        >
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-10 text-xs">
          <div className="flex items-center gap-3 opacity-60">
            <span className="inline-block w-2 h-2 bg-white rounded-sm" />
            <span>Bug Bakery · est. 2018</span>
          </div>
          <p className="opacity-60">
            © {new Date().getFullYear()} Bug Bakery. All rights reserved.
          </p>
          <ul className="flex gap-6 opacity-60">
            <li>
              <a href="#" className="hover:opacity-100 transition-opacity">
                Privacy
              </a>
            </li>
            <li>
              <a href="#" className="hover:opacity-100 transition-opacity">
                Terms
              </a>
            </li>
            <li>
              <a href="#" className="hover:opacity-100 transition-opacity">
                Cookies
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
