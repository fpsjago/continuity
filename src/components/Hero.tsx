import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('[data-h-word]', { yPercent: 110, opacity: 0, duration: 1, stagger: 0.08 })
        .from('[data-h-fade]', { y: 22, opacity: 0, duration: 0.8, stagger: 0.1 }, '-=0.5');

      if (!reduce) {
        // waveform draws in
        const wave = root.current?.querySelector<SVGPathElement>('[data-wave]');
        if (wave) {
          const len = wave.getTotalLength();
          gsap.set(wave, { strokeDasharray: len, strokeDashoffset: len });
          tl.to(wave, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut' }, 0.3)
            .add(() => setLive(true), '-=0.2');
        }
        // pulse travels the cable, loops
        gsap.fromTo(
          '[data-pulse]',
          { attr: { cx: 70 } },
          { attr: { cx: 690 }, duration: 2.4, ease: 'none', repeat: -1, repeatDelay: 0.6, delay: 1.2 }
        );
        // caliper rule draws
        const rule = root.current?.querySelector<SVGLineElement>('[data-caliper]');
        if (rule) tl.from(rule, { scaleX: 0, transformOrigin: 'left center', duration: 1, ease: 'power2.out' }, 0.6);
      } else {
        setLive(true);
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="signal"
      className="relative min-h-screen flex items-center overflow-hidden atmos-glow-top pt-[88px] pb-16"
    >
      <div className="blueprint-grid absolute inset-0" aria-hidden="true" />
      <div className="bg-text text-[clamp(7rem,26vw,24rem)] -bottom-[6%] -right-[3%]" aria-hidden="true">
        OFC
      </div>
      {/* corner registration */}
      <span className="float-corner left-6 top-[84px]" aria-hidden="true" />
      <span className="float-corner right-6 top-[84px] rotate-90" aria-hidden="true" />
      <span className="float-line right-[14%] top-[30%]" aria-hidden="true" />
      <span className="float-cross left-[8%] bottom-[18%]" aria-hidden="true" />

      <div className="container relative z-10 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
        <div>
          <p className="mono text-[0.66rem] text-[var(--muted)] tracking-[0.22em] mb-6" data-h-fade>
            CONTINUITY · INFRASTRUCTURE INDEX · EDITION 2026
          </p>
          <span className="kicker block mb-5" data-h-fade>
            High Performance Network Infrastructure
          </span>
          <h1 className="text-[clamp(2.8rem,7.5vw,6.4rem)] leading-[0.98] tracking-[-0.03em]">
            <span className="block overflow-hidden"><span className="block" data-h-word>Signal that</span></span>
            <span className="block overflow-hidden">
              <span className="block" data-h-word>
                doesn&rsquo;t <span className="text-[var(--primary)]">negotiate.</span>
              </span>
            </span>
          </h1>
          <p className="max-w-[34rem] mt-7 text-[1.05rem] text-[var(--text)]/85 leading-relaxed" data-h-fade>
            Structured cabling, fiber backbone, connectors, managed switching, surveillance and access control —
            engineered to spec and tested end to end.
            <span className="text-[var(--ink)] font-medium"> Certified, not claimed.</span>
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-9" data-h-fade>
            <a
              href={`${base}products`}
              className="inline-flex items-center gap-2 bg-[#1c1b18] text-[#f4f1ea] font-semibold px-6 py-3.5 rounded-[10px] hover:-translate-y-0.5 transition-transform duration-200"
            >
              Browse the index
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a href={`${base}request`} className="inline-flex items-center gap-2 font-semibold px-6 py-3.5 rounded-[10px] border border-[var(--line-strong)] hover:border-[var(--ink)] transition-colors duration-200">
              Request a spec sheet
            </a>
          </div>
          <div className="mt-9 flex items-center gap-6" data-h-fade>
            <span className="status-token" data-state={live ? 'live' : 'idle'}>
              <span className="dot" /> {live ? 'LINK UP' : 'STANDBY'}
            </span>
            <span className="mono text-[0.66rem] text-[var(--muted)]">10 Gbps · 100 m · Cat 6A</span>
          </div>
        </div>

        {/* hand-built signal drawing */}
        <div className="relative" data-h-fade>
          <svg viewBox="0 0 760 420" className="w-full h-auto" role="img" aria-label="Signal travelling a cable from a patch-panel port into a connector">
            <defs>
              <marker id="arrowR" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0 0L6 3L0 6" fill="none" stroke="var(--accent)" strokeWidth="1" />
              </marker>
              <marker id="arrowL" markerWidth="8" markerHeight="8" refX="0" refY="3" orient="auto">
                <path d="M6 0L0 3L6 6" fill="none" stroke="var(--accent)" strokeWidth="1" />
              </marker>
            </defs>

            {/* patch panel (left) */}
            <rect x="20" y="150" width="60" height="120" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
            {[0, 1, 2, 3].map((i) => (
              <rect key={i} x="30" y={162 + i * 28} width="40" height="16" rx="2" fill="none" stroke="var(--muted)" strokeWidth="1" />
            ))}
            <circle cx="50" cy={162 + 2 * 28 + 8} r="3.5" className="pulse-head" />

            {/* main cable run */}
            <line x1="80" y1="210" x2="640" y2="210" stroke="var(--ink)" strokeWidth="2" />
            {/* connector (right) */}
            <g stroke="var(--ink)" strokeWidth="1.5" fill="none">
              <path d="M640 188 h70 v44 h-70 z" />
              <path d="M710 196 h22 v28 h-22 z" />
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <line key={i} x1={648 + i * 10} y1="232" x2={648 + i * 10} y2="240" />
              ))}
            </g>

            {/* travelling pulse */}
            <circle data-pulse cx="70" cy="210" r="5" className="pulse-head" />

            {/* waveform */}
            <path
              data-wave
              d="M80 320 H180 l14 -34 14 68 14 -68 14 68 14 -34 H760"
              className="signal-trace"
              style={{ opacity: live ? 1 : 0.9 }}
            />

            {/* dimension line */}
            <line x1="80" y1="120" x2="640" y2="120" className="dim" />
            <line x1="80" y1="112" x2="80" y2="128" stroke="var(--accent)" strokeWidth="1" />
            <line x1="640" y1="112" x2="640" y2="128" stroke="var(--accent)" strokeWidth="1" />
            <text x="360" y="112" textAnchor="middle" className="font-[var(--font-mono)]" fill="var(--accent)" fontSize="12" letterSpacing="1">100 m · ≤ 0.5 dB</text>

            {/* labels */}
            <text x="50" y="290" textAnchor="middle" fill="var(--muted)" fontSize="11" className="font-[var(--font-mono)]">PORT 03</text>
            <text x="675" y="262" textAnchor="middle" fill="var(--muted)" fontSize="11" className="font-[var(--font-mono)]">RJ45 · 8P8C</text>
          </svg>

          {/* caliper */}
          <div className="caliper mt-2">
            <span className="caliper__label">SCALE 1:3</span>
            <div className="caliper__rule"><span data-caliper className="block w-full h-full" /></div>
            <span className="caliper__label">REF IEC 11801</span>
          </div>
        </div>
      </div>
    </section>
  );
}
