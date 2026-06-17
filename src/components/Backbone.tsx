import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReveal } from '../lib/useReveal';

gsap.registerPlugin(ScrollTrigger);

const brands = ['HIKVISION', 'ZKTECO', 'DAHUA', 'UBIQUITI', 'COMMSCOPE', 'PANDUIT'];

export default function Backbone() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ports = root.current?.querySelectorAll<SVGRectElement>('[data-port]');
    if (!ports?.length) return;
    if (reduce) {
      ports.forEach((p) => { p.setAttribute('fill', '#cc0000'); p.setAttribute('stroke', '#cc0000'); });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.to(ports, {
        attr: { fill: '#cc0000', stroke: '#cc0000' },
        stagger: { each: 0.5, from: 'start' },
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top 70%', end: 'center 40%', scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="backbone" className="relative py-28 atmos-glow overflow-hidden">
      <span className="float-line left-[6%] top-[20%]" aria-hidden="true" />
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14 items-center">
          <div>
            <span className="kicker block mb-5" data-reveal>Plate 02 · Backbone</span>
            <h2 className="text-[clamp(2rem,4vw,3.4rem)]" data-reveal>
              Tested to 10&nbsp;Gbps over 100&nbsp;m.
              <span className="block text-[var(--primary)]">Certified, not claimed.</span>
            </h2>
            <p className="max-w-[32rem] mt-6 text-[var(--text)]/80" data-reveal>
              Every channel we hand over arrives with a signed test report: insertion loss, NEXT,
              return loss, headroom. The numbers are the deliverable.
            </p>
            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3" data-reveal>
              {brands.map((b) => (
                <span key={b} className="font-[var(--font-mono)] text-[0.8rem] tracking-[0.12em] text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
                  {b}
                </span>
              ))}
            </div>
          </div>

          <div data-reveal>
            <svg viewBox="0 0 520 150" className="w-full h-auto" role="img" aria-label="24-port managed switch, ports illuminating left to right">
              <rect x="6" y="20" width="508" height="110" rx="6" fill="#fbfaf6" stroke="var(--ink)" strokeWidth="1.8" />
              <circle cx="30" cy="40" r="3" fill="#cc0000" />
              <text x="46" y="44" className="font-[var(--font-mono)]" fontSize="9" fill="var(--muted)">CONTINUITY · SW-24-POE</text>
              {Array.from({ length: 24 }).map((_, i) => {
                const col = i % 12;
                const row = Math.floor(i / 12);
                return (
                  <rect
                    key={i}
                    data-port
                    x={26 + col * 38}
                    y={62 + row * 34}
                    width="28"
                    height="20"
                    rx="2"
                    fill="#f2efe8"
                    stroke="var(--ink)"
                    strokeWidth="1.2"
                  />
                );
              })}
              {[0, 1, 2, 3].map((i) => (
                <rect key={`u${i}`} x={26 + (8 + i) * 38} y={62 + 34} width="28" height="20" rx="2" fill="none" stroke="var(--accent)" strokeWidth="1.2" strokeDasharray="2 2" />
              ))}
            </svg>
            <div className="caliper mt-3">
              <span className="caliper__label">24× 1G PoE+</span>
              <div className="caliper__rule" />
              <span className="caliper__label">4× SFP</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
