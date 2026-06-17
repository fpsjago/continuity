import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');

export default function CTAConnect() {
  const root = useRef<HTMLElement>(null);
  const [seated, setSeated] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setSeated(true);
      return;
    }
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top 60%',
        once: true,
        onEnter: () => {
          gsap.to('[data-plug]', { x: 0, duration: 0.7, ease: 'power3.out', onComplete: () => setSeated(true) });
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="connect" className="relative py-32 overflow-hidden atmos-glow-center text-center">
      <div className="blueprint-grid absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="container relative z-10 max-w-[52rem]">
        <span className="kicker block mb-6">Plate 07 · Connection</span>
        <h2 className="text-[clamp(2.4rem,6vw,5rem)] leading-[0.98]">
          Ready to make the<br /><span className="text-[var(--primary)]">connection?</span>
        </h2>

        {/* connector seating */}
        <svg viewBox="0 0 360 80" className="w-full max-w-[440px] mx-auto my-10" role="img" aria-label="Connector seating into a port">
          <rect x="6" y="28" width="150" height="24" rx="3" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
          <line x1="156" y1="40" x2="210" y2="40" stroke="var(--ink)" strokeWidth="2" />
          <g data-plug style={{ transform: 'translateX(60px)' }}>
            <rect x="210" y="24" width="80" height="32" rx="3" fill="var(--surface)" stroke="var(--ink)" strokeWidth="1.5" />
            <rect x="290" y="30" width="16" height="20" rx="2" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
          </g>
          {seated && <circle cx="80" cy="40" r="4" className="pulse-head" />}
        </svg>

        <p className="status-token justify-center mb-9" data-state={seated ? 'live' : 'idle'}>
          <span className="dot" /> {seated ? 'LINK ESTABLISHED · 99.997% · 9.4 Gbps' : 'SEATING…'}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href={`${base}request`} className="inline-flex items-center gap-2 bg-[var(--primary)] text-white font-semibold px-7 py-4 rounded-[11px] shadow-[0_14px_36px_-12px_rgba(224,90,30,0.7)] hover:-translate-y-0.5 transition-transform">
            Request a spec sheet
          </a>
          <a href={`${base}contact`} className="inline-flex items-center gap-2 font-semibold px-7 py-4 rounded-[11px] border border-[var(--line-strong)] hover:border-[var(--ink)] transition-colors">
            Talk to engineering
          </a>
        </div>
      </div>
    </section>
  );
}
