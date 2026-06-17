import { useEffect, useRef, useState } from 'react';

interface Node {
  id: string;
  label: string;
}

/**
 * THE signature — a single ember pulse rides one vertical cable down the page,
 * scroll-DRIVEN (reads scroll position, never owns it). Sections energize as the
 * pulse passes. Subordinate plate index doubles as section nav (real anchors).
 * Hidden on coarse/reduced-motion → static fully-energized fallback.
 */
export default function SignalSpine({ nodes }: { nodes: Node[] }) {
  const [progress, setProgress] = useState(0);
  const [enabled, setEnabled] = useState(true);
  const raf = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (reduce || coarse) {
      setEnabled(false);
      setProgress(1);
      return;
    }
    const tick = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      setProgress(p);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const H = 1000; // viewBox height
  const headY = progress * H;
  const seg = H / Math.max(1, nodes.length - 1);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = (window as any).__lenis;
    if (lenis?.scrollTo) lenis.scrollTo(el, { offset: -90 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <aside
      className="fixed left-6 top-1/2 -translate-y-1/2 z-[80] hidden xl:flex items-stretch gap-4 h-[64vh] pointer-events-none"
      aria-label="Section index"
    >
      <svg
        width="22"
        viewBox={`0 0 22 ${H}`}
        preserveAspectRatio="none"
        className="h-full overflow-visible"
        aria-hidden="true"
      >
        <line x1="11" y1="0" x2="11" y2={H} stroke="var(--line-strong)" strokeWidth="1.5" />
        <line
          x1="11"
          y1="0"
          x2="11"
          y2={headY}
          stroke="var(--primary)"
          strokeWidth="2"
          style={{ filter: 'drop-shadow(0 0 5px rgba(var(--glow),0.55))' }}
        />
        {nodes.map((n, i) => {
          const y = i * seg;
          const live = headY >= y - 4;
          return (
            <circle
              key={n.id}
              cx="11"
              cy={y}
              r={live ? 4.5 : 3}
              fill={live ? 'var(--primary)' : 'var(--surface)'}
              stroke={live ? 'var(--primary)' : 'var(--line-strong)'}
              strokeWidth="1.5"
              style={live ? { filter: 'drop-shadow(0 0 6px rgba(var(--glow),0.9))' } : undefined}
            />
          );
        })}
        {enabled && (
          <circle cx="11" cy={headY} r="6" className="pulse-head" />
        )}
      </svg>

      <ol className="flex flex-col justify-between py-0 pointer-events-auto">
        {nodes.map((n, i) => {
          const y = i * seg;
          const live = headY >= y - 4;
          return (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                onClick={(e) => go(e, n.id)}
                className="group flex items-baseline gap-2 transition-colors duration-300"
                style={{ color: live ? 'var(--ink)' : 'var(--muted)' }}
              >
                <span className="mono text-[0.6rem]" style={{ color: live ? 'var(--primary)' : 'var(--muted)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-[var(--font-mono)] text-[0.66rem] tracking-[0.14em] uppercase" style={{ fontWeight: live ? 600 : 400 }}>
                  {n.label}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
