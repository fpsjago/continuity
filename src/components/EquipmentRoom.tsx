import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReveal } from '../lib/useReveal';

gsap.registerPlugin(ScrollTrigger);

interface CaseStudy {
  client: string;
  industry: string;
  challenge: string;
  outcome: string;
  metrics: { value: string; label: string }[];
}

export default function EquipmentRoom({ study, bgImg }: { study: CaseStudy; bgImg?: string }) {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  useEffect(() => {
    const reticle = root.current?.querySelector<SVGGElement>('[data-reticle]');
    if (!reticle) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const ctx = gsap.context(() => {
      gsap.to(reticle, {
        rotate: 360,
        transformOrigin: 'center',
        duration: 24,
        ease: 'none',
        repeat: -1,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="field"
      data-skin="dark"
      className="relative py-32 overflow-hidden atmos-glow"
      style={{ background: 'var(--bg)', color: 'var(--text)' }}
    >
      {bgImg && (
        <>
          <img src={bgImg} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-[0.28]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08152e] via-[#08152e]/85 to-[#08152e]/60" aria-hidden="true" />
        </>
      )}
      <div className="dot-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="bgtype text-[clamp(6rem,18vw,16rem)] bottom-[-4%] right-[-2%]" aria-hidden="true">2AM</div>
      {/* CCTV reticle */}
      <svg className="absolute top-16 right-[8%] w-40 h-40 opacity-70 hidden md:block" viewBox="0 0 120 120" aria-hidden="true">
        <g data-reticle stroke="var(--primary)" strokeWidth="1" fill="none">
          <circle cx="60" cy="60" r="50" />
          <circle cx="60" cy="60" r="30" strokeDasharray="3 4" />
          <line x1="60" y1="2" x2="60" y2="22" />
          <line x1="60" y1="98" x2="60" y2="118" />
          <line x1="2" y1="60" x2="22" y2="60" />
          <line x1="98" y1="60" x2="118" y2="60" />
        </g>
        <circle cx="60" cy="60" r="3" className="pulse-head" />
      </svg>

      <div className="container relative z-10">
        <span className="kicker block mb-5" data-reveal style={{ color: 'var(--gold)' }}>Plate 05 · Field Report</span>
        <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-14">
          <div>
            <p className="mono text-[0.7rem] mb-4" data-reveal style={{ color: 'var(--muted)' }}>
              {study.industry.toUpperCase()} · {study.client.toUpperCase()}
            </p>
            <h2 className="text-[clamp(1.9rem,3.8vw,3rem)] max-w-[24ch]" data-reveal>{study.challenge}</h2>
            <p className="mt-6 max-w-[44rem] text-[1.05rem]" data-reveal style={{ color: 'var(--muted)' }}>
              {study.outcome}
            </p>
          </div>
          <div className="grid grid-cols-3 lg:grid-cols-1 gap-8 self-center" data-reveal>
            {study.metrics.map((m) => (
              <div key={m.label} className="border-l-0">
                <div className="font-[var(--font-heading)] text-[clamp(1.8rem,3vw,2.6rem)] font-bold" style={{ color: 'var(--primary)' }}>
                  {m.value}
                </div>
                <div className="mono text-[0.66rem] mt-1" style={{ color: 'var(--muted)' }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex items-center gap-3" data-reveal>
          <span className="status-token" data-state="live"><span className="dot" /> LIVE · 16 NODES</span>
        </div>
      </div>
    </section>
  );
}
