import { useRef } from 'react';
import { useReveal } from '../lib/useReveal';

const rows = [
  { no: '01', name: 'Data Centers', note: 'Backbone, OTDR-traced fiber, 25G-ready uplinks' },
  { no: '02', name: 'Enterprise & Campus', note: 'Horizontal cabling, PoE switching, IDF/MDF' },
  { no: '03', name: 'Retail & Multi-site', note: 'Repeatable per-store kits, rolling cutover' },
  { no: '04', name: 'Government & Critical', note: 'Audit-grade access control and logging' },
  { no: '05', name: 'Telecom & ISP', note: 'Splice trays, OSP, last-mile termination' },
];

export default function Industries() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  return (
    <section ref={root} id="industries" className="relative py-28 atmos-glow-top overflow-hidden">
      <div className="container relative z-10">
        <header className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <div>
            <span className="kicker block mb-4" data-reveal>Plate 06 · Industries</span>
            <h2 className="text-[clamp(2rem,4vw,3.2rem)]" data-reveal>Where the signal runs.</h2>
          </div>
          <span className="mono text-[0.66rem] text-[var(--muted)]" data-reveal>05 SECTORS · 1 STANDARD</span>
        </header>
        <ul className="border-t border-[var(--line)]">
          {rows.map((r) => (
            <li
              key={r.no}
              data-reveal
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 py-6 border-b border-[var(--line)] hover:px-3 transition-[padding] duration-300"
            >
              <span className="font-[var(--font-mono)] text-[0.7rem] text-[var(--primary)]">{r.no}</span>
              <div className="flex items-baseline gap-5 flex-wrap">
                <span className="font-[var(--font-heading)] text-[clamp(1.3rem,2.6vw,2rem)] font-semibold">{r.name}</span>
                <span className="font-[var(--font-mono)] text-[0.72rem] text-[var(--muted)]">{r.note}</span>
              </div>
              <span className="text-[var(--accent)] opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all duration-300">→</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
