import { useEffect, useState } from 'react';

const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
const links = [
  { label: 'Solutions', href: `${base}solutions` },
  { label: 'Products', href: `${base}products` },
  { label: 'Case Studies', href: `${base}case-studies` },
  { label: 'About', href: `${base}about` },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[120] transition-[background,box-shadow,border-color] duration-500 ${
        scrolled
          ? 'bg-[var(--surface)]/90 backdrop-blur-md border-b border-[var(--line)]'
          : 'bg-transparent border-b border-transparent'
      }`}
      style={{ ['--ease' as string]: 'cubic-bezier(0.16,1,0.3,1)' }}
    >
      <div className="container flex items-center justify-between h-[68px] gap-6">
        <a href={base} className="flex items-baseline gap-2 group" aria-label="Continuity home">
          <span className="font-[var(--font-heading)] text-[1.35rem] font-bold tracking-[-0.03em]">
            CONTINUITY
          </span>
          <span className="mono text-[0.6rem] text-[var(--accent)] hidden sm:inline">/ INF·IDX</span>
        </a>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[0.92rem] text-[var(--text)] relative py-1 hover:text-[var(--primary)] transition-colors duration-300 after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0 after:bg-[var(--primary)] after:transition-[width] after:duration-300 hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`${base}request`}
            className="hidden sm:inline-flex items-center gap-2 bg-[var(--primary)] text-white text-[0.85rem] font-semibold px-4 py-2.5 rounded-[9px] shadow-[0_10px_28px_-10px_rgba(224,90,30,0.7)] hover:brightness-105 hover:-translate-y-0.5 transition-[transform,filter] duration-200"
          >
            Request Spec Sheet
          </a>
          <button
            className="md:hidden w-10 h-10 grid place-items-center border border-[var(--line-strong)] rounded-lg"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="block w-4 h-px bg-[var(--text)] relative before:absolute before:-top-1.5 before:left-0 before:w-4 before:h-px before:bg-[var(--text)] after:absolute after:top-1.5 after:left-0 after:w-4 after:h-px after:bg-[var(--text)]" />
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Mobile" className="md:hidden border-t border-[var(--line)] bg-[var(--surface)] px-[var(--pad)] py-4 flex flex-col gap-1">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="py-2.5 text-[0.95rem] border-b border-[var(--line)] last:border-0">
              {l.label}
            </a>
          ))}
          <a href={`${base}request`} className="mt-3 text-center bg-[var(--primary)] text-white font-semibold py-3 rounded-[9px]">
            Request Spec Sheet
          </a>
        </nav>
      )}
    </header>
  );
}
