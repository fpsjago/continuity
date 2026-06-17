import { useRef } from 'react';
import { useReveal } from '../lib/useReveal';

const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');

interface Sol {
  slug: string;
  title: string;
  plate: string;
  summary: string;
  capabilities: string[];
}

function Glyph({ i }: { i: number }) {
  // hand-built line-art per solution
  const glyphs = [
    // cabling — twisted pairs
    <g key="g0" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M10 40 Q30 20 50 40 T90 40 T130 40" />
      <path d="M10 50 Q30 70 50 50 T90 50 T130 50" />
      <circle cx="130" cy="45" r="14" />
    </g>,
    // fiber — strand + ferrule
    <g key="g1" fill="none" stroke="currentColor" strokeWidth="1.4">
      <line x1="10" y1="45" x2="100" y2="45" />
      <rect x="100" y="34" width="34" height="22" rx="3" />
      <circle cx="55" cy="45" r="4" fill="currentColor" />
    </g>,
    // surveillance — dome + cone
    <g key="g2" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M30 30 a26 26 0 0 1 52 0 z" />
      <circle cx="56" cy="32" r="7" />
      <path d="M56 39 L24 78 M56 39 L88 78" strokeDasharray="3 3" />
    </g>,
    // access — terminal + face
    <g key="g3" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="34" y="18" width="44" height="58" rx="4" />
      <circle cx="56" cy="40" r="10" />
      <path d="M44 64 h24" />
    </g>,
  ];
  return (
    <svg viewBox="0 0 144 90" className="w-28 h-auto text-[var(--accent)]" aria-hidden="true">
      {glyphs[i % glyphs.length]}
    </svg>
  );
}

export default function SolutionsSplit({ solutions }: { solutions: Sol[] }) {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section ref={root} id="solutions" className="relative py-28 atmos-glow-top overflow-hidden">
      <div className="bgtype text-[clamp(5rem,15vw,13rem)] top-[2%] left-[-2%]" aria-hidden="true">SYSTEMS</div>
      <div className="container relative z-10">
        <header className="max-w-[40rem] mb-16">
          <span className="kicker block mb-4" data-reveal>Plate 03 · Solutions</span>
          <h2 className="text-[clamp(2rem,4.4vw,3.6rem)]" data-reveal>Cobertura de extremo a extremo.</h2>
          <p className="mt-5 text-[var(--text)]/80" data-reveal>
            Four systems, one signal path. Designed, supplied, and tested by the same hands that hand you the report.
          </p>
        </header>

        <div className="flex flex-col gap-px bg-[var(--line)] border-y border-[var(--line)]">
          {solutions.map((s, i) => (
            <a
              key={s.slug}
              href={`${base}solutions/${s.slug}`}
              data-reveal
              className={`group bg-[var(--bg)] grid md:grid-cols-[0.6fr_1.4fr] gap-8 px-2 md:px-8 py-10 items-center hover:bg-[var(--surface)] transition-colors duration-300 ${
                i % 2 === 1 ? 'md:[direction:rtl]' : ''
              }`}
            >
              <div className="flex items-center gap-5 [direction:ltr]">
                <span className="callout__no">{String(i + 1).padStart(2, '0')}</span>
                <Glyph i={i} />
              </div>
              <div className="[direction:ltr]">
                <div className="flex items-baseline justify-between gap-4 flex-wrap">
                  <h3 className="text-[clamp(1.5rem,3vw,2.3rem)]">{s.title}</h3>
                  <span className="mono text-[0.62rem] text-[var(--accent)]">{s.plate}</span>
                </div>
                <p className="mt-3 max-w-[42rem] text-[var(--text)]/80">{s.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5">
                  {s.capabilities.map((c) => (
                    <li key={c} className="font-[var(--font-mono)] text-[0.7rem] tracking-[0.04em] text-[var(--muted)] flex items-center gap-1.5">
                      <span className="text-[var(--primary)]">+</span> {c}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-1.5 mt-5 font-semibold text-[0.9rem] text-[var(--ink)]">
                  View plate
                  <span className="text-[var(--primary)] group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
