const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');

interface Props {
  slug: string;
  name: string;
  sku: string;
  category: string;
  tagline: string;
  specs: { label: string; value: string }[];
}

function CatGlyph({ category }: { category: string }) {
  const map: Record<string, JSX.Element> = {
    Cabling: <g><path d="M14 30 Q26 16 38 30 T62 30" /><path d="M14 38 Q26 52 38 38 T62 38" /></g>,
    Connectors: <g><rect x="20" y="22" width="32" height="24" rx="2" /><path d="M52 28 h8 v12 h-8" /><path d="M26 46 v6 M32 46 v6 M38 46 v6 M44 46 v6" /></g>,
    Fiber: <g><line x1="14" y1="34" x2="50" y2="34" /><rect x="50" y="26" width="16" height="16" rx="2" /><circle cx="30" cy="34" r="3" /></g>,
    Switching: <g><rect x="14" y="24" width="52" height="20" rx="3" /><path d="M22 44 v6 M30 44 v6 M38 44 v6 M46 44 v6 M54 44 v6" /></g>,
    Surveillance: <g><path d="M22 24 a18 18 0 0 1 36 0 z" /><circle cx="40" cy="26" r="6" /></g>,
    Access: <g><rect x="26" y="16" width="28" height="40" rx="3" /><circle cx="40" cy="32" r="7" /></g>,
  };
  return (
    <svg viewBox="0 0 80 64" className="w-20 h-16 text-[var(--ink)]" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      {map[category] ?? map.Cabling}
    </svg>
  );
}

export default function ProductCard({ slug, name, sku, category, tagline, specs }: Props) {
  return (
    <a
      href={`${base}products/${slug}`}
      className="group relative flex flex-col bg-[var(--surface)] border border-[var(--line)] rounded-[14px] p-6 hover:border-[var(--accent)] hover:-translate-y-1 transition-[transform,border-color] duration-300"
    >
      <div className="flex items-start justify-between mb-5">
        <CatGlyph category={category} />
        <span className="mono text-[0.6rem] text-[var(--accent)] border border-[var(--line-strong)] rounded-full px-2.5 py-1">{category}</span>
      </div>
      <h3 className="font-[var(--font-heading)] text-[1.25rem] font-semibold leading-tight">{name}</h3>
      <p className="mono text-[0.62rem] text-[var(--muted)] mt-1">{sku}</p>
      <p className="text-[0.9rem] text-[var(--text)]/80 mt-3 leading-relaxed">{tagline}</p>
      <dl className="mt-5 pt-4 border-t border-[var(--line)] grid grid-cols-2 gap-y-2 gap-x-4">
        {specs.slice(0, 4).map((s) => (
          <div key={s.label}>
            <dt className="mono text-[0.56rem] text-[var(--muted)]">{s.label}</dt>
            <dd className="font-[var(--font-mono)] text-[0.74rem] text-[var(--ink)]">{s.value}</dd>
          </div>
        ))}
      </dl>
      <span className="inline-flex items-center gap-1.5 mt-5 font-semibold text-[0.85rem]">
        Spec sheet <span className="text-[var(--primary)] group-hover:translate-x-1 transition-transform">→</span>
      </span>
    </a>
  );
}
