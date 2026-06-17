import { useEffect, useState } from 'react';
import { ui, defaultLang, type Lang } from '../i18n/ui';
import { count, subscribe } from '../lib/cart';

const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');

export default function NavBar({ lang = defaultLang as Lang }: { lang?: Lang }) {
  const t = ui[lang];
  const links = [
    { label: t['nav.home'], href: base },
    { label: t['nav.catalog'], href: `${base}catalog` },
    { label: t['nav.solutions'], href: `${base}solutions` },
    { label: t['nav.cases'], href: `${base}case-studies` },
    { label: t['nav.about'], href: `${base}about` },
  ];
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [n, setN] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    const sync = () => setN(count());
    sync();
    return subscribe(sync);
  }, []);

  const openCart = () => window.dispatchEvent(new CustomEvent('cart:open'));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[120] transition-[background,box-shadow,border-color] duration-500 ${
        scrolled
          ? 'bg-[var(--surface)]/90 backdrop-blur-md border-b border-[var(--line)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="container flex items-center justify-between h-[68px] gap-6">
        <a href={base} className="flex items-baseline gap-2 group" aria-label="Continuity home">
          <span className="font-[var(--font-heading)] text-[1.35rem] font-bold tracking-[-0.03em]">CONTINUITY</span>
          <span className="mono text-[0.6rem] text-[var(--accent)] hidden sm:inline">/ INF·IDX</span>
        </a>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-7">
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
          <button
            onClick={openCart}
            aria-label={`${t['nav.cart']} (${n} items)`}
            className="relative inline-flex items-center gap-2 bg-[var(--primary)] text-white text-[0.85rem] font-semibold px-3.5 sm:px-4 py-2.5 rounded-[9px] shadow-[0_10px_28px_-10px_rgba(204,0,0,0.6)] hover:brightness-105 hover:-translate-y-0.5 transition-[transform,filter] duration-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
              <path d="M3 4h2l2.4 12.4a1 1 0 0 0 1 .8h8.7a1 1 0 0 0 1-.8L21 8H6" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9" cy="20" r="1.4" fill="currentColor" stroke="none" /><circle cx="18" cy="20" r="1.4" fill="currentColor" stroke="none" />
            </svg>
            <span className="hidden sm:inline">{t['nav.cart']}</span>
            {n > 0 && (
              <span className="absolute -top-2 -right-2 min-w-[20px] h-[20px] grid place-items-center rounded-full bg-[var(--ink)] text-white text-[0.66rem] font-bold px-1.5 border border-[var(--surface)]">{n}</span>
            )}
          </button>
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
        </nav>
      )}
    </header>
  );
}
