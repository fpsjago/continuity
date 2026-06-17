import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const layers = [
  { no: '01', name: 'LSZH jacket', detail: 'Ø 7.1 mm · low-smoke zero-halogen' },
  { no: '02', name: 'Aluminium-mylar foil', detail: 'U/FTP overall + per-pair screen' },
  { no: '03', name: '23 AWG solid copper', detail: '99.99% OFC · 4 twisted pairs' },
  { no: '04', name: 'Conductor core', detail: 'DC resistance 8.6 Ω / 100 m' },
];

export default function ProductCrossSection() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      gsap.set('[data-layer]', { y: (i) => (i - 1.5) * 64, opacity: 1 });
      gsap.set('[data-callout]', { opacity: 1, x: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=120%',
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });
      tl.to('[data-layer]', { y: (i) => (i - 1.5) * 64, duration: 1, ease: 'power2.inOut' }, 0)
        .to('[data-dim]', { opacity: 1, duration: 0.4 }, 0.3)
        .to('[data-callout]', { opacity: 1, x: 0, stagger: 0.15, duration: 0.5 }, 0.4);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="specimen" className="relative min-h-screen flex items-center py-24 overflow-hidden atmos-glow-center">
      <div className="blueprint-grid absolute inset-0 opacity-60" aria-hidden="true" />
      <span className="float-corner left-6 bottom-10" aria-hidden="true" />
      <div className="container relative z-10 grid lg:grid-cols-[1fr_1fr] gap-16 items-center">
        <div>
          <span className="kicker block mb-4">Plate 04 · Specimen</span>
          <h2 className="text-[clamp(2rem,4.2vw,3.4rem)]">Disassembled, to the conductor.</h2>
          <p className="mt-5 max-w-[34rem] text-[var(--text)]/80">
            Scroll to take the cable apart. Every layer is dimensioned and specified, because the
            jacket is not what carries 10 gigabit. The copper is.
          </p>
          <dl className="mt-9 border-t border-[var(--line)]">
            {layers.map((l) => (
              <div key={l.no} data-callout className="flex items-baseline gap-4 py-3.5 border-b border-[var(--line)] opacity-0 [transform:translateX(-16px)]">
                <dt className="callout__no shrink-0">{l.no}</dt>
                <div>
                  <dt className="font-semibold inline">{l.name}</dt>
                  <dd className="font-[var(--font-mono)] text-[0.78rem] text-[var(--muted)]">{l.detail}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <svg viewBox="0 0 360 360" className="w-full max-w-[420px] mx-auto h-auto" role="img" aria-label="Exploded cross-section of a Cat 6A cable">
            <g transform="translate(180 180)">
              {/* layer 0 jacket */}
              <circle data-layer cx="0" cy="0" r="120" fill="none" stroke="var(--ink)" strokeWidth="1.6" />
              {/* layer 1 foil */}
              <circle data-layer cx="0" cy="0" r="92" fill="none" stroke="var(--accent)" strokeWidth="1.4" strokeDasharray="4 3" />
              {/* layer 2 pairs */}
              <g data-layer fill="none" stroke="var(--muted)" strokeWidth="1.4">
                {[0, 1, 2, 3].map((i) => {
                  const a = (i / 4) * Math.PI * 2;
                  const x = Math.cos(a) * 46;
                  const y = Math.sin(a) * 46;
                  return <g key={i} transform={`translate(${x} ${y})`}><circle r="22" /><circle cx="-9" r="9" /><circle cx="9" r="9" /></g>;
                })}
              </g>
              {/* layer 3 copper core */}
              <circle data-layer cx="0" cy="0" r="16" fill="var(--primary)" stroke="var(--accent)" strokeWidth="1.4" style={{ filter: 'drop-shadow(0 0 10px rgba(var(--glow),0.6))' }} />
            </g>
            <line data-dim x1="320" y1="60" x2="320" y2="300" className="dim" opacity="0" />
            <text x="334" y="184" fill="var(--accent)" fontSize="11" className="font-[var(--font-mono)]" writingMode="tb">Ø 7.1 mm</text>
          </svg>
          <div className="caliper mt-3 max-w-[420px] mx-auto">
            <span className="caliper__label">CBL-6A-305</span>
            <div className="caliper__rule" />
            <span className="caliper__label">TIA-568</span>
          </div>
        </div>
      </div>
    </section>
  );
}
