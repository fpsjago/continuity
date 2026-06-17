import { useState } from 'react';
import { addItem } from '../lib/cart';

const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');

interface Props {
  slug: string;
  name: string;
  sku: string;
  category: string;
  tagline: string;
  specs: { label: string; value: string }[];
  img?: string;
}

function CatGlyph({ category }: { category: string }) {
  const map: Record<string, JSX.Element> = {
    Cabling: <g><path d="M14 30 Q26 16 38 30 T62 30" /><path d="M14 38 Q26 52 38 38 T62 38" /></g>,
    Connectors: <g><rect x="20" y="22" width="32" height="24" rx="2" /><path d="M52 28 h8 v12 h-8" /><path d="M26 46 v6 M32 46 v6 M38 46 v6 M44 46 v6" /></g>,
    Fiber: <g><line x1="14" y1="34" x2="50" y2="34" /><rect x="50" y="26" width="16" height="16" rx="2" /><circle cx="30" cy="34" r="3" /></g>,
    Switching: <g><rect x="14" y="24" width="52" height="20" rx="3" /><path d="M22 44 v6 M30 44 v6 M38 44 v6 M46 44 v6 M54 44 v6" /></g>,
    Surveillance: <g><path d="M22 24 a18 18 0 0 1 36 0 z" /><circle cx="40" cy="26" r="6" /></g>,
    Access: <g><rect x="26" y="16" width="28" height="40" rx="3" /><circle cx="40" cy="32" r="7" /></g>,
    Networking: <g><rect x="18" y="16" width="44" height="44" rx="3" /><path d="M26 26 h28 M26 34 h28 M26 42 h16" /></g>,
  };
  return (
    <svg viewBox="0 0 80 64" className="w-16 h-14 text-[var(--accent)]" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      {map[category] ?? map.Cabling}
    </svg>
  );
}

export default function ProductCard({ slug, name, sku, category, tagline, specs, img }: Props) {
  const href = `${base}products/${slug}`;
  const [added, setAdded] = useState(false);

  const add = () => {
    addItem({ slug, name, sku });
    setAdded(true);
    setTimeout(() => setAdded(false), 1300);
  };

  return (
    <div className="group relative flex flex-col bg-[var(--surface)] border border-[var(--line)] rounded-[14px] overflow-hidden hover:border-[var(--accent)] hover:-translate-y-1 transition-[transform,border-color] duration-300">
      <a href={href} className="relative h-44 overflow-hidden bg-gradient-to-br from-[#e7ebf1] to-[#d6dce6] flex items-center justify-center" aria-label={name}>
        {img ? (
          <img src={img} alt={name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
        ) : (
          <CatGlyph category={category} />
        )}
        <span className="absolute top-3 left-3 mono text-[0.58rem] bg-[var(--surface)]/85 backdrop-blur-sm text-[var(--accent)] border border-[var(--line)] rounded-full px-2.5 py-1">
          {category}
        </span>
      </a>
      <div className="p-5 flex flex-col flex-1">
        <a href={href}><h3 className="font-[var(--font-heading)] text-[1.15rem] font-semibold leading-tight hover:text-[var(--primary)] transition-colors">{name}</h3></a>
        <p className="mono text-[0.6rem] text-[var(--muted)] mt-1">{sku}</p>
        <p className="text-[0.86rem] text-[var(--text)]/80 mt-2.5 leading-relaxed flex-1">{tagline}</p>
        <dl className="mt-4 pt-3.5 border-t border-[var(--line)] grid grid-cols-2 gap-y-1.5 gap-x-4">
          {specs.slice(0, 4).map((s) => (
            <div key={s.label}>
              <dt className="mono text-[0.54rem] text-[var(--muted)]">{s.label}</dt>
              <dd className="font-[var(--font-mono)] text-[0.72rem] text-[var(--ink)]">{s.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-4 flex items-center justify-between gap-3">
          <a href={href} className="inline-flex items-center gap-1.5 font-semibold text-[0.82rem]">
            Spec sheet <span className="text-[var(--primary)] group-hover:translate-x-1 transition-transform">→</span>
          </a>
          <button
            onClick={add}
            aria-label={`Add ${name} to quote`}
            className={`inline-flex items-center gap-1.5 text-[0.76rem] font-semibold px-3 py-2 rounded-[8px] border transition-colors ${
              added ? 'border-[#1d9a5a] text-[#1d9a5a] bg-[#eafaf1]' : 'border-[var(--line-strong)] text-[var(--ink)] hover:border-[var(--primary)] hover:text-[var(--primary)]'
            }`}
          >
            {added ? (
              <><svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8l3 3 7-8" strokeLinecap="round" strokeLinejoin="round" /></svg> Added</>
            ) : (
              <><span className="text-[1rem] leading-none">+</span> Quote</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
